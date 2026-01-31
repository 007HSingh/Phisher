# WiseShield - AI-Powered Phishing Detection System

A real-time phishing detection system consisting of a Chrome extension frontend and Flask backend with machine learning-based URL analysis.

![WiseShield Icon](/Users/harshraj/.gemini/antigravity/brain/8f49c986-c729-4d24-a2d2-9c62e24e8c1e/wiseshield_icon_1769805009443.png)

## Architecture

### Chrome Extension (Frontend)

- **URL Monitoring**: Intercepts navigation events in real-time
- **Background Service Worker**: Communicates with backend API
- **Visual Warnings**: Badge indicators and full-page warnings for high-risk sites
- **Modern UI**: Clean popup interface with risk scores and recommendations

### Flask Backend (Server)

- **ML-Based Detection**: Random Forest classifier trained on URL features
- **Multi-Layer Analysis**:
  - URL features (24 features: length, special chars, entropy, etc.)
  - Domain features (6 features: WHOIS data, DNS, age)
  - Content features (11 features: SSL, forms, redirects)
- **Blacklist/Whitelist**: SQLite databases for quick lookups
- **REST API**: `/analyze` endpoint for phishing detection

## Installation

### Backend Setup

1. **Navigate to backend directory**:

   ```bash
   cd wiseshield-backend
   ```

2. **Install Python dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Train the ML model** (creates placeholder model):

   ```bash
   python models/train_model.py
   ```

4. **Start the Flask server**:

   ```bash
   python app.py
   ```

   The server will start at `http://localhost:5000`

### Chrome Extension Setup

1. **Open Chrome Extensions page**:
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)

2. **Load the extension**:
   - Click "Load unpacked"
   - Select the `wiseshield-extension` folder

3. **Verify installation**:
   - Extension icon should appear in toolbar
   - Click icon to see popup UI

## Usage

1. **Start the backend**:

   ```bash
   cd wiseshield-backend
   python app.py
   ```

2. **Browse the web normally**:
   - Extension monitors all HTTP/HTTPS navigation
   - Badge shows real-time risk status:
     - ✓ (Green) = Safe
     - ? (Yellow) = Medium risk
     - ! (Red) = High risk

3. **View details**:
   - Click extension icon to see risk score and analysis
   - High-risk sites show full-page warning

4. **Warning page options**:
   - "Go Back to Safety" - Returns to previous page
   - "Proceed Anyway" - Continues at your own risk

## API Reference

### POST /analyze

Analyzes a URL for phishing indicators.

**Request**:

```json
{
  "url": "http://example.com"
}
```

**Response**:

```json
{
  "risk_level": "SAFE|MEDIUM|HIGH",
  "score": 0.23,
  "reason": "Analysis detected 2 suspicious indicators",
  "features_detected": ["Unusually long URL", "Uses suspicious TLD"],
  "recommendation": "Exercise caution..."
}
```

## Features

### URL Analysis

- IP address detection
- Suspicious TLD identification
- Special character analysis
- Entropy calculation
- Phishing keyword detection
- Subdomain counting

### Domain Analysis

- WHOIS lookup for registration date
- Domain age calculation
- DNS resolution verification
- Expiration date checking

### Content Analysis

- SSL certificate validation
- Login form detection
- Redirect tracking
- Suspicious content scanning
- External resource analysis

## Development

### Project Structure

```
wiseshield/
├── wiseshield-extension/
│   ├── manifest.json       # Extension config
│   ├── background.js       # Service worker
│   ├── content.js          # Page injection
│   ├── popup.html/js       # Extension UI
│   ├── warning.html        # Block page
│   ├── utils.js            # Helpers
│   └── icon*.png           # Icons
│
└── wiseshield-backend/
    ├── app.py              # Flask application
    ├── requirements.txt    # Dependencies
    ├── feature_extraction/
    │   ├── url_features.py
    │   ├── domain_features.py
    │   └── content_features.py
    ├── models/
    │   ├── train_model.py
    │   ├── phishing_model.pkl
    │   └── vectorizer.pkl
    └── database/
        ├── db_utils.py
        ├── blacklist.db
        └── whitelist.db
```

### Training a Custom Model

The current model uses dummy training data. To train with real data:

1. Obtain a phishing dataset (e.g., PhishTank, UCI Phishing Dataset)
2. Modify `models/train_model.py` to load your dataset
3. Retrain: `python models/train_model.py`

### Adding to Blacklist/Whitelist

```python
from database.db_utils import add_url

# Add to blacklist
add_url('database/blacklist.db', 'malicious-site.com', 'Phishing attempt')

# Add to whitelist
add_url('database/whitelist.db', 'trusted-site.com', 'Corporate website')
```

## Configuration

### Backend API URL

To change the backend URL (e.g., for deployment), edit `wiseshield-extension/utils.js`:

```javascript
const API_BASE_URL = "https://your-server.com";
```

### Cache Duration

Adjust result caching in `background.js`:

```javascript
const CACHE_DURATION = 5 * 60 * 1000; // milliseconds
```

## Future Improvements

- [ ] Integration with Google Safe Browsing API
- [ ] PhishTank API integration
- [ ] Real-time training data updates
- [ ] User feedback mechanism
- [ ] False positive reporting
- [ ] Historical analysis dashboard
- [ ] Browser notification system
- [ ] Multi-language support

## Security Notes

> **⚠️ Important**: This is a demonstration system with a placeholder ML model. For production use:
>
> - Train with real, large-scale phishing datasets
> - Deploy backend to secure server with HTTPS
> - Implement rate limiting and authentication
> - Regular blacklist/whitelist updates
> - Monitor for false positives/negatives

## License

MIT License - Feel free to modify and distribute

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

**Built with ❤️ for safer web browsing**
