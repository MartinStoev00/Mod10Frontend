import { useAudioRecorder } from "@sarafhbk/react-audio-recorder";
import sendFile from "./utils";
import { useState } from "react";

const Audio = ({ username }) => {
  const { audioResult, startRecording, stopRecording, status } =
    useAudioRecorder();

  const [loading, setLoading] = useState(false);

  const auth = async (audioResult, enpoint, username) => {
    setLoading(true);
    const ans = await sendFile(audioResult, enpoint, username);
    setLoading(false);
    if (ans.error) {
      alert(ans.error);
    } else {
      localStorage.setItem("userID", ans.res);
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
            <img src="/microphone-alt-solid.svg" alt="start" />
          </button>
        ) : (
          <button className="audio-button" onClick={stopRecording}>
            <img src="/pause-solid.svg" alt="pause" />
          </button>
        )}
      </div>
      {audioResult && (
        <div>
          <audio controls src={audioResult} />
          {loading && (
            <div style={{ margin: "0 calc(50% - 30px)" }}>
              <img
                style={{ width: "60px" }}
                src="/Youtube_loading_symbol_1_(wobbly).gif"
                alt="loading"
              />
            </div>
          )}
          {!loading && (
            <div className="auth-div">
              <button
                className="auth-button"
                onClick={() => auth(audioResult, "signup", username)}
              >
                Sign Up
              </button>
              <button
                className="auth-button"
                onClick={() => auth(audioResult, "login", username)}
              >
                Log In
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Audio;
