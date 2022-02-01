import { useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
import { sendScore } from "./utils";

const commands = [
  "left",
  "right",
  "write",
  "back",
  "start",
  "end",
  "and",
  "bad",
  "go",
];
for (let v = 10; v <= 180; v++) {
  commands.push("" + v);
}

let started = 0;

const socket = io("http://192.168.137.83:5000");
socket.on("finish", (args) => {
  const now = Date.now();
  const duration = Math.round((now - started) / 1000);
  console.log("Finished at:", now, "It took:", duration);
  alert(`Finished! You did it in ${duration} seconds`);
  sendScore(duration);
});

const Command = () => {
  const { transcript } = useSpeechRecognition();

  useEffect(() => {
    SpeechRecognition.startListening();
  });
  const fil = useRef("");
  useEffect(() => {
    const filtered = transcript
      .split(" ")
      .filter((word) => commands.includes(word))
      .join(" ")
      .replace("write", "right")
      .replace("and", "end");
    if (filtered.length > 0) {
      if (started === 0) {
        started = Date.now();
        console.log(started);
        socket.emit("manual", "hiiii");
      }
      console.log(filtered);
      fil.current = filtered;
      if (filtered.includes("go")) {
        socket.emit("go", "hiiii");
      } else {
        socket.emit("message", { time: Date.now(), text: filtered });
      }
    }
  }, [transcript]);

  return <div className="transcript">{fil.current}</div>;
};
export default Command;
