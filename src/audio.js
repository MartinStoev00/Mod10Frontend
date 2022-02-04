import { useAudioRecorder } from "@sarafhbk/react-audio-recorder";
import sendFile from "./utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Audio = ({ username }) => {
  // deconstruct the react custom hook from "@sarafhbk/react-audio-recorder" to read the sound recorded
  // and also get a start/stop recording function
  const { audioResult, startRecording, stopRecording, status } =
    useAudioRecorder();
  let navigate = useNavigate();

  // set loading to true whenever the user submits the form and waits for a result
  const [loading, setLoading] = useState(false);

  // a function which either sends a request to signup/login
  // if successful navigate to the main page
  const auth = async (audioResult, enpoint, username) => {
    setLoading(true);
    const ans = await sendFile(audioResult, enpoint, username);
    setLoading(false);
    if (ans.error) {
      alert(ans.error);
    } else {
      localStorage.setItem("userID", ans.res);
      navigate(`/voice`);
    }
  };

  return (
    <>
      <div>
        {/* allow for "start" to show when not recording and "stop" while recording*/}
        {status !== "recording" ? (
          <button
            className="audio-button"
            onClick={startRecording}
            disabled={username === ""}
          >
            Start
          </button>
        ) : (
          <button className="audio-button" onClick={stopRecording}>
            Stop
          </button>
        )}
      </div>
      <div>
        <audio controls src={audioResult} />
        {loading && (
          <div
            style={{
              textAlign: "center",
              fontWeight: "600",
              color: "white",
              fontFamily: "arial",
              fontSize: "20px",
            }}
          >
            Loading...
          </div>
        )}
        {/* buttons which send a request when signup/login */}
        {/* disabled if no recording provided */}
        {!loading && (
          <div className="auth-div">
            <button
              className="auth-button"
              onClick={() => auth(audioResult, "signup", username)}
              disabled={!!!audioResult}
            >
              Sign Up
            </button>
            <button
              className="auth-button"
              onClick={() => auth(audioResult, "login", username)}
              disabled={!!!audioResult}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Audio;
