import { useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
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
  "make",
];
for (let v = 10; v <= 180; v++) {
  commands.push("" + v);
}

let made = false;
let started = 0;

const Command = ({ socket, finished, setFinished }) => {
  const { transcript } = useSpeechRecognition();

  useEffect(() => {
    socket.on("beep", (args) => {
      started = started - 100000;
      console.log("Line Crossed! Lose 100 points!");
      alert("Line Crossed! Lose 100 points!");
    });
    socket.on("finish", async (args) => {
      if (!finished) {
        const now = Date.now();
        const duration = Math.round((now - started) / 1000);
        console.log("Finished at:", now, "It took:", duration);
        await sendScore(duration);
        setFinished(true);
        alert("You finished! Your score is: " + duration);
      }
    });
    return () => {
      socket.off("beep");
      socket.off("finish");
    };
  });

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
      console.log(filtered);
      fil.current = filtered;
      if (filtered.includes("end")) {
        socket.emit("message", { time: Date.now(), text: filtered });
      } else if (filtered.includes("make")) {
        socket.emit("setup", "setup");
        made = true;
      } else if (filtered.includes("go")) {
        socket.emit("go", "go");
      } else if (made) {
        if (started === 0) {
          started = Date.now();
          console.log(started);
          socket.emit("manual", "manual");
        }
        socket.emit("message", { time: Date.now(), text: filtered });
      }
    }
  }, [transcript, socket]);

  return <div className="transcript">{fil.current}</div>;
};
export default Command;
