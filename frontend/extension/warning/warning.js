// Warning page logic
document.addEventListener('DOMContentLoaded', () => {
  // Parse URL parameters
  const params = new URLSearchParams(window.location.search);
  const blockedUrl = params.get('url');
  const score = params.get('score');
  const reason = params.get('reason');

  // Display URL
  if (blockedUrl) {
    document.getElementById('urlText').textContent = decodeURIComponent(blockedUrl);
  }

  // Display score
  if (score) {
    const scorePercent = Math.round(parseFloat(score) * 100);
    document.getElementById('scoreValue').textContent = scorePercent + '% Risk';
  }

  // Display reason
  if (reason) {
    document.getElementById('reasonText').textContent = decodeURIComponent(reason);
  }

  // Go back button
  document.getElementById('goBackBtn').addEventListener('click', () => {
    window.history.back();
  });

  // Proceed anyway button
  document.getElementById('proceedBtn').addEventListener('click', async () => {
    if (blockedUrl) {
      // Show confirmation
      const confirmed = confirm(
        '⚠️ FINAL WARNING\n\n' +
        'You are about to visit a site flagged as highly dangerous.\n\n' +
        '❌ DO NOT enter passwords\n' +
        '❌ DO NOT enter personal information\n' +
        '❌ DO NOT enter payment details\n\n' +
        'Are you absolutely sure you want to proceed?'
      );

      if (confirmed) {
        // Tell background script to unblock this URL
        await chrome.runtime.sendMessage({
          action: 'unblockURL',
          url: decodeURIComponent(blockedUrl)
        });

        // Navigate to the URL
        window.location.href = decodeURIComponent(blockedUrl);
      }
    }
  });
});
