# backend/utils/ollama_api.py
import requests
import os

OLLAMA_URL = os.environ.get("OLLAMA_URL", "http://localhost:11434/api/generate")
DEFAULT_MODEL = os.environ.get("OLLAMA_MODEL", "phi3")

def get_ollama_response(prompt, model=DEFAULT_MODEL, max_tokens=400):
    try:
        payload = {
            "model": model,
            "prompt": prompt,
            "max_tokens": max_tokens,
            "stream": False
        }
        resp = requests.post(OLLAMA_URL, json=payload, timeout=120)
        if resp.status_code == 200:
            data = resp.json()
            # Ollama responses vary by model — try common fields
            if isinstance(data, dict):
                return data.get("response") or data.get("text") or str(data)
            return str(data)
        else:
            return f"(LLM error {resp.status_code})"
    except Exception as e:
        return f"(LLM connection failed: {e})"
