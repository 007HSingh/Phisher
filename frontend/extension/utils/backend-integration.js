// Backend integration layer for WiseShield
class BackendIntegration {
  constructor() {
    this.cache = new Map();
    this.CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  }

  // Get backend configuration from storage
  async getBackendConfig() {
    const config = await wsStorage.getBackendConfig();
    return config;
  }

  // Check if backend is available and configured
  async isBackendAvailable() {
    const config = await this.getBackendConfig();
    
    if (config.standalone) {
      return false; // Standalone mode
    }

    if (!config.url) {
      return false;
    }

    // Try to reach backend
    try {
      const timeout = 3000;
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${config.url}/health`, {
        method: 'GET',
        signal: controller.signal
      });

      clearTimeout(id);
      return response.ok;
    } catch (error) {
      console.log('Backend health check failed:', error.message);
      return false;
    }
  }

  // Analyze URL with backend
  async analyzeURLWithBackend(url) {
    const config = await this.getBackendConfig();

    if (!config.url) {
      return null;
    }

    try {
      const timeout = (config.timeout || 10) * 1000;
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${config.url}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
        },
        body: JSON.stringify({ url: url }),
        signal: controller.signal
      });

      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Backend analysis failed:', error);
      return null;
    }
  }

  // Batch analyze multiple URLs
  async batchAnalyze(urls) {
    const config = await this.getBackendConfig();

    if (!config.url) {
      return null;
    }

    try {
      const timeout = (config.timeout || 10) * 1000;
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${config.url}/batch-analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
        },
        body: JSON.stringify({ urls: urls }),
        signal: controller.signal
      });

      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Batch analysis failed:', error);
      return null;
    }
  }

  // Report false positive to backend
  async reportFalsePositive(url, reportedRiskLevel) {
    const config = await this.getBackendConfig();

    if (!config.url) {
      return false;
    }

    try {
      const timeout = (config.timeout || 10) * 1000;
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${config.url}/report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
        },
        body: JSON.stringify({
          url: url,
          reported_risk_level: reportedRiskLevel,
          timestamp: Date.now()
        }),
        signal: controller.signal
      });

      clearTimeout(id);
      return response.ok;
    } catch (error) {
      console.error('False positive report failed:', error);
      return false;
    }
  }

  // Get threat statistics from backend
  async getThreatStatistics() {
    const config = await this.getBackendConfig();

    if (!config.url) {
      return null;
    }

    try {
      const timeout = (config.timeout || 10) * 1000;
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${config.url}/statistics`, {
        method: 'GET',
        headers: config.apiKey ? { 'Authorization': `Bearer ${config.apiKey}` } : {},
        signal: controller.signal
      });

      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`Backend returned status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Failed to fetch statistics:', error);
      return null;
    }
  }

  // Update threat database
  async updateThreatDatabase() {
    const config = await this.getBackendConfig();

    if (!config.url) {
      return false;
    }

    try {
      const timeout = (config.timeout || 10) * 1000;
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${config.url}/update-db`, {
        method: 'POST',
        headers: config.apiKey ? { 'Authorization': `Bearer ${config.apiKey}` } : {},
        signal: controller.signal
      });

      clearTimeout(id);
      return response.ok;
    } catch (error) {
      console.error('Database update failed:', error);
      return false;
    }
  }

  // Send analytics event to backend
  async sendAnalytics(eventType, eventData) {
    const config = await this.getBackendConfig();

    if (!config.url || config.standalone) {
      return false; // Don't send in standalone mode
    }

    try {
      const timeout = 5000; // Shorter timeout for analytics
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${config.url}/analytics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
        },
        body: JSON.stringify({
          event_type: eventType,
          data: eventData,
          timestamp: Date.now()
        }),
        signal: controller.signal
      });

      clearTimeout(id);
      return response.ok;
    } catch (error) {
      console.error('Analytics send failed:', error);
      return false;
    }
  }

  // Check if URL is in known threats database
  async checkThreatDatabase(url) {
    const config = await this.getBackendConfig();

    if (!config.url) {
      return null;
    }

    try {
      const timeout = (config.timeout || 10) * 1000;
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${config.url}/check-threat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
        },
        body: JSON.stringify({ url: url }),
        signal: controller.signal
      });

      clearTimeout(id);

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error('Threat database check failed:', error);
      return null;
    }
  }

  // Cache a result
  setCache(url, result) {
    this.cache.set(url, {
      result: result,
      timestamp: Date.now()
    });
  }

  // Get cached result
  getCache(url) {
    const cached = this.cache.get(url);
    if (cached && (Date.now() - cached.timestamp < this.CACHE_DURATION)) {
      return cached.result;
    }
    this.cache.delete(url);
    return null;
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }
}

// Export for use
const backendIntegration = new BackendIntegration();
