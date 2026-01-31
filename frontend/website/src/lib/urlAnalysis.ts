/**
 * URL Analysis Utility - Extract security/phishing detection features
 * Features extracted:
 * 1. Total length of URL
 * 2. Total dots
 * 3. Total hyphens
 * 4. Contains phishing keywords
 * 5. IP address present
 * 6. Subdomain length
 * 7. Digit to URL length ratio
 * 8. HTTPS present
 */

export interface URLFeatures {
  url_length: number;
  total_dots: number;
  total_hyphens: number;
  phishing_keywords: number;
  ip_address_present: number;
  subdomain_length: number;
  digit_ratio: number;
  https_present: number;
}

/**
 * Extracts all URL features for security analysis
 * @param url - The URL to analyze
 * @returns URLFeatures object with all extracted features
 */
export function analyzeURL(url: string): URLFeatures {
  if (!url || typeof url !== 'string') {
    return getDefaultFeatures();
  }

  try {
    // 1. Total length of URL
    const urlLength = url.length;

    // 2. Total dots in URL
    const totalDots = (url.match(/\./g) || []).length;

    // 3. Total hyphens in URL
    const totalHyphens = (url.match(/-/g) || []).length;

    // 4. Check for phishing keywords
    const phishingKeywords = ['login', 'verify', 'update', 'secure', 'bank', 'account', 'wallet', 'web3'];
    const urlLower = url.toLowerCase();
    const hasPhishingKeyword = phishingKeywords.some(keyword => urlLower.includes(keyword)) ? 1 : 0;

    // 5. Check for IP address
    const ipAddressRegex = /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/;
    const hasIPAddress = ipAddressRegex.test(url) ? 1 : 0;

    // 6. Length of subdomain
    const subdomainLength = getSubdomainLength(url);

    // 7. Digit ratio (#digits / len(url))
    const digitCount = (url.match(/\d/g) || []).length;
    const digitRatio = urlLength > 0 ? digitCount / urlLength : 0;

    // 8. HTTPS present
    const hasHTTPS = url.toLowerCase().startsWith('https://') ? 1 : 0;

    return {
      url_length: urlLength,
      total_dots: totalDots,
      total_hyphens: totalHyphens,
      phishing_keywords: hasPhishingKeyword,
      ip_address_present: hasIPAddress,
      subdomain_length: subdomainLength,
      digit_ratio: digitRatio,
      https_present: hasHTTPS
    };
  } catch (error) {
    console.error('Error analyzing URL:', error);
    return getDefaultFeatures();
  }
}

/**
 * Extract subdomain length from URL
 * @param url - The URL to analyze
 * @returns Length of the subdomain
 */
function getSubdomainLength(url: string): number {
  try {
    // Remove protocol
    let urlWithoutProtocol = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
    
    // Extract hostname
    const slashIndex = urlWithoutProtocol.indexOf('/');
    const hostname = slashIndex > -1 ? urlWithoutProtocol.substring(0, slashIndex) : urlWithoutProtocol;
    
    // Remove port if present
    const colonIndex = hostname.indexOf(':');
    const cleanHostname = colonIndex > -1 ? hostname.substring(0, colonIndex) : hostname;
    
    // Count subdomain parts (everything before the main domain)
    // A subdomain is typically parts before the TLD
    const parts = cleanHostname.split('.');
    
    // If we have at least 2 parts, subdomain length is parts[0]
    // Otherwise, there's no subdomain
    if (parts.length > 2) {
      return parts[0].length;
    }
    
    return 0;
  } catch (error) {
    console.error('Error extracting subdomain length:', error);
    return 0;
  }
}

/**
 * Default features when URL analysis fails
 * @returns Default URLFeatures object
 */
function getDefaultFeatures(): URLFeatures {
  return {
    url_length: 0,
    total_dots: 0,
    total_hyphens: 0,
    phishing_keywords: 0,
    ip_address_present: 0,
    subdomain_length: 0,
    digit_ratio: 0,
    https_present: 0
  };
}

/**
 * Batch analyze multiple URLs
 * @param urls - Array of URLs to analyze
 * @returns Array of URLFeatures objects
 */
export function analyzeURLs(urls: string[]): URLFeatures[] {
  return urls.map(url => analyzeURL(url));
}
