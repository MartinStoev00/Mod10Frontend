import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io("http://192.168.137.83:5000");
const commands = ["left", "right", "write", "back", "start", "stop", "bad"];
const sendScore = (scoreNum) => {
  fetch(`http://localhost:5000/score`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: localStorage.getItem("userID"),
      score: scoreNum,
    }),
  });
};

socket.on("calc", (args) => {
  console.log(args);
  // sendScore(args)
});

for (let v = 10; v <= 180; v++) {
  commands.push("" + v);
}

const Command = () => {
  const { transcript } = useSpeechRecognition();

  useEffect(() => {
    SpeechRecognition.startListening();
  });
  useEffect(() => {
    const filtered = transcript
      .split(" ")
      .filter((word) => commands.includes(word))
      .join(" ");
    if (filtered.length > 0) {
      console.log(filtered);
      socket.emit("message", { time: Date.now(), text: filtered });
    }
  }, [transcript]);

  return <div className="transcript">{transcript}</div>;
};
export default Command;