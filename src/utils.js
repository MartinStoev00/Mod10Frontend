const blobToBase64 = (blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

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
