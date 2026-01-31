// API Configuration (use HTTPS by default; configurable via options page)
const API_BASE_URL = 'https://localhost:5000';

// Simple HTML escape helper to avoid inserting untrusted markup
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;');
}

// Helper function to make API requests with basic retry/backoff
async function apiRequest(endpoint, data, retries = 2, timeoutMs = 8000) {
  const url = `${API_BASE_URL}${endpoint}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeoutMs);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal
      });

      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      // If last attempt, return an error object; otherwise backoff and retry
      console.warn(`apiRequest attempt ${attempt} failed:`, error.message || error);
      if (attempt === retries) {
        console.error('API Request Error:', error);
        return {
          error: true,
          message: error.message || 'Network error',
          risk_level: 'UNKNOWN'
        };
      }

      // Exponential backoff
      const backoffMs = 200 * Math.pow(2, attempt);
      await new Promise((res) => setTimeout(res, backoffMs));
    }
  }
}

// Parse URL components
function parseURL(url) {
  try {
    const urlObj = new URL(url);
    return {
      protocol: urlObj.protocol,
      hostname: urlObj.hostname,
      pathname: urlObj.pathname,
      search: urlObj.search,
      hash: urlObj.hash,
      full: url
    };
  } catch (error) {
    console.error('URL Parsing Error:', error);
    return null;
  }
}

// Check if URL should be analyzed
function shouldAnalyzeURL(url) {
  // Skip chrome:// and extension:// URLs
  if (url.startsWith('chrome://') || 
      url.startsWith('chrome-extension://') ||
      url.startsWith('edge://') ||
      url.startsWith('about:')) {
    return false;
  }
  
  // Only analyze http and https
  return url.startsWith('http://') || url.startsWith('https://');
}

// Format timestamp
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

// Get risk color based on level
function getRiskColor(riskLevel) {
  switch (riskLevel) {
    case 'HIGH':
      return '#ef4444'; // Red
    case 'MEDIUM':
      return '#f59e0b'; // Orange
    case 'SAFE':
      return '#10b981'; // Green
    default:
      return '#6b7280'; // Gray
  }
}

// Get risk badge text
function getRiskBadge(riskLevel) {
  switch (riskLevel) {
    case 'HIGH':
      return '!';
    case 'MEDIUM':
      return '?';
    case 'SAFE':
      return '✓';
    default:
      return '';
  }
}

// Storage helper functions
async function saveAnalysisResult(tabId, url, result) {
  const key = `analysis_${tabId}`;
  const data = {
    url: url,
    result: result,
    timestamp: Date.now()
  };
  
  await chrome.storage.local.set({ [key]: data });
}

async function getAnalysisResult(tabId) {
  const key = `analysis_${tabId}`;
  const data = await chrome.storage.local.get(key);
  return data[key] || null;
}

async function clearAnalysisResult(tabId) {
  const key = `analysis_${tabId}`;
  await chrome.storage.local.remove(key);
}
