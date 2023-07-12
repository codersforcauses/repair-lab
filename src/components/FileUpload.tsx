import React, { useState } from "react";

import SendToBucket from "@/pages/api/connect-aws";

export default function FileUpload() {

  const [message, SendMessage] = useState();
  const [file, SetFile] = useState();
  

  function SetFile(e) {
    console.log("StoreFile");
    StoreFile(e.target.files[0]);
  }

  const submitImage = (e) => {
    e.preventDefault();
    console.log("Image uploading, submit button clicked!");
  
    SendToBucket(file)
      .then(() => {
        SetFile(null);
        console.log("Image uploaded successfully!");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };
  

  return (
    <form onSubmit={submitImage}>
      <input type="file" name="picture" required/>
      <button>Submit</button>
    </form>
  );
}
