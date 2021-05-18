import React, { useState } from "react";
import "../styles/Uploader.css";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const Uploader = () => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileInputChange = (info) => {
    const reader = new FileReader();
    const file = info.file.originFileObj;
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="uploader">
      <Dragger
        name="file"
        multiple={false}
        onChange={handleFileInputChange}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        // previewFile={previewFile}
        style={{ width: "600px" }}
        className="dragger"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
      {previewSource && (
        <img alt="chosen" src={previewSource} style={{ height: "300px" }} />
      )}
    </div>
    // <div>
  );
};

export default Uploader;
