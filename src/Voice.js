import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function Voice() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!!!localStorage.getItem("userID")) {
      navigate(`/`);
    }
  });

  const sendScore = async () => {
    const response = await fetch(`http://localhost:5000/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: localStorage.getItem("userID"),
        score: 123,
      }),
    });
  };

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>User Talking: {localStorage.getItem("userID")}</h2>
      <button
        onClick={() => {
          localStorage.removeItem("userID");
          navigate(`/`);
        }}
        className="auth-button"
      >
        Log Out
      </button>
      <button className="auth-button" onClick={sendScore}>
        Send
      </button>
    </main>
  );
}
