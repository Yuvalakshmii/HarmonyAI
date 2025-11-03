# backend/utils/emotion_predict.py
import os
import pickle
import numpy as np

# Attempt to load TF-IDF + BiLSTM model; if missing, fallback to simple rule-based classifier
TFIDF_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "tfidf_vectorizer.pkl")
BILSTM_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "bilstm_model.h5")

def predict_emotion_with_model(text):
    try:
        from tensorflow.keras.models import load_model
        # load model and vectorizer
        import joblib
        tfidf = joblib.load(TFIDF_PATH)
        model = load_model(BILSTM_PATH)
        X = tfidf.transform([text]).toarray()
        pred = model.predict(X)
        labels = ['joy', 'fear', 'anger', 'sadness', 'disgust', 'shame', 'guilt']
        return labels[int(np.argmax(pred))]
    except Exception as e:
        # If any issue loading model, return None to fall back
        return None

def fallback_rule_based(text):
    txt = text.lower()
    if any(w in txt for w in ["angry", "furious", "mad", "rage", "yelled","frustrated","irritated","annoyed","annoying","annoyance","irritation","frustration","frustrated","irritated","annoyed","annoying","annoyance","irritation","frustration"]):
        return "angry"
    if any(w in txt for w in ["sad", "upset", "depressed", "cry", "lonely", "painful","pain","suffering","miserable","unhappy","unpleasant","uncomfortable","discomfort","displeasure","discomfort","displeasure"]):
        return "sad"
    if any(w in txt for w in ["happy", "glad", "joy", "lovely", "excited"]):
        return "happy"
    if any(w in txt for w in ["scared", "afraid", "anxious", "worried"]):
        return "fear"
    if any(w in txt for w in ["wow", "surprised", "unexpected", "shocked","astonished","astonement","astonished","astonement"]):
        return "surprise"
    return "neutral"

def predict_emotion(text):
    # Try model first
    label = predict_emotion_with_model(text)
    if label:
        return label
    # Fallback
    return fallback_rule_based(text)
