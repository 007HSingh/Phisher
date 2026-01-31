// Common helper functions for WiseShield
// URL domain extraction
function extractDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    console.error('Error extracting domain:', error);
    return null;
  }
}

// Check if domain is in list
function isDomainInList(domain, domains) {
  if (!domains || !Array.isArray(domains)) return false;
  
  // Exact match or subdomain match
  for (const d of domains) {
    if (domain === d || domain.endsWith('.' + d)) {
      return true;
    }
  }
  return false;
}

// Format domain for display
function formatDomain(domain) {
  return domain.replace(/^www\./, '');
}

// Get hostname from URL
function getHostname(url) {
  try {
    return new URL(url).hostname;
  } catch (error) {
    return null;
  }
}

// Sanitize domain input
function sanitizeDomain(input) {
  return input.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
}

// Create date string
function getDateString(timestamp) {
  const date = new Date(timestamp);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${date.toLocaleDateString()} ${hours}:${minutes}`;
}

// Truncate string
function truncateString(str, length) {
  if (str.length <= length) return str;
  return str.substring(0, length - 3) + '...';
}

// Format risk score as percentage
function formatRiskScore(score) {
  const percent = Math.round(score * 100);
  return `${percent}%`;
}

// Get risk level from score
function getRiskLevelFromScore(score) {
  if (score < 0.3) return 'SAFE';
  if (score < 0.7) return 'MEDIUM';
  return 'HIGH';
}

// Validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate URL
function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// Compare URLs ignoring protocol and www
function urlsEquivalent(url1, url2) {
  try {
    const u1 = new URL(url1);
    const u2 = new URL(url2);
    
    const host1 = u1.hostname.replace(/^www\./, '');
    const host2 = u2.hostname.replace(/^www\./, '');
    
    return host1 === host2;
  } catch (error) {
    return false;
  }
}

// Generate UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
