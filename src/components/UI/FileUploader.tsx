import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";

// const FileUploader = () => {
//   const [selectFile, setSelectFile]: any = useState(null);

//   const onUpload = (e: any) => {
//     setSelectFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     try {
//       // AWS SDK 초기화
//       AWS.config.update({
//         accessKeyId: "AKIA4WQLMJXFZI2K7J2F",
//         secretAccessKey: "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",
//         region: "ap-northeast-2",
//       });

//       const s3 = new AWS.S3();
//       const bucketName = "13team";
//       const uploadParams = {
//         Bucket: "13team",
//         Key: `community/${selectFile.name}`,
//         Body: selectFile,
//       };

//       // 파일 업로드 요청
//       const response = await s3.upload(uploadParams).promise();
//       console.log("File uploaded successfully:", response.Location);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={onUpload} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default FileUploader;

AWS.config.update({
  accessKeyId: "AKIA4WQLMJXFZI2K7J2F",
  secretAccessKey: "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",
  region: "ap-northeast-2",
});

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const s3 = new AWS.S3();
      const bucketName = "13team";
      const uploadParams = {
        Bucket: bucketName,
        Key: `13team/community/${selectedFile.name}`,
        Body: selectedFile,
      };

      try {
        await s3.putObject(uploadParams).promise();
        console.log("File uploaded successfully");
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploader;

// const downloadFileFromS3 = async (fileName: string) => {
//   const s3 = new AWS.S3();
//   const bucketName = "13team";
//   const downloadParams = {
//     Bucket: bucketName,
//     Key: fileName,
//   };

//   try {
//     const response = await s3.getObject(downloadParams).promise();
//     // response.Body에 다운로드한 파일 데이터가 포함됩니다.
//     console.log("File downloaded successfully:", response);
//   } catch (error) {
//     console.error("Error downloading file:", error);
//   }
// };
