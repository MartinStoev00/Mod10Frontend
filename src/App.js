import { useState, useEffect } from "react";
import Audio from "./Audio";
import "./styles.css";
import { useNavigate } from "react-router-dom";

function App() {
  // username which is displayed and changed whenever the user types
  const [username, setUsername] = useState("");
  let navigate = useNavigate();
  // if a user has logged in, redirect to the main page
  useEffect(() => {
    if (localStorage.getItem("userID")) {
      navigate(`/voice`);
    }
  });

  return (
    <main>
      <h1>Welcome To Maze Solver!</h1>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value.replace(/\s/g, ""));
          }}
          name="username"
        />
      </div>
      <h2>
        {/* allow for the user to continue when they ae typed their name */}
        {username === ""
          ? `To proceed, please enter your username above`
          : `To proceed, click the button below and say:
        "My name is ${username}"`}
      </h2>
      <Audio username={username} />
    </main>
  );
}

export default App;
