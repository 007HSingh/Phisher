// Import utilities and modules
importScripts('utils.js');
importScripts('storage.js');
importScripts('backend-integration.js');

// Cache for recent checks to avoid duplicate requests
const analysisCache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Track blocked URLs
const blockedURLs = new Set();

// Standalone mode - no backend required
let STANDALONE_MODE = true;

// Initialize on first install/update
chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    // Open onboarding page on first install
    chrome.tabs.create({ url: chrome.runtime.getURL('onboarding.html') });
  }
  
  // Initialize storage defaults
  await wsStorage.initializeDefaults();
  
  console.log('🛡️ WiseShield installed/updated');
});

// Check backend status periodically
setInterval(async () => {
  const isAvailable = await backendIntegration.isBackendAvailable();
  STANDALONE_MODE = !isAvailable;
}, 30000); // Every 30 seconds

// Listen for navigation events
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  // Only process main frame navigations
  if (details.frameId !== 0) {
    return;
  }

  const url = details.url;
  const tabId = details.tabId;

  console.log('Navigation detected:', url);

  // Check if extension is enabled
  const enabled = await wsStorage.getSetting(wsStorage.STORAGE_KEYS.ENABLED, true);
  if (!enabled) {
    return;
  }

  // Check if URL should be analyzed
  if (!shouldAnalyzeURL(url)) {
    console.log('Skipping URL:', url);
    return;
  }

  // Clear previous analysis for this tab
  await clearAnalysisResult(tabId);

  // Check URL
  await checkURL(url, tabId);
});

// Main URL checking function
async function checkURL(url, tabId) {
  try {
    // Check cache first
    const cached = analysisCache.get(url);
    if (cached && (Date.now() - cached.timestamp < CACHE_DURATION)) {
      console.log('Using cached result for:', url);
      await handleAnalysisResult(cached.result, url, tabId);
      return;
    }

    // Set badge to loading state
    await updateBadge(tabId, 'CHECKING');

    let result;
    
    // Try to use backend if available
    if (!STANDALONE_MODE && !await wsStorage.getSetting(wsStorage.STORAGE_KEYS.STANDALONE_MODE, true)) {
      try {
        result = await backendIntegration.analyzeURLWithBackend(url);
        if (result) {
          console.log('Backend analysis result:', result);
        }
      } catch (error) {
        console.log('Backend analysis failed, falling back to client-side');
        result = null;
      }
    }

    // Fall back to client-side analysis
    if (!result) {
      console.log('Using client-side analysis');
      result = await analyzeURLClientSide(url);
    }

    // Cache the result
    analysisCache.set(url, {
      result: result,
      timestamp: Date.now()
    });

    // Handle the result
    await handleAnalysisResult(result, url, tabId);

  } catch (error) {
    console.error('Error checking URL:', error);
    await updateBadge(tabId, 'ERROR');
  }
}

// Client-side URL analysis (no backend needed)
async function analyzeURLClientSide(url) {
  const suspiciousIndicators = [];
  let score = 0;
  
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    const path = urlObj.pathname;
    
    // Check whitelist first
    const whitelist = await wsStorage.getWhitelist();
    if (whitelist.includes(hostname) || whitelist.some(domain => hostname.endsWith('.' + domain))) {
      return {
        risk_level: 'SAFE',
        score: 0.05,
        reason: 'Trusted domain (whitelisted)',
        features_detected: [],
        recommendation: 'This site is in your whitelist.'
      };
    }

    // Check blacklist
    const blacklist = await wsStorage.getBlacklist();
    if (blacklist.includes(hostname) || blacklist.some(domain => hostname.endsWith('.' + domain))) {
      return {
        risk_level: 'HIGH',
        score: 0.95,
        reason: 'Domain is in your blocklist',
        features_detected: ['User-blocked domain'],
        recommendation: 'This site is in your blocklist.'
      };
    }
    
    // Known safe domains (whitelist)
    const safeDomains = ['google.com', 'youtube.com', 'facebook.com', 'amazon.com', 
                        'microsoft.com', 'apple.com', 'github.com', 'stackoverflow.com',
                        'wikipedia.org', 'twitter.com', 'linkedin.com', 'netflix.com'];
    
    for (const safeDomain of safeDomains) {
      if (hostname.endsWith(safeDomain)) {
        return {
          risk_level: 'SAFE',
          score: 0.05,
          reason: 'Trusted domain',
          features_detected: [],
          recommendation: 'This site appears safe.'
        };
      }
    }
    
    // Check for IP address instead of domain
    if (/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(hostname)) {
      suspiciousIndicators.push('Uses IP address instead of domain name');
      score += 0.3;
    }
    
    // Check for suspicious TLDs
    const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq', '.xyz', '.top', '.club'];
    if (suspiciousTLDs.some(tld => hostname.endsWith(tld))) {
      suspiciousIndicators.push('Suspicious top-level domain');
      score += 0.25;
    }
    
    // Check URL length
    if (url.length > 75) {
      suspiciousIndicators.push('Unusually long URL');
      score += 0.15;
    }
    
    // Check for @ symbol (used to hide real domain)
    if (url.includes('@')) {
      suspiciousIndicators.push('Contains @ symbol in URL');
      score += 0.3;
    }
    
    // Check for excessive subdomains
    const subdomainCount = hostname.split('.').length - 2;
    if (subdomainCount > 3) {
      suspiciousIndicators.push('Excessive number of subdomains');
      score += 0.2;
    }
    
    // Check for phishing keywords
    const phishingKeywords = ['login', 'signin', 'verify', 'secure', 'account', 
                             'update', 'banking', 'paypal', 'confirm', 'suspend'];
    const lowerURL = url.toLowerCase();
    const keywordMatches = phishingKeywords.filter(kw => lowerURL.includes(kw));
    if (keywordMatches.length > 2) {
      suspiciousIndicators.push(`Contains phishing keywords: ${keywordMatches.join(', ')}`);
      score += 0.25;
    }
    
    // Check for HTTP (not HTTPS)
    if (urlObj.protocol === 'http:') {
      suspiciousIndicators.push('Not using HTTPS encryption');
      score += 0.1;
    }
    
    // Check for excessive hyphens
    const hyphenCount = hostname.split('-').length - 1;
    if (hyphenCount > 3) {
      suspiciousIndicators.push('Excessive hyphens in domain');
      score += 0.15;
    }
    
    // Determine risk level
    let risk_level;
    if (score > 0.6) {
      risk_level = 'HIGH';
    } else if (score > 0.3) {
      risk_level = 'MEDIUM';
    } else {
      risk_level = 'SAFE';
    }
    
    return {
      risk_level: risk_level,
      score: Math.min(score, 0.95),
      reason: suspiciousIndicators.length > 0 
        ? `Detected ${suspiciousIndicators.length} suspicious indicator${suspiciousIndicators.length !== 1 ? 's' : ''}`
        : 'No major issues detected',
      features_detected: suspiciousIndicators.slice(0, 5),
      recommendation: getRecommendation(risk_level)
    };
    
  } catch (error) {
    console.error('Error in client-side analysis:', error);
    return {
      risk_level: 'SAFE',
      score: 0.1,
      reason: 'Unable to analyze URL',
      features_detected: [],
      recommendation: 'Be cautious when entering sensitive information.'
    };
  }
}

function getRecommendation(riskLevel) {
  switch (riskLevel) {
    case 'HIGH':
      return 'Do not proceed to this site. It shows strong indicators of phishing.';
    case 'MEDIUM':
      return 'Exercise caution. Avoid entering sensitive information.';
    default:
      return 'This site appears safe. Always verify URLs before entering passwords.';
  }
}

// Handle analysis results
async function handleAnalysisResult(result, url, tabId) {
  console.log('Analysis result:', result);

  // Save result to storage
  await saveAnalysisResult(tabId, url, result);

  // Record activity and update statistics
  await wsStorage.recordActivity('scan', url, result.risk_level);
  await wsStorage.incrementStat(wsStorage.STORAGE_KEYS.STATS_URLS_SCANNED);

  if (result.risk_level === 'MEDIUM') {
    await wsStorage.incrementStat(wsStorage.STORAGE_KEYS.STATS_WARNINGS);
  } else if (result.risk_level === 'HIGH') {
    await wsStorage.incrementStat(wsStorage.STORAGE_KEYS.STATS_THREATS_BLOCKED);
  }

  // Send analytics to backend if available
  await backendIntegration.sendAnalytics('url_analyzed', {
    risk_level: result.risk_level,
    score: result.score,
    url: url
  });

  // Update badge
  await updateBadge(tabId, result.risk_level);

  // Handle high-risk sites - block and redirect to warning page
  const blockHigh = await wsStorage.getSetting(wsStorage.STORAGE_KEYS.BLOCK_HIGH, true);
  if (result.risk_level === 'HIGH' && blockHigh && !blockedURLs.has(url)) {
    blockedURLs.add(url);
    
    // Encode the URL and risk data for the warning page
    const warningURL = chrome.runtime.getURL('warning.html') + 
      '?url=' + encodeURIComponent(url) +
      '&score=' + encodeURIComponent(result.score) +
      '&reason=' + encodeURIComponent(result.reason || 'Suspected phishing site');

    // Redirect to warning page
    try {
      await chrome.tabs.update(tabId, { url: warningURL });
    } catch (error) {
      console.error('Error redirecting to warning page:', error);
    }
  }
}

// Update extension badge
async function updateBadge(tabId, status) {
  try {
    let badgeText = '';
    let badgeColor = '#6b7280'; // Default gray

    switch (status) {
      case 'CHECKING':
        badgeText = '...';
        badgeColor = '#3b82f6'; // Blue
        break;
      case 'HIGH':
        badgeText = getRiskBadge('HIGH');
        badgeColor = getRiskColor('HIGH');
        break;
      case 'MEDIUM':
        badgeText = getRiskBadge('MEDIUM');
        badgeColor = getRiskColor('MEDIUM');
        break;
      case 'SAFE':
        badgeText = getRiskBadge('SAFE');
        badgeColor = getRiskColor('SAFE');
        break;
      case 'ERROR':
        badgeText = '✗';
        badgeColor = '#6b7280';
        break;
    }

    await chrome.action.setBadgeText({ tabId: tabId, text: badgeText });
    await chrome.action.setBadgeBackgroundColor({ tabId: tabId, color: badgeColor });
  } catch (error) {
    console.error('Error updating badge:', error);
  }
}

// Listen for messages from content script or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'unblockURL') {
    const url = request.url;
    if (blockedURLs.has(url)) {
      blockedURLs.delete(url);
      console.log('URL unblocked:', url);
    }
    sendResponse({ success: true });
  }
  
  if (request.action === 'recheckURL') {
    const url = request.url;
    const tabId = sender.tab?.id || request.tabId;
    
    // Clear cache for this URL
    analysisCache.delete(url);
    
    // Recheck
    checkURL(url, tabId).then(() => {
      sendResponse({ success: true });
    });
    
    return true; // Keep channel open for async response
  }

  if (request.action === 'getThreatLevel') {
    const url = request.url;
    const cached = analysisCache.get(url);
    const threatLevel = cached ? cached.result.risk_level : 'UNKNOWN';
    sendResponse({ threatLevel: threatLevel });
  }

  if (request.action === 'clearCache') {
    analysisCache.clear();
    backendIntegration.clearCache();
    console.log('Cache cleared');
    sendResponse({ success: true });
  }

  if (request.action === 'reportFalsePositive') {
    const url = request.url;
    const reportedRiskLevel = request.reportedRiskLevel;
    
    // Report to backend if available
    backendIntegration.reportFalsePositive(url, reportedRiskLevel).then((success) => {
      wsStorage.recordActivity('false_positive_report', url, reportedRiskLevel);
      sendResponse({ success: success });
    });
    
    return true;
  }
  
  return false;
});

// Clean up cache periodically
setInterval(() => {
  const now = Date.now();
  for (const [url, data] of analysisCache.entries()) {
    if (now - data.timestamp > CACHE_DURATION) {
      analysisCache.delete(url);
    }
  }
}, 60000); // Every minute

// Periodically check backend status and update threat database
setInterval(async () => {
  if (!STANDALONE_MODE) {
    await backendIntegration.updateThreatDatabase();
  }
}, 3600000); // Every hour

console.log('🛡️ WiseShield v1.1.0 loaded');
