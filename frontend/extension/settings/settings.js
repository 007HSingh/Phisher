// Options page script
async function switchTab(tabName) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });

  // Remove active class from all buttons
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected tab
  document.getElementById(tabName).classList.add('active');

  // Add active class to clicked button
  event.target.classList.add('active');

  // Load tab-specific data
  if (tabName === 'whitelist') {
    await loadWhitelist();
    await loadBlacklist();
  } else if (tabName === 'statistics') {
    await loadStatistics();
    await loadRecentActivity();
  } else if (tabName === 'backend') {
    await loadBackendConfig();
  }
}

// Initialize settings on page load
document.addEventListener('DOMContentLoaded', async () => {
  await wsStorage.initializeDefaults();
  await loadGeneralSettings();
  await loadProtectionSettings();
  await loadBackendConfig();
});

// General Settings
async function loadGeneralSettings() {
  const enabled = await wsStorage.getSetting(wsStorage.STORAGE_KEYS.ENABLED, true);
  const notifications = await wsStorage.getSetting(wsStorage.STORAGE_KEYS.NOTIFICATIONS, true);
  const autoCache = await wsStorage.getSetting(wsStorage.STORAGE_KEYS.AUTO_CACHE, true);

  updateToggle('enableToggle', enabled);
  updateToggle('notifyToggle', notifications);
  updateToggle('cacheToggle', autoCache);
}

// Protection Settings
async function loadProtectionSettings() {
  const sensitivity = await wsStorage.getSetting(wsStorage.STORAGE_KEYS.SENSITIVITY_LEVEL, 'medium');
  const blockHigh = await wsStorage.getSetting(wsStorage.STORAGE_KEYS.BLOCK_HIGH, true);
  const warnMedium = await wsStorage.getSetting(wsStorage.STORAGE_KEYS.WARN_MEDIUM, true);
  const formProtect = await wsStorage.getSetting(wsStorage.STORAGE_KEYS.FORM_PROTECTION, true);
  const cacheDuration = await wsStorage.getSetting(wsStorage.STORAGE_KEYS.CACHE_DURATION, 15);

  document.getElementById('sensitivityLevel').value = sensitivity;
  updateToggle('blockHighToggle', blockHigh);
  updateToggle('warnMediumToggle', warnMedium);
  updateToggle('formProtectToggle', formProtect);
  document.getElementById('cacheDuration').value = cacheDuration;
}

// Backend Configuration
async function loadBackendConfig() {
  const config = await wsStorage.getBackendConfig();
  document.getElementById('backendUrl').value = config.url;
  document.getElementById('apiKey').value = config.apiKey;
  document.getElementById('backendTimeout').value = config.timeout;
  updateToggle('standaloneToggle', config.standalone);

  // Update connection status
  await checkBackendStatus();
}

// Whitelist
async function loadWhitelist() {
  const whitelist = await wsStorage.getWhitelist();
  const container = document.getElementById('whitelistDomains');

  if (whitelist.length === 0) {
    container.textContent = '';
    const emptyMsg = document.createElement('p');
    emptyMsg.style.cssText = 'color: #9ca3af; text-align: center; padding: 20px;';
    emptyMsg.textContent = 'No trusted domains added yet';
    container.appendChild(emptyMsg);
    return;
  }

  container.textContent = '';
  whitelist.forEach(domain => {
    const item = document.createElement('div');
    item.className = 'domain-item';

    const name = document.createElement('span');
    name.className = 'domain-item-name';
    name.textContent = domain;
    item.appendChild(name);

    const btn = document.createElement('button');
    btn.className = 'btn-danger';
    btn.textContent = 'Remove';
    btn.onclick = () => removeDomainFromWhitelist(domain);
    item.appendChild(btn);

    container.appendChild(item);
  });
}

async function loadBlacklist() {
  const blacklist = await wsStorage.getBlacklist();
  const container = document.getElementById('blacklistDomains');

  if (blacklist.length === 0) {
    container.textContent = '';
    const emptyMsg = document.createElement('p');
    emptyMsg.style.cssText = 'color: #9ca3af; text-align: center; padding: 20px;';
    emptyMsg.textContent = 'No blocked domains';
    container.appendChild(emptyMsg);
    return;
  }

  container.textContent = '';
  blacklist.forEach(domain => {
    const item = document.createElement('div');
    item.className = 'domain-item';

    const name = document.createElement('span');
    name.className = 'domain-item-name';
    name.textContent = domain;
    item.appendChild(name);

    const btn = document.createElement('button');
    btn.className = 'btn-danger';
    btn.textContent = 'Remove';
    btn.onclick = () => removeDomainFromBlacklist(domain);
    item.appendChild(btn);

    container.appendChild(item);
  });
}

async function addDomain() {
  const input = document.getElementById('domainInput');
  const domain = input.value.trim().toLowerCase();

  if (!domain) {
    showMessage('Please enter a domain', false);
    return;
  }

  // Validate domain format
  if (!/^([a-z0-9]([a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/.test(domain)) {
    showMessage('Invalid domain format', false);
    return;
  }

  const added = await wsStorage.addToWhitelist(domain);
  if (added) {
    showMessage(`✓ ${domain} added to whitelist`, true);
    input.value = '';
    await loadWhitelist();
  } else {
    showMessage(`${domain} is already in whitelist`, false);
  }
}

async function removeDomainFromWhitelist(domain) {
  await wsStorage.removeFromWhitelist(domain);
  await loadWhitelist();
  showMessage(`✓ ${domain} removed from whitelist`, true);
}

async function removeDomainFromBlacklist(domain) {
  await wsStorage.removeFromBlacklist(domain);
  await loadBlacklist();
  showMessage(`✓ ${domain} removed from blacklist`, true);
}

// Statistics
async function loadStatistics() {
  const stats = await wsStorage.getAllSettings();

  document.getElementById('statThreatsBlocked').textContent =
    stats[wsStorage.STORAGE_KEYS.STATS_THREATS_BLOCKED] || 0;
  document.getElementById('statWarnings').textContent =
    stats[wsStorage.STORAGE_KEYS.STATS_WARNINGS] || 0;
  document.getElementById('statUrlsScanned').textContent =
    stats[wsStorage.STORAGE_KEYS.STATS_URLS_SCANNED] || 0;
  document.getElementById('statCached').textContent =
    Object.keys(stats).filter(k => k.startsWith('ws_cache_')).length;
}

async function loadRecentActivity() {
  const activities = await wsStorage.getRecentActivity();
  const container = document.getElementById('recentActivity');

  if (activities.length === 0) {
    container.textContent = '';
    const emptyMsg = document.createElement('p');
    emptyMsg.style.cssText = 'color: #9ca3af;';
    emptyMsg.textContent = 'No recent activity';
    container.appendChild(emptyMsg);
    return;
  }

  container.textContent = '';
  activities.forEach(activity => {
    const date = new Date(activity.timestamp);
    const time = date.toLocaleTimeString();
    const icon = activity.threatLevel === 'HIGH' ? '🚨' : activity.threatLevel === 'MEDIUM' ? '⚠️' : '✓';

    const item = document.createElement('div');
    item.style.cssText = 'padding: 10px 0; border-bottom: 1px solid #f3f4f6;';

    const flex = document.createElement('div');
    flex.style.cssText = 'display: flex; justify-content: space-between; align-items: start;';

    const left = document.createElement('div');
    const iconSpan = document.createElement('span');
    iconSpan.style.marginRight = '8px';
    iconSpan.textContent = icon;
    left.appendChild(iconSpan);

    const urlSpan = document.createElement('span');
    urlSpan.style.cssText = 'font-family: monospace; font-size: 12px;';
    urlSpan.textContent = activity.url;
    left.appendChild(urlSpan);
    flex.appendChild(left);

    const right = document.createElement('div');
    right.style.cssText = 'font-size: 11px; color: #9ca3af; text-align: right;';

    const timeDiv = document.createElement('div');
    timeDiv.textContent = time;
    right.appendChild(timeDiv);

    const typeDiv = document.createElement('div');
    typeDiv.textContent = activity.type;
    right.appendChild(typeDiv);

    flex.appendChild(right);
    item.appendChild(flex);
    container.appendChild(item);
  });
}

async function resetStatistics() {
  if (confirm('Are you sure you want to reset all statistics?')) {
    await wsStorage.resetStatistics();
    await loadStatistics();
    showMessage('✓ Statistics reset', true);
  }
}

async function exportStatistics() {
  const allSettings = await wsStorage.getAllSettings();
  const dataStr = JSON.stringify(allSettings, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `wiseshield-data-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

// Backend
async function testBackend() {
  const url = document.getElementById('backendUrl').value;
  const apiKey = document.getElementById('apiKey').value;

  if (!url) {
    showTestResult('Please enter a backend URL', false);
    return;
  }

  showTestResult('Testing connection...', null);

  try {
    const timeout = 5000;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${url}/health`, {
      method: 'GET',
      headers: apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {},
      signal: controller.signal
    });

    clearTimeout(id);

    if (response.ok) {
      const data = await response.json();
      showTestResult('✓ Backend connection successful!', true);
    } else {
      showTestResult(`✗ Backend returned status ${response.status}`, false);
    }
  } catch (error) {
    showTestResult(`✗ Connection failed: ${error.message}`, false);
  }
}

async function saveBackendConfig() {
  const url = document.getElementById('backendUrl').value;
  const apiKey = document.getElementById('apiKey').value;
  const timeout = document.getElementById('backendTimeout').value;

  if (!url) {
    showMessage('Please enter a backend URL', false);
    return;
  }

  await wsStorage.setBackendConfig(url, apiKey, timeout);
  showMessage('✓ Backend configuration saved', true);
  await checkBackendStatus();
}

async function checkBackendStatus() {
  const config = await wsStorage.getBackendConfig();
  const indicator = document.getElementById('statusIndicator');
  const statusText = document.getElementById('statusText');
  const statusDetail = document.getElementById('statusDetail');

  if (config.standalone) {
    indicator.classList.add('disconnected');
    statusText.textContent = '🔴 Backend: Disconnected (Standalone Mode)';
    statusDetail.textContent = 'Using local heuristics for analysis';
    return;
  }

  try {
    const timeout = 3000;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(`${config.url}/health`, {
      method: 'GET',
      signal: controller.signal
    });

    clearTimeout(id);

    if (response.ok) {
      indicator.classList.remove('disconnected');
      statusText.textContent = '🟢 Backend: Connected';
      statusDetail.textContent = `Connected to ${config.url}`;
    } else {
      indicator.classList.add('disconnected');
      statusText.textContent = '🔴 Backend: Error';
      statusDetail.textContent = `Server returned status ${response.status}`;
    }
  } catch (error) {
    indicator.classList.add('disconnected');
    statusText.textContent = '🔴 Backend: Disconnected';
    statusDetail.textContent = error.message;
  }
}

async function clearCache() {
  if (confirm('Clear all cached URL analysis results?')) {
    // This would be handled by the background script
    chrome.runtime.sendMessage({ action: 'clearCache' }, () => {
      showMessage('✓ Cache cleared', true);
    });
  }
}

// Helper Functions
function updateToggle(elementId, isActive) {
  const toggle = document.getElementById(elementId);
  if (isActive) {
    toggle.classList.add('active');
  } else {
    toggle.classList.remove('active');
  }
}

async function toggleSetting(settingKey) {
  let storageKey;

  switch (settingKey) {
    case 'enabled':
      storageKey = wsStorage.STORAGE_KEYS.ENABLED;
      break;
    case 'notifications':
      storageKey = wsStorage.STORAGE_KEYS.NOTIFICATIONS;
      break;
    case 'autoCache':
      storageKey = wsStorage.STORAGE_KEYS.AUTO_CACHE;
      break;
    case 'blockHigh':
      storageKey = wsStorage.STORAGE_KEYS.BLOCK_HIGH;
      break;
    case 'warnMedium':
      storageKey = wsStorage.STORAGE_KEYS.WARN_MEDIUM;
      break;
    case 'formProtection':
      storageKey = wsStorage.STORAGE_KEYS.FORM_PROTECTION;
      break;
    case 'standaloneMode':
      storageKey = wsStorage.STORAGE_KEYS.STANDALONE_MODE;
      break;
    default:
      return;
  }

  const current = await wsStorage.getSetting(storageKey, true);
  await wsStorage.setSetting(storageKey, !current);

  // Update UI
  const elementId = event.target.closest('.toggle')?.id;
  if (elementId) {
    updateToggle(elementId, !current);
  }

  // If backend standalone mode changed, update status
  if (settingKey === 'standaloneMode') {
    await checkBackendStatus();
  }
}

async function saveSetting(settingKey, value) {
  let storageKey;

  switch (settingKey) {
    case 'sensitivityLevel':
      storageKey = wsStorage.STORAGE_KEYS.SENSITIVITY_LEVEL;
      break;
    case 'cacheDuration':
      storageKey = wsStorage.STORAGE_KEYS.CACHE_DURATION;
      break;
    case 'backendTimeout':
      storageKey = wsStorage.STORAGE_KEYS.BACKEND_TIMEOUT;
      break;
    default:
      return;
  }

  await wsStorage.setSetting(storageKey, value);
}

function showMessage(text, success) {
  const messageEl = document.getElementById('whitelistMessage');
  messageEl.textContent = text;
  messageEl.style.background = success ? '#f0fdf4' : '#fef2f2';
  messageEl.style.borderColor = success ? '#86efac' : '#fca5a5';
  messageEl.style.color = success ? '#166534' : '#dc2626';
  messageEl.classList.add('show');

  setTimeout(() => {
    messageEl.classList.remove('show');
  }, 3000);
}

function showTestResult(text, success) {
  const resultEl = document.getElementById('testResult');
  resultEl.textContent = '';

  const div = document.createElement('div');
  div.style.cssText = `
    background: ${success === null ? '#eff6ff' : success ? '#f0fdf4' : '#fef2f2'};
    border: 1px solid ${success === null ? '#bfdbfe' : success ? '#86efac' : '#fca5a5'};
    border-radius: 6px;
    padding: 12px;
    font-size: 13px;
    color: ${success === null ? '#1e40af' : success ? '#166534' : '#dc2626'};
  `;
  div.textContent = text;
  resultEl.appendChild(div);
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
