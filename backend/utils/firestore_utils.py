# backend/utils/firestore_utils.py
import os
import firebase_admin
from firebase_admin import credentials, firestore

# Path to your service account json
BASE_DIR = os.path.dirname(os.path.dirname(__file__))
KEY_PATH = os.path.join(BASE_DIR, "firebase_key.json")

if not firebase_admin._apps:
    cred = credentials.Certificate(KEY_PATH)
    firebase_admin.initialize_app(cred)

db = firestore.client()

def save_session(email, text, emotion, advice):
    user_doc = db.collection("users").document(email)
    session_data = {
        "text": text,
        "emotion": emotion,
        "advice": advice,
        "ts": firestore.SERVER_TIMESTAMP
    }
    user_doc.collection("sessions").add(session_data)
    # Also update last_active
    user_doc.set({"email": email}, merge=True)

def get_user_history(email):
    user_doc = db.collection("users").document(email)
    sessions = user_doc.collection("sessions").order_by("ts", direction=firestore.Query.DESCENDING).stream()
    out = []
    for s in sessions:
        d = s.to_dict()
        # Convert Firestore timestamp to string if present
        ts = d.get("ts")
        if ts:
            d["ts"] = ts.isoformat()
        out.append(d)
    return out
