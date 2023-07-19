import React, { useState } from "react";
import axios from "axios";

const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("file(s) changed!");
    const selectedFiles = event.target.files;
    console.log("Selected Files:", selectedFiles);
    if (selectedFiles) {
      const fileList = Array.from(selectedFiles);
      setFiles(fileList);
    }
  };

  const handleUpload = async () => {
    try {
      console.log("Handling upload!");
      const formData = new FormData();

      files.forEach((file, index) => {
        formData.append("files", file);
        console.log(
          `File ${index + 1}:`,
          file.name,
          file.type,
          file.size,
          file.lastModified
        );
      });

      await axios.post("/api/upload-aws", formData, {
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
      <button type="button" onClick={handleUpload}>
        Upload Files
      </button>
    </div>
  );
};

export default UploadPage;
