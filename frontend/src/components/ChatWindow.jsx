// frontend/src/components/ChatWindow.jsx
import React, { useEffect, useRef, useState } from "react";
import { sendChat } from "../utils/api";

export default function ChatWindow({ email, selectedSession }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const chatRef = useRef();

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  // 🆕 Handle session switching
  useEffect(() => {
    if (selectedSession) {
      // Load existing session
      setMessages([
        { from: "user", text: selectedSession.text },
        { from: "ai", text: selectedSession.advice || "(no advice yet)" },
      ]);
    } else {
      // 🆕 If "New Session" clicked — start fresh
      setMessages([]);
      setText("");
    }
  }, [selectedSession]);

  // ✉️ Handle send
  const submit = async () => {
    if (!text.trim()) return;
    const userText = text.trim();
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setText("");

    try {
      const res = await sendChat(email, userText);
      setMessages((prev) => [
        ...prev,
        { from: "ai", text: res.advice, meta: { emotion: res.emotion } },
      ]);
    } catch (e) {
      setMessages((prev) => [...prev, { from: "ai", text: "(server error)" }]);
    }
  };

  // 🎙️ Voice input
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("SpeechRecognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join("");
      setText(transcript);
    };
    recognition.onerror = (e) => console.log("speech error", e);
    recognition.start();
  };

  return (
    <div
      className="chat-window relative p-4 rounded-xl overflow-hidden"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "90vh",
        background: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      {/* 💬 Chat messages */}
      <div
        ref={chatRef}
        className="chat-box"
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          background: "var(--bg-color)",
        }}
      >
        {messages.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "var(--muted)",
              marginTop: "40px",
              fontStyle: "italic",
            }}
          >
            ✨ Start a new conversation...
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className="message mb-4"
              style={{
                display: "flex",
                justifyContent: m.from === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                className={m.from === "user" ? "user-bubble" : "ai-bubble"}
                style={{
                  whiteSpace: "pre-line",
                  background:
                    m.from === "user"
                      ? "var(--chat-user-bg)"
                      : "var(--chat-ai-bg)",
                  color:
                    m.from === "user"
                      ? "var(--chat-user-text)"
                      : "var(--chat-ai-text)",
                }}
              >
                {m.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ✉️ Input controls */}
      <div
        className="controls"
        style={{
          position: "fixed",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "50%",
          background: "var(--bg-color)",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          borderTop: "1px solid rgba(0,0,0,0.1)",
          boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
          zIndex: 100,
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message or use mic"
          style={{
            flex: 1,
            padding: "12px 20px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.2)",
            background: "var(--input-bg)",
            color: "var(--chat-user-text)",
            fontSize: 14,
            outline: "none",
          }}
        />
        <button
          onClick={submit}
          style={{
            padding: "10px 18px",
            borderRadius: 12,
            background: "linear-gradient(90deg, #7b5cf1, #a073ff)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: 500,
            transition: "0.2s",
          }}
        >
          Send
        </button>
        <button
          onClick={startListening}
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            background: "transparent",
            border: "1px solid var(--text-color)",
            color: "var(--text-color)",
            cursor: "pointer",
          }}
        >
          🎙️
        </button>
      </div>
    </div>
  );
}
