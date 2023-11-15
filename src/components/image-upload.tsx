import React, { useState } from "react";
import axios from "axios";

const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const fileList = Array.from(selectedFiles);
      setFiles(fileList);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log("Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Files</button>
    </div>
  );
};

export default UploadPage;
