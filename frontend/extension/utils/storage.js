// Storage management system for WiseShield
class WiseShieldStorage {
  constructor() {
    this.STORAGE_KEYS = {
      // Settings
      ENABLED: 'ws_enabled',
      NOTIFICATIONS: 'ws_notifications',
      AUTO_CACHE: 'ws_auto_cache',
      SENSITIVITY_LEVEL: 'ws_sensitivity_level',
      BLOCK_HIGH: 'ws_block_high',
      WARN_MEDIUM: 'ws_warn_medium',
      FORM_PROTECTION: 'ws_form_protection',
      CACHE_DURATION: 'ws_cache_duration',

      // Backend
      BACKEND_URL: 'ws_backend_url',
      API_KEY: 'ws_api_key',
      BACKEND_TIMEOUT: 'ws_backend_timeout',
      STANDALONE_MODE: 'ws_standalone_mode',

      // Lists
      WHITELIST: 'ws_whitelist',
      BLACKLIST: 'ws_blacklist',

      // Statistics
      STATS_THREATS_BLOCKED: 'ws_stats_threats_blocked',
      STATS_WARNINGS: 'ws_stats_warnings',
      STATS_URLS_SCANNED: 'ws_stats_urls_scanned',
      STATS_LAST_UPDATED: 'ws_stats_last_updated',
      RECENT_ACTIVITY: 'ws_recent_activity'
    };
  }

  // Get a setting value
  async getSetting(key, defaultValue = null) {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, (result) => {
        resolve(result[key] !== undefined ? result[key] : defaultValue);
      });
    });
  }

  // Set a setting value
  async setSetting(key, value) {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [key]: value }, () => {
        resolve();
      });
    });
  }

  // Get all settings
  async getAllSettings() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(null, (result) => {
        resolve(result);
      });
    });
  }

  // Initialize default settings
  async initializeDefaults() {
    const defaults = {};
    defaults[this.STORAGE_KEYS.ENABLED] = true;
    defaults[this.STORAGE_KEYS.NOTIFICATIONS] = true;
    defaults[this.STORAGE_KEYS.AUTO_CACHE] = true;
    defaults[this.STORAGE_KEYS.SENSITIVITY_LEVEL] = 'medium';
    defaults[this.STORAGE_KEYS.BLOCK_HIGH] = true;
    defaults[this.STORAGE_KEYS.WARN_MEDIUM] = true;
    defaults[this.STORAGE_KEYS.FORM_PROTECTION] = true;
    defaults[this.STORAGE_KEYS.CACHE_DURATION] = 15; // minutes
    defaults[this.STORAGE_KEYS.BACKEND_URL] = 'http://localhost:8080/api/v1';
    defaults[this.STORAGE_KEYS.API_KEY] = '';
    defaults[this.STORAGE_KEYS.BACKEND_TIMEOUT] = 10;
    defaults[this.STORAGE_KEYS.STANDALONE_MODE] = false;
    defaults[this.STORAGE_KEYS.WHITELIST] = [];
    defaults[this.STORAGE_KEYS.BLACKLIST] = [];
    defaults[this.STORAGE_KEYS.STATS_THREATS_BLOCKED] = 0;
    defaults[this.STORAGE_KEYS.STATS_WARNINGS] = 0;
    defaults[this.STORAGE_KEYS.STATS_URLS_SCANNED] = 0;
    defaults[this.STORAGE_KEYS.RECENT_ACTIVITY] = [];

    // Only set if not already set
    chrome.storage.sync.get(Object.values(this.STORAGE_KEYS), (result) => {
      const toSet = {};
      for (const [key, value] of Object.entries(defaults)) {
        if (result[key] === undefined) {
          toSet[key] = value;
        }
      }
      if (Object.keys(toSet).length > 0) {
        chrome.storage.sync.set(toSet);
      }
    });
  }

  // Whitelist management
  async addToWhitelist(domain) {
    const whitelist = await this.getSetting(this.STORAGE_KEYS.WHITELIST, []);
    if (!whitelist.includes(domain)) {
      whitelist.push(domain);
      await this.setSetting(this.STORAGE_KEYS.WHITELIST, whitelist);
      return true;
    }
    return false;
  }

  async removeFromWhitelist(domain) {
    const whitelist = await this.getSetting(this.STORAGE_KEYS.WHITELIST, []);
    const index = whitelist.indexOf(domain);
    if (index > -1) {
      whitelist.splice(index, 1);
      await this.setSetting(this.STORAGE_KEYS.WHITELIST, whitelist);
      return true;
    }
    return false;
  }

  async getWhitelist() {
    return this.getSetting(this.STORAGE_KEYS.WHITELIST, []);
  }

  // Blacklist management
  async addToBlacklist(domain) {
    const blacklist = await this.getSetting(this.STORAGE_KEYS.BLACKLIST, []);
    if (!blacklist.includes(domain)) {
      blacklist.push(domain);
      await this.setSetting(this.STORAGE_KEYS.BLACKLIST, blacklist);
      return true;
    }
    return false;
  }

  async removeFromBlacklist(domain) {
    const blacklist = await this.getSetting(this.STORAGE_KEYS.BLACKLIST, []);
    const index = blacklist.indexOf(domain);
    if (index > -1) {
      blacklist.splice(index, 1);
      await this.setSetting(this.STORAGE_KEYS.BLACKLIST, blacklist);
      return true;
    }
    return false;
  }

  async getBlacklist() {
    return this.getSetting(this.STORAGE_KEYS.BLACKLIST, []);
  }

  // Statistics tracking
  async incrementStat(statKey, amount = 1) {
    const current = await this.getSetting(statKey, 0);
    await this.setSetting(statKey, current + amount);
  }

  async recordActivity(type, url, threatLevel) {
    const activities = await this.getSetting(this.STORAGE_KEYS.RECENT_ACTIVITY, []);
    const activity = {
      type: type,
      url: url,
      threatLevel: threatLevel,
      timestamp: Date.now()
    };

    // Keep only last 50 activities
    activities.unshift(activity);
    if (activities.length > 50) {
      activities.pop();
    }

    await this.setSetting(this.STORAGE_KEYS.RECENT_ACTIVITY, activities);
  }

  async getRecentActivity(limit = 10) {
    const activities = await this.getSetting(this.STORAGE_KEYS.RECENT_ACTIVITY, []);
    return activities.slice(0, limit);
  }

  async resetStatistics() {
    await this.setSetting(this.STORAGE_KEYS.STATS_THREATS_BLOCKED, 0);
    await this.setSetting(this.STORAGE_KEYS.STATS_WARNINGS, 0);
    await this.setSetting(this.STORAGE_KEYS.STATS_URLS_SCANNED, 0);
    await this.setSetting(this.STORAGE_KEYS.RECENT_ACTIVITY, []);
  }

  // Production backend constant - this can be updated via CI or hardcoded for release
  get PRODUCTION_BACKEND_URL() {
    return 'https://phishguard-api.onrender.com/api/v1'; // Placeholder to be updated by user
  }

  // Backend configuration
  async setBackendConfig(url, apiKey, timeout) {
    await this.setSetting(this.STORAGE_KEYS.BACKEND_URL, url);
    await this.setSetting(this.STORAGE_KEYS.API_KEY, apiKey);
    await this.setSetting(this.STORAGE_KEYS.BACKEND_TIMEOUT, timeout);
  }

  async getBackendConfig() {
    return {
      url: await this.getSetting(this.STORAGE_KEYS.BACKEND_URL, 'https://localhost:5000'),
      apiKey: await this.getSetting(this.STORAGE_KEYS.API_KEY, ''),
      timeout: await this.getSetting(this.STORAGE_KEYS.BACKEND_TIMEOUT, 10),
      standalone: await this.getSetting(this.STORAGE_KEYS.STANDALONE_MODE, true)
    };
  }

  // Clear all data
  async clearAllData() {
    return new Promise((resolve) => {
      chrome.storage.sync.clear(() => {
        this.initializeDefaults();
        resolve();
      });
    });
  }
}

// Export for use in other scripts
const wsStorage = new WiseShieldStorage();
