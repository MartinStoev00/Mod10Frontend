import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Command from "./Command";
import ScoreBoard from "./ScoreBoard";

export default function Voice() {
  let navigate = useNavigate();
  useEffect(() => {
    if (!!!localStorage.getItem("userID")) {
      navigate(`/`);
    }
  });

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
      <Command />
      <ScoreBoard />
    </main>
  );
}
