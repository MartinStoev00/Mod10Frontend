import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Command from "./Command";
import ScoreBoard from "./ScoreBoard";
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

export default function Voice() {
  let navigate = useNavigate();
  const carIP = "http://192.168.137.83:5000";
  const [finished, setFinished] = useState(false);

  // connect to the car via socket, installed with a cdn
  const socket = io(carIP);
  // navigate to the main page if not user is logged in
  useEffect(() => {
    if (!!!localStorage.getItem("userID")) {
      navigate(`/`);
    }
  });

  return (
    <main>
      {/* display current user */}
      <h2>User Talking: {localStorage.getItem("userID")}</h2>
      {/* command component */}
      <Command socket={socket} finished={finished} setFinished={setFinished} />
      {/* scoreboard component */}
      <ScoreBoard finished={finished} />
      {/* logout user button and redirect to main page */}
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
