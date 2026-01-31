// Content script for WiseShield
// This script is injected into every web page

console.log('WiseShield content script loaded');

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'showWarning') {
    showInlineWarning(request.data);
    sendResponse({ success: true });
  }
  
  if (request.action === 'hideWarning') {
    hideInlineWarning();
    sendResponse({ success: true });
  }
  
  return false;
});

// Show inline warning banner at top of page
function showInlineWarning(data) {
  // Remove existing warning if present
  hideInlineWarning();
  
  const warningBanner = document.createElement('div');
  warningBanner.id = 'wiseshield-warning-banner';
  warningBanner.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    padding: 16px 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    font-size: 14px;
    z-index: 999999;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: space-between;
  `;
  
  const message = document.createElement('div');
  message.style.cssText = 'flex: 1; display: flex; align-items: center; gap: 12px;';

  // Safe insertion: avoid innerHTML with untrusted data
  const iconSpan = document.createElement('span');
  iconSpan.style.fontSize = '20px';
  iconSpan.textContent = '⚠️';

  const textSpan = document.createElement('span');
  const strong = document.createElement('strong');
  strong.textContent = 'Warning:';
  textSpan.appendChild(strong);
  textSpan.appendChild(document.createTextNode(' ' + (data && data.message ? String(data.message) : 'This site may be unsafe')));

  message.appendChild(iconSpan);
  message.appendChild(textSpan);
  
  const closeButton = document.createElement('button');
  closeButton.textContent = '✕';
  closeButton.style.cssText = `
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  `;
  closeButton.onclick = () => hideInlineWarning();
  
  warningBanner.appendChild(message);
  warningBanner.appendChild(closeButton);
  
  document.body.style.marginTop = '60px';
  document.body.insertBefore(warningBanner, document.body.firstChild);
}

// Hide inline warning banner
function hideInlineWarning() {
  const existing = document.getElementById('wiseshield-warning-banner');
  if (existing) {
    existing.remove();
    document.body.style.marginTop = '';
  }
}

// Optional: Monitor for suspicious form submissions
document.addEventListener('submit', (event) => {
  const form = event.target;
  
  // Check if form has password field
  const hasPassword = form.querySelector('input[type="password"]');
  if (hasPassword) {
    console.log('WiseShield: Password form detected on', window.location.href);
    // Could send additional warning to background script
  }
}, true);
