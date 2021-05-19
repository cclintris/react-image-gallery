import React, { useState } from "react";
import "../styles/Uploader.css";
import { Upload, Image, Button } from "antd";
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
    <div className="box">
      <div className="central">
        <Dragger
          name="file"
          multiple={false}
          onChange={handleFileInputChange}
          style={{
            width: "500px",
            marginTop: "20px",
          }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      </div>
      <div className="central">
        <Image.PreviewGroup>
          {previewSource && (
            <Image
              style={{ marginTop: "20px", marginBottom: "20px" }}
              src={previewSource}
              width={`35vw`}
            />
          )}
        </Image.PreviewGroup>
      </div>
      <div className="central">
        <Button
          type="primary"
          style={{ marginTop: "10px" }}
          onClick={handleSubmitFile}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Uploader;
