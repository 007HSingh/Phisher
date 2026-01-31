// Form protection module for WiseShield
class FormProtection {
  constructor() {
    this.passwordForms = new Map();
    this.enabled = true;
  }

  // Initialize form protection for current page
  async initialize() {
    const enabled = await this.isEnabled();
    this.enabled = enabled;

    if (!enabled) {
      return;
    }

    this.detectPasswordForms();
    this.setupFormMonitoring();
  }

  // Check if form protection is enabled
  async isEnabled() {
    return new Promise((resolve) => {
      chrome.storage.sync.get('ws_form_protection', (result) => {
        resolve(result.ws_form_protection !== false);
      });
    });
  }

  // Detect password forms on the page
  detectPasswordForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach((form, index) => {
      const passwordInputs = form.querySelectorAll('input[type="password"]');
      
      if (passwordInputs.length > 0) {
        const formId = `form_${index}_${Date.now()}`;
        this.passwordForms.set(formId, {
          form: form,
          passwordInputs: passwordInputs,
          protectionActive: false
        });

        this.addFormProtection(formId, form);
      }
    });
  }

  // Add protection to a password form
  addFormProtection(formId, form) {
    form.addEventListener('submit', async (e) => {
      if (this.enabled) {
        // Check if site has medium or high threat level
        const threatLevel = await this.getCurrentPageThreatLevel();
        
        if (threatLevel === 'HIGH' || threatLevel === 'MEDIUM') {
          e.preventDefault();
          await this.showFormWarning(threatLevel, form);
          return false;
        }
      }
    });
  }

  // Get current page threat level
  async getCurrentPageThreatLevel() {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          action: 'getThreatLevel',
          url: window.location.href
        },
        (response) => {
          resolve(response?.threatLevel || 'SAFE');
        }
      );
    });
  }

  // Show form warning overlay
  async showFormWarning(threatLevel, form) {
    const warningId = `form-warning-${Date.now()}`;
    
    const overlay = document.createElement('div');
    overlay.id = warningId;
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    const warningBox = document.createElement('div');
    warningBox.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 30px;
      max-width: 450px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      text-align: center;
    `;

    const icon = threatLevel === 'HIGH' ? '🚨' : '⚠️';
    const title = threatLevel === 'HIGH' ? 'WARNING: Dangerous Site' : 'WARNING: Suspicious Site';
    const message = threatLevel === 'HIGH' 
      ? 'This site shows strong indicators of phishing. We strongly recommend NOT submitting your password.'
      : 'This site shows some suspicious characteristics. Please verify it\'s legitimate before entering your password.';

    warningBox.innerHTML = `
      <div style="font-size: 40px; margin-bottom: 16px;">${icon}</div>
      <h2 style="color: ${threatLevel === 'HIGH' ? '#dc2626' : '#ea580c'}; margin-bottom: 12px; font-size: 20px; font-weight: 700;">${title}</h2>
      <p style="color: #6b7280; margin-bottom: 20px; font-size: 14px; line-height: 1.6;">${message}</p>
      
      <div style="background: #f3f4f6; padding: 12px; border-radius: 6px; margin-bottom: 24px; font-size: 12px; color: #4b5563; text-align: left;">
        <strong style="display: block; margin-bottom: 8px;">Tips to stay safe:</strong>
        <ul style="margin: 0; padding-left: 20px;">
          <li>Always verify the URL in your address bar</li>
          <li>Check the domain name carefully for typos</li>
          <li>Look for HTTPS and a padlock icon</li>
          <li>If unsure, visit the official website directly</li>
        </ul>
      </div>

      <div style="display: flex; gap: 12px;">
        <button id="cancel-submit" style="
          flex: 1;
          padding: 10px;
          border: 1px solid #d1d5db;
          background: #f3f4f6;
          color: #1a1d29;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        ">Don't Submit</button>
        <button id="force-submit" style="
          flex: 1;
          padding: 10px;
          border: none;
          background: #4f46e5;
          color: white;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        ">I Understand, Submit Anyway</button>
      </div>

      <p style="font-size: 11px; color: #9ca3af; margin-top: 16px;">
        Having issues? <a href="https://wiseshield.example.com/false-positive" target="_blank" style="color: #4f46e5; text-decoration: none;">Report false positive</a>
      </p>
    `;

    overlay.appendChild(warningBox);
    document.body.appendChild(overlay);

    // Event handlers
    document.getElementById('cancel-submit').addEventListener('click', () => {
      overlay.remove();
    });

    document.getElementById('force-submit').addEventListener('click', () => {
      overlay.remove();
      // User confirmed, allow form submission
      if (form) {
        form.removeEventListener('submit', (e) => e.preventDefault());
        form.submit();
      }
    });

    // Close on escape key
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') {
        overlay.remove();
        document.removeEventListener('keydown', closeOnEscape);
      }
    };
    document.addEventListener('keydown', closeOnEscape);
  }

  // Monitor for new forms added dynamically
  observeForNewForms() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.tagName === 'FORM') {
                const passwordInputs = node.querySelectorAll('input[type="password"]');
                if (passwordInputs.length > 0) {
                  const formId = `form_${Date.now()}_${Math.random()}`;
                  this.passwordForms.set(formId, {
                    form: node,
                    passwordInputs: passwordInputs,
                    protectionActive: false
                  });
                  this.addFormProtection(formId, node);
                }
              }
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return observer;
  }

  setupFormMonitoring() {
    this.observeForNewForms();
  }

  // Check if page has password fields
  hasPasswordFields() {
    return document.querySelectorAll('input[type="password"]').length > 0;
  }

  // Get list of all password fields on page
  getPasswordFields() {
    return Array.from(document.querySelectorAll('input[type="password"]'));
  }
}

// Initialize form protection
const formProtection = new FormProtection();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    formProtection.initialize();
  });
} else {
  formProtection.initialize();
}
