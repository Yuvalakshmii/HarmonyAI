# backend/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils.emotion_predict import predict_emotion
from utils.ollama_api import get_ollama_response
from utils.firestore_utils import save_session, get_user_history

app = FastAPI(title="Harmony AI - Backend")

# 🌐 CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict to frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ✉️ MODELS ---
class ChatRequest(BaseModel):
    email: str
    text: str

class BlendRequest(BaseModel):
    user_email: str
    partner_email: str


# --- 💬 Chat Endpoint ---
@app.post("/chat")
async def chat(payload: ChatRequest):
    email = payload.email
    text = payload.text.strip()

    if not email or not text:
        raise HTTPException(status_code=400, detail="email and text required")

    # 🎭 Emotion Prediction
    emotion = predict_emotion(text)

    # 💡 Prompt for LLM
    prompt = (
        f"You are a compassionate relationship mediator. The user (email={email}) said: \"{text}\". "
        f"Detected emotion: {emotion}. Provide empathetic, concise, practical advice (exactly 3 bullet points), "
        "worded gently and actionably. End with a short journaling prompt for the user."
    )

    # 🧠 Get AI Response
    advice = get_ollama_response(prompt)

    # ☁️ Save Session
    save_session(email, text, emotion, advice)

    return {"emotion": emotion, "advice": advice}


# --- 🕓 Fetch Chat History ---
@app.get("/history/{email}")
async def history(email: str):
    if not email:
        raise HTTPException(status_code=400, detail="email required")
    return {"history": get_user_history(email)}


# --- 💞 Blend Relationship Insight ---
from pydantic import BaseModel

class BlendRequest(BaseModel):
    user1: str
    user2: str

@app.post("/blend")
async def blend_users(payload: BlendRequest):
    user1 = payload.user1
    user2 = payload.user2

    if not user1 or not user2:
        raise HTTPException(status_code=400, detail="Both users required")

    # Fetch each user's recent chat history
    history1 = get_user_history(user1)
    history2 = get_user_history(user2)

    # Extract last 5 messages each
    user1_msgs = [h.get("text", "") for h in history1[-5:]]
    user2_msgs = [h.get("text", "") for h in history2[-5:]]

    # Combine both contexts
    prompt = (
        f"You are a relationship counselor AI.\n\n"
        f"Partner A ({user1}) recent chats:\n{user1_msgs}\n\n"
        f"Partner B ({user2}) recent chats:\n{user2_msgs}\n\n"
        f"Analyze how they are each feeling, their emotional alignment, "
        f"and communication gaps. Provide 3 gentle, empathetic bullet-point insights "
        f"about their relationship and how they can better understand each other."
    )

    advice = get_ollama_response(prompt)

    return {"advice": advice}

