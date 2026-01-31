#!/usr/bin/env python3
"""
WiseShield Backend - Example Implementation
A simple Flask-based backend server for WiseShield extension analysis
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from functools import wraps
from datetime import datetime, timedelta
import logging
import os
from urllib.parse import urlparse
import ssl
import json

# Configuration
API_KEY = os.getenv('WISESHIELD_API_KEY', 'your-secret-key-here')
DEBUG = os.getenv('DEBUG', 'False') == 'True'

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Simple rate limiter
request_counts = {}
RATE_LIMIT_REQUESTS = 100
RATE_LIMIT_WINDOW = 60  # seconds

# Known threats database (in production, use a real database)
THREATS_DATABASE = {
    'phishing-site-example.com': {'risk_level': 'HIGH', 'threat_type': 'phishing'},
    'malware-distribution.net': {'risk_level': 'HIGH', 'threat_type': 'malware'},
    'suspicious-banking.tk': {'risk_level': 'MEDIUM', 'threat_type': 'phishing'},
}

STATISTICS = {
    'total_urls_analyzed': 1250000,
    'threats_blocked': 45000,
    'phishing_sites': 28000,
    'malware_sites': 12000,
    'suspicious_sites': 5000,
    'false_positives': 230,
    'accuracy_rate': 0.9945,
    'database_size': 850000,
}


def require_api_key(f):
    """Decorator to require API key for protected endpoints"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        
        if not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Missing or invalid API key'}), 401
        
        token = auth_header.split('Bearer ')[1]
        if token != API_KEY:
            return jsonify({'error': 'Invalid API key'}), 401
        
        return f(*args, **kwargs)
    return decorated_function


def rate_limit_check(client_ip):
    """Check if client is rate limited"""
    now = datetime.now()
    
    if client_ip not in request_counts:
        request_counts[client_ip] = []
    
    # Remove old requests outside the window
    request_counts[client_ip] = [
        req_time for req_time in request_counts[client_ip]
        if now - req_time < timedelta(seconds=RATE_LIMIT_WINDOW)
    ]
    
    # Check if over limit
    if len(request_counts[client_ip]) >= RATE_LIMIT_REQUESTS:
        return False
    
    # Add current request
    request_counts[client_ip].append(now)
    return True


def get_client_ip():
    """Get client IP from request"""
    if request.environ.get('HTTP_X_FORWARDED_FOR'):
        return request.environ['HTTP_X_FORWARDED_FOR'].split(',')[0]
    return request.remote_addr


def validate_url(url):
    """Validate URL format"""
    try:
        result = urlparse(url)
        return all([result.scheme in ('http', 'https'), result.netloc])
    except Exception:
        return False


def analyze_url_advanced(url):
    """
    Advanced URL analysis using multiple heuristics
    In production, integrate with ML model, threat databases, etc.
    """
    suspicious_indicators = []
    score = 0
    
    try:
        parsed = urlparse(url)
        hostname = parsed.hostname or ''
        
        # Check for IP address
        if hostname.count('.') == 3 and all(p.isdigit() for p in hostname.split('.')):
            suspicious_indicators.append('Uses IP address instead of domain')
            score += 0.3
        
        # Check for suspicious TLDs
        suspicious_tlds = ['.tk', '.ml', '.ga', '.cf', '.xyz', '.top']
        if any(hostname.endswith(tld) for tld in suspicious_tlds):
            suspicious_indicators.append('Suspicious TLD')
            score += 0.25
        
        # Check for @ symbol
        if '@' in url:
            suspicious_indicators.append('Contains @ symbol')
            score += 0.3
        
        # Check for excessive length
        if len(url) > 75:
            suspicious_indicators.append('Unusually long URL')
            score += 0.15
        
        # Check for phishing keywords
        phishing_keywords = ['login', 'signin', 'verify', 'secure', 'account', 'banking']
        keyword_count = sum(1 for kw in phishing_keywords if kw in url.lower())
        if keyword_count > 2:
            suspicious_indicators.append('Contains phishing keywords')
            score += 0.25
        
        # Check for HTTP
        if parsed.scheme == 'http':
            suspicious_indicators.append('No HTTPS encryption')
            score += 0.1
        
        # Determine risk level
        if score > 0.6:
            risk_level = 'HIGH'
        elif score > 0.3:
            risk_level = 'MEDIUM'
        else:
            risk_level = 'SAFE'
        
        return {
            'risk_level': risk_level,
            'score': min(score, 0.95),
            'reason': f'Detected {len(suspicious_indicators)} indicator(s)',
            'features_detected': suspicious_indicators[:5],
            'recommendation': get_recommendation(risk_level)
        }
    
    except Exception as e:
        logger.error(f'Analysis error for {url}: {str(e)}')
        return {
            'risk_level': 'SAFE',
            'score': 0.1,
            'reason': 'Unable to analyze URL',
            'features_detected': [],
            'recommendation': 'Be cautious when entering sensitive information'
        }


def get_recommendation(risk_level):
    """Get recommendation text based on risk level"""
    recommendations = {
        'HIGH': 'Do not proceed to this site. It shows strong indicators of phishing.',
        'MEDIUM': 'Exercise caution. Avoid entering sensitive information.',
        'SAFE': 'This site appears safe. Always verify URLs before entering passwords.'
    }
    return recommendations.get(risk_level, 'Unknown risk level')


# ============= API ENDPOINTS =============

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'ok',
        'version': '1.0',
        'timestamp': int(datetime.now().timestamp() * 1000)
    })


@app.route('/analyze', methods=['POST'])
def analyze():
    """Analyze a single URL for threats"""
    client_ip = get_client_ip()
    
    # Rate limiting
    if not rate_limit_check(client_ip):
        return jsonify({
            'error': 'Rate limit exceeded',
            'code': 'RATE_LIMITED',
            'retry_after': RATE_LIMIT_WINDOW
        }), 429
    
    data = request.get_json()
    
    if not data or 'url' not in data:
        return jsonify({'error': 'URL required'}), 400
    
    url = data['url'].strip()
    
    if not validate_url(url):
        return jsonify({'error': 'Invalid URL format', 'code': 'INVALID_URL'}), 400
    
    logger.info(f'Analyzing URL: {url}')
    
    # Check threat database first
    hostname = urlparse(url).hostname or ''
    if hostname in THREATS_DATABASE:
        threat = THREATS_DATABASE[hostname]
        return jsonify({
            'url': url,
            'risk_level': threat['risk_level'],
            'score': 0.9 if threat['risk_level'] == 'HIGH' else 0.5,
            'reason': f'Found in threat database ({threat["threat_type"]})',
            'features_detected': ['Known threat'],
            'recommendation': get_recommendation(threat['risk_level']),
            'source': 'threat_database',
            'timestamp': int(datetime.now().timestamp() * 1000)
        })
    
    # Perform analysis
    result = analyze_url_advanced(url)
    
    return jsonify({
        **result,
        'url': url,
        'source': 'heuristic_analysis',
        'timestamp': int(datetime.now().timestamp() * 1000)
    })


@app.route('/batch-analyze', methods=['POST'])
def batch_analyze():
    """Analyze multiple URLs in one request"""
    client_ip = get_client_ip()
    
    # Rate limiting (more generous for batch)
    if not rate_limit_check(client_ip):
        return jsonify({
            'error': 'Rate limit exceeded',
            'code': 'RATE_LIMITED',
            'retry_after': RATE_LIMIT_WINDOW
        }), 429
    
    data = request.get_json()
    
    if not data or 'urls' not in data:
        return jsonify({'error': 'URLs required'}), 400
    
    urls = data['urls']
    
    if not isinstance(urls, list) or len(urls) == 0:
        return jsonify({'error': 'Invalid URLs format'}), 400
    
    if len(urls) > 100:
        return jsonify({'error': 'Maximum 100 URLs per request'}), 400
    
    results = []
    for url in urls:
        if not validate_url(url):
            continue
        
        result = analyze_url_advanced(url)
        results.append({
            'url': url,
            'risk_level': result['risk_level'],
            'score': result['score']
        })
    
    return jsonify({
        'results': results,
        'timestamp': int(datetime.now().timestamp() * 1000)
    })


@app.route('/check-threat', methods=['POST'])
def check_threat():
    """Check if URL is in threat database"""
    data = request.get_json()
    
    if not data or 'url' not in data:
        return jsonify({'error': 'URL required'}), 400
    
    url = data['url'].strip()
    hostname = urlparse(url).hostname or ''
    
    if hostname in THREATS_DATABASE:
        threat = THREATS_DATABASE[hostname]
        return jsonify({
            'url': url,
            'in_database': True,
            'risk_level': threat['risk_level'],
            'threat_type': threat.get('threat_type', 'unknown'),
            'confidence': 0.98,
            'first_seen': int((datetime.now() - timedelta(days=30)).timestamp() * 1000),
            'last_seen': int(datetime.now().timestamp() * 1000),
            'reports': 156
        })
    
    return jsonify({
        'url': url,
        'in_database': False
    })


@app.route('/report', methods=['POST'])
@require_api_key
def report_false_positive():
    """Report a false positive"""
    data = request.get_json()
    
    if not data or 'url' not in data:
        return jsonify({'error': 'URL required'}), 400
    
    url = data['url']
    risk_level = data.get('reported_risk_level', 'UNKNOWN')
    
    logger.warning(f'False positive report for {url} (was {risk_level})')
    
    # In production, save to database
    
    return jsonify({
        'success': True,
        'message': 'Thank you for the report',
        'report_id': f'RPT-{int(datetime.now().timestamp())}'
    })


@app.route('/statistics', methods=['GET'])
def get_statistics():
    """Get threat statistics"""
    STATISTICS['last_update'] = int(datetime.now().timestamp() * 1000)
    return jsonify(STATISTICS)


@app.route('/update-db', methods=['POST'])
@require_api_key
def update_database():
    """Update threat database"""
    logger.info('Database update triggered')
    
    # In production, perform actual database update
    
    return jsonify({
        'success': True,
        'message': 'Database update started',
        'new_entries': 5000,
        'updated_entries': 12000,
        'removed_entries': 230,
        'timestamp': int(datetime.now().timestamp() * 1000)
    })


@app.route('/analytics', methods=['POST'])
def send_analytics():
    """Receive analytics events (fire and forget)"""
    try:
        data = request.get_json()
        event_type = data.get('event_type', 'unknown')
        
        logger.info(f'Analytics event: {event_type}')
        
        # In production, save to analytics database
        
        return jsonify({
            'success': True,
            'event_id': f'EVT-{int(datetime.now().timestamp())}'
        }), 202  # Accepted
    
    except Exception as e:
        logger.error(f'Analytics error: {str(e)}')
        return jsonify({'success': False}), 202  # Still accept


# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    logger.error(f'Internal error: {str(error)}')
    return jsonify({'error': 'Internal server error'}), 500


# Middleware
@app.before_request
def log_request():
    logger.info(f'{request.method} {request.path} from {get_client_ip()}')


@app.after_request
def add_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    return response


if __name__ == '__main__':
    # For development only
    # In production, use a proper WSGI server (gunicorn, uWSGI, etc.)
    
    print("""
    ╔═══════════════════════════════════════╗
    ║  WiseShield Backend - Dev Server      ║
    ║  Version 1.0                          ║
    ╚═══════════════════════════════════════╝
    
    Starting server...
    API Key: {API_KEY[:10]}... (Set WISESHIELD_API_KEY env var to change)
    Debug Mode: {DEBUG}
    
    Health Check: https://localhost:5000/health
    API Documentation: See BACKEND_API_REFERENCE.md
    """.format(API_KEY=API_KEY, DEBUG=DEBUG))
    
    # HTTPS with self-signed certificate for development
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=DEBUG,
        ssl_context='adhoc'  # Requires pyopenssl
    )
