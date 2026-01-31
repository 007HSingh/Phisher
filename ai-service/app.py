from flask import Flask, request, jsonify
import pickle
import os
import logging

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Path to the model
MODEL_PATH = os.getenv('MODEL_PATH', 'model/url_model.pkl')

# Load the model
try:
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
    logger.info("Model loaded successfully")
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

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
