// frontend/src/App.jsx
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { blendAccounts } from "./utils/api"; // ✅ import this
import "./styles.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("light");
  const [selectedSession, setSelectedSession] = useState(null);
  const [blendResult, setBlendResult] = useState(null);
  const [isBlending, setIsBlending] = useState(false); // 🆕 loader state

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  if (!user) return <LoginForm onLogin={setUser} />;
  
  const handleBlend = async (partnerEmail) => {
    try {
      setIsBlending(true);
      setBlendResult(null);
      const result = await blendAccounts(user.email, partnerEmail);
      setBlendResult(result);
    } catch (error) {
      console.error("Blend failed:", error);
      setBlendResult({ advice: "(blend failed — please retry later)" });
    } finally {
      setIsBlending(false);
    }
  };
  

  return (
    <div className={`app-root ${theme}`}>
      {/* 🌗 Theme Toggle */}
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
        </button>
      </div>

      {/* 💬 Main Layout */}
      <div className="layout">
        <Sidebar
          user={user}
          onLogout={() => setUser(null)}
          onSelectSession={setSelectedSession}
          selectedSession={selectedSession}
          onBlend={handleBlend} // ✅ connected
        />

        <div className="flex-1" style={{ flex: 1, padding: "20px" }}>
          <ChatWindow email={user.email} selectedSession={selectedSession} isBlending={isBlending} />

          {/* 💞 Blend results */}
          {isBlending && (
            <div className="mt-6 p-4 bg-purple-50 rounded-lg text-center text-purple-600 font-medium">
              Analyzing both partners' emotional patterns... 💭
            </div>
          )}

          {/* 💞 Relationship Insight Popup */}
                {blendResult && (
                <div
                    style={{
                    position: "fixed",
                    inset: 0,
                    background: "rgba(0,0,0,0.6)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 1000,
                    backdropFilter: "blur(4px)",
                    }}
                >
                    <div
                    style={{
                        background: "var(--bg-color)",
                        color: "var(--text-color)",
                        width: "600px",
                        maxWidth: "90%",
                        padding: "24px",
                        borderRadius: "16px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                        overflowY: "auto",
                        maxHeight: "80vh",
                    }}
                    >
                    <h3
                        style={{
                        fontWeight: "700",
                        fontSize: "1.2rem",
                        color: "var(--chat-ai-bg)",
                        marginBottom: "12px",
                        }}
                    >
                        💞 Relationship Insight
                    </h3>

                    <div
                        style={{
                        whiteSpace: "pre-line",
                        lineHeight: "1.6",
                        fontSize: "0.95rem",
                        }}
                        dangerouslySetInnerHTML={{
                        __html: blendResult.advice
                            .replace(/\n/g, "<br/>")                // newlines
                            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // bold markdown
                            .replace(/(\d+\.\s)/g, "<br/><br/><b>$1</b>"), // bullet separation
                        }}
                    />

                    <div style={{ textAlign: "right", marginTop: "20px" }}>
                        <button
                        className="btn ghost"
                        onClick={() => setBlendResult(null)}
                        style={{
                            padding: "8px 16px",
                            borderRadius: "8px",
                            fontWeight: "500",
                        }}
                        >
                        Close
                        </button>
                    </div>
                    </div>
                </div>
                )}

        </div>
      </div>
    </div>
  );
}
