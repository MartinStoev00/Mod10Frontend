import { useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { sendScore } from "./utils";

//commands that can be sent to the car
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

// boolean value which does not allow for commands to be sent unless the camera has captured the map
let made = false;
// the time at which the car starts when the first command is given
let started = 0;

//the react component responsible for handling voice
const Command = ({ socket, finished, setFinished }) => {
  // a custom react hook use from "react-speech-recognition" which gets the transcript
  const { transcript } = useSpeechRecognition();

  // useEffect which fires when the component has rerendered
  useEffect(() => {
    // a socket listener for the beep command in order to reduce points
    socket.on("beep", (args) => {
      started = started - 100000;
      console.log("Line Crossed! Lose 100 points!");
      alert("Line Crossed! Lose 100 points!");
    });
    // a socket listener for the finish command in order to indicate that the car has finished and the score has been computed
    // also changes the state for the finished to cause the ScoreBoard component to rerender
    socket.on("finish", async (args) => {
      if (!finished) {
        const now = Date.now();
        const duration = Math.round(23 / Math.round((now - started) / 1000));
        console.log("Finished at:", now, "It took:", duration);
        await sendScore(duration);
        setFinished(true);
        alert("You finished! Your score is: " + duration);
      }
    });
    // cleanup function in order to not have stacked listeners
    return () => {
      socket.off("beep");
      socket.off("finish");
    };
  });
  // start listening again once the component has rerendered
  useEffect(() => {
    SpeechRecognition.startListening();
  });
  // keeps track of the words said between rerenders
  const fil = useRef("");
  // useEffect which egts executed whenever the transcript variable has changed
  useEffect(() => {
    // a variable which gets only the needed commands from a string
    // also replace "write" with "right" and "and" with "end" because the voice recognition is not always precise
    const filtered = transcript
      .split(" ")
      .filter((word) => commands.includes(word))
      .join(" ")
      .replace("write", "right")
      .replace("and", "end");
    //execute if a command is found
    if (filtered.length > 0) {
      console.log(filtered);
      // set the variable in order to be displayed on screen
      fil.current = filtered;
      // end whenever "end" is said
      if (filtered.includes("end")) {
        socket.emit("message", { time: Date.now(), text: filtered });
      } else if (filtered.includes("make")) {
        // send "setup" when make is said and allow for other commands to be said
        socket.emit("setup", "setup");
        made = true;
      } else if (filtered.includes("go")) {
        // send "go" in order for the car to go to the target by itself
        socket.emit("go", "go");
      } else if (made) {
        if (started === 0) {
          // start following the score when the first command is said
          // also send the "manual" command in order for the camera to start keeping track
          started = Date.now();
          console.log(started);
          socket.emit("manual", "manual");
        }
        // send command said to the car in order for it to momve/turn
        socket.emit("message", { time: Date.now(), text: filtered });
      }
    }
  }, [transcript, socket]);
  // frontend component
  return <div className="transcript">{fil.current}</div>;
};
export default Command;
