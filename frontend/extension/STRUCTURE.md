# WiseShield Extension - New File Structure

## Overview

The WiseShield extension has been reorganized into a professional, scalable folder structure that separates concerns and improves maintainability.

## Directory Structure

```
wiseshield-extension/
├── manifest.json                    # Extension configuration
├── background.js                    # Service worker
├── content.js                       # Content script
├── form-protection.js              # Form protection module
│
├── popup/                           # Extension popup (width: 400px, min-height: 500px)
│   ├── popup.html                   # UI layout
│   ├── popup.js                     # Event handlers and logic
│   └── popup.css                    # Styling
│
├── warning/                         # Full-page warning screen
│   ├── warning.html                 # Warning UI
│   ├── warning.js                   # Warning logic
│   └── warning.css                  # Warning styles
│
├── settings/                        # Settings/Options page
│   ├── settings.html                # Settings UI with 5 tabs
│   └── settings.js                  # Settings logic
│
├── onboarding/                      # First-time user tutorial
│   └── onboarding.html              # 5-slide interactive tutorial
│
├── utils/                           # Reusable utilities
│   ├── api.js                       # API communication helpers
│   ├── storage.js                   # WiseShieldStorage class
│   └── helpers.js                   # Common functions
│
├── styles/                          # Shared stylesheets
│   └── common.css                   # Common variables and styles
│
└── icons/                           # Extension icons
    ├── icon16.png                   # Toolbar icon (16x16)
    ├── icon48.png                   # Extension page icon (48x48)
    └── icon128.png                  # Chrome Web Store icon (128x128)
```

## File Descriptions

### Root Level

- **manifest.json** - Extension metadata and permissions (v1.1.0)
- **background.js** - Service worker handling URL analysis and statistics
- **content.js** - Script injected into web pages for form monitoring
- **form-protection.js** - Password submission warning system

### popup/ Folder

**Purpose:** Extension toolbar popup UI (400x500px)

- **popup.html** - Status card, risk meter, issues list, recommendations
- **popup.js** - Tab analysis, result display, recheck functionality
- **popup.css** - Gradient backgrounds, status colors, animations

### warning/ Folder

**Purpose:** Full-page warning when dangerous sites are detected

- **warning.html** - Warning card layout with reason, URL, risk score
- **warning.js** - Go back / Proceed anyway buttons, URL parsing
- **warning.css** - Red/danger color scheme, card styling, responsive layout

### settings/ Folder

**Purpose:** Configuration page with 5 tabs

- **settings.html** - 5 tabs: General, Protection, Whitelist, Backend, Statistics
- **settings.js** - Tab switching, settings save/load, domain management

**Tabs:**
1. **General** - Enable/disable, notifications, auto-cache
2. **Protection** - Sensitivity, block HIGH, warn MEDIUM, form protection
3. **Whitelist** - Trusted domains (add/remove), blocked domains
4. **Backend** - API endpoint, auth key, timeout, standalone mode, test connection
5. **Statistics** - Threat counter, recent activity, export data

### onboarding/ Folder

**Purpose:** First-time user tutorial (5 slides)

- **onboarding.html** - Slide 1: Welcome, 2: Features, 3: How It Works, 4: Customization, 5: Complete

**Features:**
- Progress dots
- Keyboard navigation (arrow keys)
- Skip button
- Smooth slide transitions

### utils/ Folder

**Purpose:** Reusable JavaScript modules

#### api.js
- `API_BASE_URL` - Default HTTPS endpoint
- `escapeHtml()` - HTML escaping for security
- `apiRequest()` - HTTP requests with retry logic and timeout
- `parseURL()` - Extract URL components
- `shouldAnalyzeURL()` - Check if URL needs analysis
- `getRiskColor()` / `getRiskBadge()` - Utility formatting functions
- `saveAnalysisResult()` - Store analysis in local storage
- `getAnalysisResult()` - Retrieve cached analysis

#### storage.js
- **WiseShieldStorage** class - Unified storage API
  - `getSetting()` / `setSetting()` - Get/set individual settings
  - `addToWhitelist()` / `removeFromWhitelist()` - Manage whitelist
  - `addToBlacklist()` / `removeFromBlacklist()` - Manage blacklist
  - `incrementStat()` - Track statistics
  - `recordActivity()` - Log detection events
  - `getBackendConfig()` / `setBackendConfig()` - Backend management

Storage keys managed:
- Settings (enabled, notifications, auto-cache, sensitivity, etc.)
- Backend config (URL, API key, timeout, standalone mode)
- Whitelist/Blacklist domains
- Statistics (threats blocked, warnings, URLs scanned)
- Recent activity (last 50 events)

#### helpers.js
- `extractDomain()` - Get domain from URL
- `isDomainInList()` - Check domain in whitelist/blacklist
- `formatDomain()` - Remove www. prefix
- `sanitizeDomain()` - Normalize domain input
- `truncateString()` - Truncate long strings
- `isValidURL()` / `isValidEmail()` - Validation functions
- `debounce()` / `throttle()` - Function optimization utilities

### styles/ Folder

**Purpose:** Shared CSS across all pages

#### common.css
- CSS variables for colors, shadows, spacing
- Common button styles (primary, secondary, danger)
- Form input styling
- Badge styles (success, warning, danger)
- Card component styles
- Alert styles
- Toggle switch styles
- Utility classes (spacing, text colors)
- Responsive breakpoints

## Updated manifest.json

Key changes from v1.0.0:

```json
{
  "action": {
    "default_popup": "popup/popup.html",  // Changed path
    "default_icon": {
      "16": "icons/icon16.png",           // Changed path
      "48": "icons/icon48.png",           // Changed path
      "128": "icons/icon128.png"          // Changed path
    }
  },
  "options_page": "settings/settings.html",  // Changed path
  "content_scripts": [
    {
      "js": [
        "utils/storage.js",           // Reorganized
        "utils/api.js",               // New structure
        "utils/helpers.js",           // New structure
        "form-protection.js",
        "content.js"
      ]
    }
  ],
  "web_accessible_resources": [
    {
      "resources": [
        "warning/warning.html",       // Changed path
        "onboarding/onboarding.html"  // Changed path
      ]
    }
  ]
}
```

## Reference Paths

When linking files from different folders, use relative paths:

| From | To | Path |
|---|---|---|
| `popup/popup.js` | `utils/storage.js` | `../utils/storage.js` |
| `settings/settings.html` | `utils/storage.js` | `../utils/storage.js` |
| `warning/warning.js` | `utils/helpers.js` | `../utils/helpers.js` |
| `background.js` (root) | `utils/storage.js` | `utils/storage.js` |

## Size Analysis

| Component | Size | Purpose |
|---|---|---|
| popup/ | ~8 KB | Quick status display |
| warning/ | ~12 KB | Phishing warning page |
| settings/ | ~35 KB | Configuration interface |
| onboarding/ | ~20 KB | User tutorial |
| utils/ | ~30 KB | Reusable code |
| styles/ | ~8 KB | Common styles |
| **Total** | **~113 KB** | Full extension |

## Migration Notes

### Legacy Files
The following files still exist in the root and can be removed (replaced):
- `utils.js` → Use `utils/api.js` instead
- `storage.js` → Use `utils/storage.js` instead
- `options.html` → Use `settings/settings.html` instead
- `options.js` → Use `settings/settings.js` instead
- `popup.html` → Use `popup/popup.html` instead
- `popup.js` → Use `popup/popup.js` instead
- `warning.html` → Use `warning/warning.html` instead
- `onboarding.html` → Use `onboarding/onboarding.html` instead

### Testing Checklist

- [ ] Manifest loads without errors
- [ ] Popup opens and displays correctly
- [ ] Settings page loads and saves preferences
- [ ] Onboarding tutorial displays on first install
- [ ] Warning page shows for dangerous sites
- [ ] Form protection overlay appears on risky pages
- [ ] Statistics track correctly
- [ ] Backend connection works (optional)
- [ ] CSS loads correctly for all pages
- [ ] Whitelist/blacklist functionality works

## Future Improvements

1. **Add localization/** folder for i18n support
2. **Add tests/** folder for unit tests
3. **Add assets/** folder for additional resources
4. **Extract options.js** to settings/ folder
5. **Create content-scripts/** subfolder for multiple content scripts
6. **Add constants.js** to utils for shared constants
7. **Add security/** folder for security-related utilities

## Support

For issues related to file structure organization, please refer to this documentation or check the individual file comments for specific functions.
