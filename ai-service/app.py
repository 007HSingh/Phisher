from flask import Flask, request, jsonify
import pickle
import os
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

import requests

# Path to the model
MODEL_PATH = os.getenv('MODEL_PATH', 'model/url_model.pkl')
MODEL_URL = os.getenv('MODEL_URL') # Optional: URL to download the model from

def download_model(url, path):
    try:
        logger.info(f"Downloading model from {url}...")
        os.makedirs(os.path.dirname(path), exist_ok=True)
        response = requests.get(url, stream=True)
        response.raise_for_status()
        with open(path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        logger.info("Model downloaded successfully")
        return True
    except Exception as e:
        logger.error(f"Failed to download model: {e}")
        return False

# Load the model
if not os.path.exists(MODEL_PATH) and MODEL_URL:
    download_model(MODEL_URL, MODEL_PATH)

try:
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, 'rb') as f:
            model = pickle.load(f)
        logger.info("Model loaded successfully")
    else:
        logger.warning(f"Model file not found at {MODEL_PATH}")
        model = None
except Exception as e:
    logger.error(f"Failed to load model: {e}")
    model = None

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "model_loaded": model is not None})

@app.route('/classify', methods=['POST'])
def classify():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500
    
    data = request.get_json()
    if not data or 'url' not in data:
        return jsonify({"error": "URL required"}), 400
    
    url = data['url']
    
    try:
        # Assuming the model takes a list of URLs or a single URL string
        # and returns a probability or classification.
        # This part depends on how the model was trained.
        # Common pattern: model.predict_proba([url])
        
        # Simplified prediction (adjust based on actual model behavior)
        prediction = model.predict([url])[0]
        try:
            proba = model.predict_proba([url])[0][1] # Probability of phishing
        except:
            proba = 1.0 if prediction == 1 else 0.0
            
        return jsonify({
            "phishing": bool(prediction),
            "probability": float(proba)
        })
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 500

import os

if __name__ == '__main__':
    # Cloud providers like Render/Railway/Heroku assign a dynamic port via the PORT env var
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port)
