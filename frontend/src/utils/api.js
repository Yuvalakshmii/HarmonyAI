// frontend/src/utils/api.js
import axios from "axios";

const BACKEND_URL = import.meta.env.NEXT_PUBLIC_BACKEND_URL || import.meta.env.VITE_BACKEND_URL || import.meta.env.BACKEND_URL || "http://localhost:8000";

export async function sendChat(email, text) {
  const res = await axios.post(`${BACKEND_URL.replace(/\/$/,'')}/chat`, { email, text });
  return res.data;
}

export async function blendAccounts(user1, user2) {
    try {
      const res = await fetch("http://localhost:8000/blend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user1, user2 }),
      });
      return await res.json();
    } catch (err) {
      console.error("Error blending accounts:", err);
      throw err;
    }
  }
  

export async function getHistory(email) {
  const res = await axios.get(`${BACKEND_URL.replace(/\/$/,'')}/history/${encodeURIComponent(email)}`);
  return res.data;
}
