import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { getHistory } from "../utils/api";

export default function Sidebar({ user, onLogout, onBlend, onSelectSession, selectedSession }) {
  const [history, setHistory] = useState([]);
  const [showBlendModal, setShowBlendModal] = useState(false);
  const [partnerEmail, setPartnerEmail] = useState("");

  useEffect(() => {
    if (user?.email) {
      getHistory(user.email)
        .then((res) => setHistory(res.history || []))
        .catch(() => {});
    }
  }, [user]);

  const signout = async () => {
    try {
      await signOut(getAuth());
    } catch {}
    onLogout();
  };

  const handleBlendConfirm = () => {
    if (!partnerEmail.trim()) return;
    onBlend(partnerEmail.trim());
    setShowBlendModal(false);
    setPartnerEmail("");
  };

  return (
    <div
      className="sidebar"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "96vh",
        padding: "20px",
        background: "var(--sidebar-bg)",
        color: "var(--text-color)",
      }}
    >
      {/* --- Top Section --- */}
      <div style={{ overflowY: "auto", flexGrow: 1 }}>
        <div className="logo">Harmony AI</div>
        <p
          style={{
            fontWeight: "600",
            color: "var(--text-color)",
            wordBreak: "break-word",
            marginBottom: 20,
          }}
        >
          {user.email}
        </p>

        {/* 🆕 New Session Button */}
        <button
          className="btn primary"
          onClick={() => onSelectSession(null)}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "8px",
            fontWeight: "500",
            marginBottom: "15px",
          }}
        >
          New Session
        </button>

        <h3 style={{ color: "var(--text-color)", marginBottom: 10 }}>
          Recent sessions
        </h3>

        <div
          className="sessions"
          style={{
            overflowY: "auto",
            maxHeight: "60vh",
            paddingRight: 5,
          }}
        >
          {history.length > 0 ? (
            history.map((s) => (
              <div
                key={s.id}
                className="session-item"
                onClick={() => onSelectSession(s)}
                style={{
                  background:
                    selectedSession?.id === s.id
                      ? "var(--chat-ai-bg)"
                      : "var(--chat-user-bg)",
                  color:
                    selectedSession?.id === s.id
                      ? "var(--chat-ai-text)"
                      : "var(--chat-user-text)",
                  padding: 20,
                  borderRadius: 10,
                  marginBottom: 10,
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <strong>{s.emotion}</strong>
                <p style={{ fontSize: 13, margin: "4px 0 0 0" }}>{s.text}</p>
              </div>
            ))
          ) : (
            <p style={{ color: "var(--muted)", fontSize: 13 }}>
              No previous sessions yet.
            </p>
          )}
        </div>
      </div>

      {/* --- Bottom Section --- */}
      <div
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          gap: 13,
        }}
      >
        <button
          className="btn"
          onClick={() => setShowBlendModal(true)}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "8px",
            fontWeight: "500",
          }}
        >
          💞 Blend (Search Partner)
        </button>

        <button
          className="btn ghost"
          onClick={signout}
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: "8px",
            fontWeight: "500",
          }}
        >
          Logout
        </button>
      </div>

      {/* --- Blend Modal --- */}
      {showBlendModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              background: "var(--bg-color)",
              color: "var(--text-color)",
              padding: "24px",
              borderRadius: "12px",
              width: "320px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
            }}
          >
            <h3 style={{ marginBottom: 12, textAlign: "center" }}>
              🔍 Connect Partner
            </h3>
            <input
              type="email"
              value={partnerEmail}
              onChange={(e) => setPartnerEmail(e.target.value)}
              placeholder="Enter partner’s email"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid rgba(0,0,0,0.2)",
                marginBottom: "12px",
                background: "var(--chat-user-bg)",
                color: "var(--chat-user-text)",
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => setShowBlendModal(false)}
                className="btn ghost"
                style={{ flex: 1, marginRight: 8 }}
              >
                Cancel
              </button>
              <button
                onClick={handleBlendConfirm}
                className="btn primary"
                style={{ flex: 1 }}
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
