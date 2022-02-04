//convert blob (an audio file recorded and stored in the browser) to base64 data
const blobToBase64 = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

// sending a request with audio data to a given combination of a endpoint (sigup/login) and username and returns the data
const sendFile = async (aud, endpoint, username) => {
  try {
    let res = await fetch(aud).then((r) => r.blob());
    let b = await blobToBase64(res);

    const response = await fetch(
      `http://localhost:5000/${endpoint}/${username}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: b,
      }
    );
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export default sendFile;

// send a POST request to the backend to store the result
export const sendScore = (scoreNum) => {
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

// sends a GET request to the backend and returns the values of the scoreboard
export const getScore = async () => {
  try {
    const res = await fetch(`http://localhost:5000/score`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};
