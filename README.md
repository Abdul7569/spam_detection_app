# 📧 Spam Detection App

A web-based application that classifies SMS or email messages as **Spam** or **Not Spam** using a machine learning pipeline. The model is trained using **TF-IDF Vectorization** and **Multinomial Naive Bayes**.

🌐 **Live Demo:** [spam-detection-app-rhpb.vercel.app](https://spam-detection-app-rhpb.vercel.app)

---

## 🚀 Features

- ✅ Classify text messages in real-time as spam or not spam
- 📊 ML pipeline with TF-IDF + Multinomial Naive Bayes
- ⚛️ React-based modern frontend
- 🌐 Deployed with Vercel

---

## 🧠 How It Works

1. **User Input:** User types a message into the frontend.
2. **TF-IDF Vectorization:** The text is converted into numerical feature vectors using **TF-IDF** (Term Frequency-Inverse Document Frequency).
3. **Classification:** The vectorized input is passed to a **Multinomial Naive Bayes** classifier.
4. **Prediction:** The model returns either:
   - `Spam`
   - `Not Spam`
5. **Result Displayed:** The result is instantly shown in the UI.

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML/CSS
- Axios for API requests
- Vercel (deployment)

### Backend
- Python
- Flask (or FastAPI)
- Scikit-learn
- Trained ML model using:
  - `TfidfVectorizer`
  - `MultinomialNB`

---



