/**
 * Extension: URL Analysis Integration
 * Send URL features to backend from the extension
 */

/**
 * Send URL analysis to backend from extension
 * @param {string} url - The URL to analyze and send
 * @returns {Promise} Response from backend
 */
async function sendURLAnalysisToBackend(url) {
  try {
    // Import the URL analysis function (make sure url-analysis.js is loaded)
    if (typeof analyzeURL !== 'function') {
      throw new Error('URL analysis utility not loaded');
    }

    // Extract URL features
    const features = analyzeURL(url);

    // Prepare payload for backend
    const payload = {
      url: url,
      features: features,
      timestamp: new Date().toISOString()
    };

    console.log('Extension: Sending URL analysis to backend:', payload);

    // Send to backend (adjust URL based on your backend configuration)
    const backendUrl = 'https://localhost:5000/api/analyze-url'; // or get from backend-integration.js

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Backend response:', result);

    return result;
  } catch (error) {
    console.error('Error sending URL analysis to backend:', error);
    throw error;
  }
}

/**
 * Example usage in content.js or form-protection.js
 * 
 * // When you detect a form submission to a potentially dangerous URL
 * const formAction = form.getAttribute('action');
 * try {
 *   const result = await sendURLAnalysisToBackend(formAction);
 *   if (result.risk_level === 'HIGH') {
 *     // Show warning to user
 *     displayPhishingWarning(formAction, result);
 *   }
 * } catch (error) {
 *   console.error('Failed to analyze URL:', error);
 * }
 */

/**
 * Integration with existing form-protection.js
 * Add this to your form detection logic
 * 
 * Example from form-protection.js:
 * 
 * async function checkFormSecurity(form) {
 *   const action = form.getAttribute('action');
 *   if (!action) return;
 *   
 *   // Get URL features
 *   const features = analyzeURL(action);
 *   
 *   // Send to backend for ML prediction
 *   const result = await sendURLAnalysisToBackend(action);
 *   
 *   // Show warning if high risk
 *   if (result.risk_level === 'HIGH') {
 *     showFormWarning(form, action, result);
 *   }
 * }
 */
