import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Command from "./Command";
import ScoreBoard from "./ScoreBoard";
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

export default function Voice() {
  let navigate = useNavigate();
  const socket = io("http://192.168.137.83:5000");
  useEffect(() => {
    if (!!!localStorage.getItem("userID")) {
      navigate(`/`);
    }
  });

  return (
    <main style={{ padding: "1rem 0" }}>
      <h2>User Talking: {localStorage.getItem("userID")}</h2>
      <Command socket={socket} />
      <ScoreBoard socket={socket} />
      <button
        onClick={() => {
          localStorage.removeItem("userID");
          navigate(`/`);
        }}
        className="auth-button"
      >
        Log Out
      </button>
    </main>
  );
}
