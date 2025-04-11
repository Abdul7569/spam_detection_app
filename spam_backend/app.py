from flask import Flask, request, jsonify,send_from_directory
from flask_cors import CORS
import pickle
import os
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

# Enable CORS
app = Flask(__name__, static_folder="build", static_url_path="/")
CORS(app)

# Load the saved model and vectorizer
model_path = os.path.join(os.path.dirname(__file__), 'spam_model.pkl')
with open(model_path, "rb") as model_file:
    model_nb = pickle.load(model_file)

vec_path = os.path.join(os.path.dirname(__file__), 'vectorizer.pkl')
with open(vec_path, "rb") as vec_file:
    tfidf = pickle.load(vec_file)
@app.route('/')
def home():
    return send_from_directory(app.static_folder, "index.html")

@app.route('/predict', methods=['POST'])
def predict():
    # Get the message from the POST request
    data = request.get_json()
    message = data.get("message", "")

    if not message:
        return jsonify({"error": "No message provided"}), 400

    # Transform the input message using the loaded vectorizer
    message_vectorized = tfidf.transform([message])

    # Get prediction (0 = not spam, 1 = spam)
    prediction = model_nb.predict(message_vectorized)

    # Return prediction result
    result = "spam" if prediction == 1 else "not spam"
    return jsonify({"prediction": result})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))  # Use environment variable if available
    app.run(host="0.0.0.0", port=port, debug=True)

