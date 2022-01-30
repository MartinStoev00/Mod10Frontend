import { useState } from "react";
import Audio from "./audio";
import "./styles.css";

function App() {
  const [username, setUsername] = useState("");

  return (
    <main>
      <h1>Welcome To Maze Solver!</h1>
      <div>
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
        />
      </div>
      <h2>
        {username === ""
          ? `To proceed, please enter your username above`
          : `To proceed, click the button below your voice while saying:
        "My name is __" and your name`}
      </h2>
      <Audio username={username} />
    </main>
  );
}

export default App;
