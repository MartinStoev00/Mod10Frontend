import { useAudioRecorder } from "@sarafhbk/react-audio-recorder";
import sendFile from "./utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Audio = ({ username }) => {
  const { audioResult, startRecording, stopRecording, status } =
    useAudioRecorder();
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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
