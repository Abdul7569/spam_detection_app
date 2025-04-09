from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer

# Enable CORS
app = Flask(__name__)
CORS(app)

# Load the saved model and vectorizer
with open("spam_model.pkl", "rb") as model_file:
    model_nb = pickle.load(model_file)

with open("vectorizer.pkl", "rb") as vec_file:
    tfidf = pickle.load(vec_file)

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
    app.run(debug=True)
