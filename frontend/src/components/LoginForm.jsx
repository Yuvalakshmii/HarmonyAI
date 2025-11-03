// frontend/src/components/LoginForm.jsx
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import "../firebase";
const auth = getAuth();

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      let userCred;
      if (mode === "login") {
        userCred = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCred = await createUserWithEmailAndPassword(auth, email, password);
      }
      onLogin({ email: userCred.user.email });
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
      <form onSubmit={submit} style={{width:360, padding:24, borderRadius:12, boxShadow:"0 6px 30px rgba(0,0,0,0.05)"}}>
        <div style={{fontSize:20, color:"#7B61FF", fontWeight:700, marginBottom:8}}>Harmony AI</div>
        <p style={{color:"#333"}}>{mode === "login" ? "Sign in" : "Create account"}</p>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={{width:"100%",padding:10,marginBottom:8}} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required style={{width:"100%",padding:10,marginBottom:12}} />
        <button className="btn" style={{width:"100%"}} type="submit">{mode === "login" ? "Login" : "Sign up"}</button>
        <div style={{textAlign:"center", marginTop:10}}>
          <button type="button" className="btn ghost" onClick={() => setMode(mode === "login" ? "signup" : "login")}>
            {mode === "login" ? "Create account" : "Have an account? Login"}
          </button>
        </div>
        {err && <div style={{color:"red", marginTop:10}}>{err}</div>}
      </form>
    </div>
  );
}
