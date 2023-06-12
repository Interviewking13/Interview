import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";

const FileUploader = () => {
  const [selectFile, setSelectFile]: any = useState(null);

  const onUpload = (e: any) => {
    setSelectFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      // AWS SDK 초기화
      AWS.config.update({
        accessKeyId: "AKIA4WQLMJXFZI2K7J2F",
        secretAccessKey: "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",
        region: "ap-northeast-2",
      });

      const s3 = new AWS.S3();
      const bucketName = "13team";
      const uploadParams = {
        Bucket: "13team",
        Key: `community/${selectFile.name}`,
        Body: selectFile,
      };

      // 파일 업로드 요청
      const response = await s3.upload(uploadParams).promise();
      console.log("File uploaded successfully:", response.Location);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={onUpload} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploader;
