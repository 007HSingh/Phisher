// Popup script for WiseShield extension

document.addEventListener('DOMContentLoaded', async () => {
  await loadCurrentTabAnalysis();
  
  // Set up recheck button
  document.getElementById('recheckBtn').addEventListener('click', recheckCurrentPage);
});

// Load analysis for current tab
async function loadCurrentTabAnalysis() {
  try {
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab) {
      showError('No active tab found');
      return;
    }

    // Display current URL
    const urlElement = document.getElementById('currentUrl');
    const displayUrl = tab.url.length > 50 ? tab.url.substring(0, 47) + '...' : tab.url;
    urlElement.textContent = displayUrl;
    urlElement.title = tab.url;

    // Check if URL should be analyzed
    if (!shouldAnalyzeURL(tab.url)) {
      showError('This page cannot be analyzed');
      return;
    }

    // Get analysis result from storage
    const result = await getAnalysisResult(tab.id);

    if (!result) {
      showError('No analysis available. Try rechecking.');
      return;
    }

    // Display result
    displayAnalysisResult(result.result);

  } catch (error) {
    console.error('Error loading analysis:', error);
    showError('Failed to load analysis');
  }
}

// Display analysis result
function displayAnalysisResult(result) {
  // Hide loading and error states
  document.getElementById('loadingState').style.display = 'none';
  document.getElementById('errorState').style.display = 'none';
  document.getElementById('resultState').style.display = 'block';

  // Get risk level
  const riskLevel = result.risk_level || 'UNKNOWN';
  const score = result.score || 0;
  const scorePercent = Math.round(score * 100);

  // Update status card
  const statusCard = document.getElementById('statusCard');
  const statusIcon = document.getElementById('statusIcon');
  const statusLabel = document.getElementById('statusLabel');
  const statusTitle = document.getElementById('statusTitle');
  const riskValue = document.getElementById('riskValue');
  const riskFill = document.getElementById('riskFill');
  const statusDescription = document.getElementById('statusDescription');

  // Set card class
  statusCard.className = 'status-card ' + riskLevel.toLowerCase();
  statusIcon.className = 'status-icon ' + riskLevel.toLowerCase();
  statusLabel.className = 'status-label ' + riskLevel.toLowerCase();
  riskValue.className = 'risk-meter-value ' + riskLevel.toLowerCase();
  riskFill.className = 'risk-meter-fill ' + riskLevel.toLowerCase();

  // Update icon
  switch (riskLevel) {
    case 'HIGH':
      statusIcon.textContent = '🚨';
      statusLabel.textContent = 'High Risk';
      statusTitle.textContent = 'Dangerous';
      break;
    case 'MEDIUM':
      statusIcon.textContent = '⚠️';
      statusLabel.textContent = 'Caution';
      statusTitle.textContent = 'Suspicious';
      break;
    case 'SAFE':
      statusIcon.textContent = '✓';
      statusLabel.textContent = 'Secure';
      statusTitle.textContent = 'Safe';
      break;
    default:
      statusIcon.textContent = '?';
      statusLabel.textContent = 'Unknown';
      statusTitle.textContent = 'Unknown';
  }

  // Update risk meter
  riskValue.textContent = scorePercent + '%';
  riskFill.style.width = scorePercent + '%';

  // Update description
  if (result.reason) {
    statusDescription.textContent = result.reason;
  } else {
    switch (riskLevel) {
      case 'HIGH':
        statusDescription.textContent = 'This site shows strong indicators of phishing';
        break;
      case 'MEDIUM':
        statusDescription.textContent = 'This site has some suspicious characteristics';
        break;
      case 'SAFE':
        statusDescription.textContent = 'This site appears to be legitimate';
        break;
      default:
        statusDescription.textContent = 'Unable to determine risk level';
    }
  }

  // Show issues if available
  if (result.features_detected && result.features_detected.length > 0) {
    const issuesSection = document.getElementById('issuesSection');
    const issuesList = document.getElementById('issuesList');
    
    issuesSection.style.display = 'block';

    // Clear existing children safely
    while (issuesList.firstChild) issuesList.removeChild(issuesList.firstChild);

    result.features_detected.forEach(feature => {
      const div = document.createElement('div');
      div.className = 'issue-item';

      const icon = document.createElement('div');
      icon.className = 'issue-icon';
      icon.textContent = '⚡';

      const text = document.createElement('span');
      text.textContent = String(feature);

      div.appendChild(icon);
      div.appendChild(text);
      issuesList.appendChild(div);
    });
  }

  // Show recommendation if available
  if (result.recommendation) {
    const recommendationSection = document.getElementById('recommendationSection');
    const recommendationText = document.getElementById('recommendationText');
    
    recommendationSection.style.display = 'block';
    recommendationText.textContent = result.recommendation;
  }
}

// Show error state
function showError(message) {
  document.getElementById('loadingState').style.display = 'none';
  document.getElementById('resultState').style.display = 'none';
  document.getElementById('errorState').style.display = 'block';
  document.getElementById('errorMessage').textContent = message;
}

// Recheck current page
async function recheckCurrentPage() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab) {
      return;
    }

    // Show loading state
    document.getElementById('resultState').style.display = 'none';
    document.getElementById('errorState').style.display = 'none';
    document.getElementById('loadingState').style.display = 'block';

    // Send message to background script to recheck
    await chrome.runtime.sendMessage({
      action: 'recheckURL',
      url: tab.url,
      tabId: tab.id
    });

    // Wait a bit for the recheck to complete
    setTimeout(async () => {
      await loadCurrentTabAnalysis();
    }, 2000);

  } catch (error) {
    console.error('Error rechecking page:', error);
    showError('Failed to recheck page');
  }
}

// Helper function - check if URL should be analyzed
function shouldAnalyzeURL(url) {
  if (url.startsWith('chrome://') || 
      url.startsWith('chrome-extension://') ||
      url.startsWith('edge://') ||
      url.startsWith('about:')) {
    return false;
  }
  
  return url.startsWith('http://') || url.startsWith('https://');
}

// Helper function - get analysis result from storage
async function getAnalysisResult(tabId) {
  const key = `analysis_${tabId}`;
  const data = await chrome.storage.local.get(key);
  return data[key] || null;
}
