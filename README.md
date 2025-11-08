🌸 Harmony AI — Emotional Mediator for Healthy Relationships

A full-stack AI system for emotion understanding, partner insights, and supportive guidance.

📌 Overview

Harmony AI is a modern emotional-intelligence web application designed to help individuals and couples understand their emotional states and improve communication through AI-guided insights.

It detects emotions using a Bi-LSTM + TF-IDF classifier, generates empathetic recommendations using an LLM (Ollama), and stores complete conversation history securely in Firebase Firestore.

A unique ✨ Blend Mode provides mutual emotional insights by connecting two partner accounts.

This project integrates:
✅ Machine Learning
✅ Natural Language Processing
✅ Full-Stack Web Development
✅ LLM-powered recommendation system
✅ Firebase-based data persistence

📸 RESULTS

✅ Home Screen
<img width="385" height="204" alt="image" src="https://github.com/user-attachments/assets/2817d87c-83f5-4126-b412-fd43b6015b17" />

✅ Chat Window

RECENT SESSION
<img width="401" height="217" alt="image" src="https://github.com/user-attachments/assets/3b027207-ade8-4b05-b0c9-bd2212c57c17" />
NEW SESSION
<img width="432" height="247" alt="image" src="https://github.com/user-attachments/assets/f235ef25-e7d5-489a-9736-11908c3e869f" />

✅ Blend Insights
<img width="432" height="236" alt="image" src="https://github.com/user-attachments/assets/fb5d3416-64a7-4f66-867c-7b7efdd285f0" />
<img width="432" height="215" alt="image" src="https://github.com/user-attachments/assets/f5c0a6d5-06ca-4d67-959d-79deb8d61a94" />
<img width="432" height="259" alt="image" src="https://github.com/user-attachments/assets/bd3f01bc-863a-40d1-bff5-7f71b219095d" />

✅ Dark Mode
<img width="432" height="235" alt="image" src="https://github.com/user-attachments/assets/eaead839-cb6e-4ca2-b6d4-9cab0ddcc0d7" />


✨ Features
🔥 Emotion Detection

Uses Bi-LSTM + TF-IDF to classify emotional tone

Detects: joy, sadness, anger, guilt, shame, disgust, fear

💬 Real-time Chat

AI-generated empathetic advice

Clean UI with light/dark modes

Voice input supported

📚 Session History

Saved per user in Firestore

Click to revisit past emotional conversations

🆕 New Session

Start a completely fresh conversation any time

💞 Blend Mode (Novel Feature)

Connect two partners via email

Pulls emotional histories of both

Generates relationship insights + compatibility markers

🔒 Firestore Storage

Secure session storage

Scalable NoSQL structure

Easy retrieval per user

🧠 Architecture
Frontend (React + Vite)
        |
        |  (REST API calls)
        v
Backend (FastAPI)
        |
        |--> Emotion Model (BiLSTM + TF-IDF)
        |--> LLM Generator (Ollama)
        |--> Firestore (Session Storage)

🔧 Tech Stack
🖥️ Frontend

React (Vite)

Firebase Authentication

Firestore

CSS + custom themes

⚙️ Backend

FastAPI

Uvicorn

Pydantic

🤖 ML / AI

TF-IDF vectorizer

Bi-LSTM classifier

Ollama LLM for empathetic response generation

📂 Project Structure
HarmonyAI/
│── backend/
│   ├── main.py
│   ├── utils/
│   │   ├── emotion_predict.py
│   │   ├── firestore_utils.py
│   │   ├── ollama_api.py
│   
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── utils/
│   │   └── App.jsx
│   
│
│── screenshots/
│── README.md
│── .gitignore

🚀 Setup Instructions
✅ 1. Clone the Repo
git clone https://github.com/Yuvalakshmii/HarmonyAI.git
cd HarmonyAI

✅ 2. Setup Backend (FastAPI)
Create virtual env:
cd backend
python3 -m venv venv
source venv/bin/activate

Install packages:
pip install -r requirements.txt

Add Firebase key:

Place your key here:

backend/.keys/firebase_key.json

Run backend:
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

✅ 3. Setup Frontend (React)
cd frontend
npm install
npm run dev


Frontend runs on:
👉 http://localhost:5173

Backend runs on:
👉 http://localhost:8000

Ollama runs on:
👉 http://localhost:11434

📊 Dataset Used
✅ ISEAR Dataset (International Survey on Emotion Antecedents and Reactions)

7,520 samples

Emotion labels: joy, anger, sadness, fear, disgust, guilt, shame

Used for training Bi-LSTM classifier

Preprocessing includes:

Lowercasing

Tokenization

Stopword removal

Stemming

TF-IDF vectorization

🧪 Results

✅ Real-time emotion detection
✅ Accurate Bi-LSTM predictions
✅ Clean chat UI & history support
✅ Working Blend Mode
✅ Fully functional three-port setup:

5173 → Frontend

8000 → Backend

11434 → Ollama


Conclusion

Harmony AI demonstrates how machine learning, NLP, and modern web development can work together to provide an emotionally intelligent companion for individuals and couples. The system successfully detects emotions, stores conversations, and provides AI-driven reflective insights.

🔮 Future Work

Secure partner-blend invitation system

Add multilingual emotion analysis

Add voice-based emotion recognition

Improve personalization (fine-tuned LLM)

Couple progress dashboard

Mobile app version

💖 Author

Yuvalakshmi M
yuvalakshmi.m2022@vitstudent.ac.in
M.Tech CSE
VIT Chennai
