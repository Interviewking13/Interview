import React, { useEffect, useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: "AKIA4WQLMJXFZI2K7J2F",
  secretAccessKey: "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",
  region: "ap-northeast-2",
});

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFindButtonClick = async () => {
    const inputFile = document.getElementById("input-file");
    if (inputFile) {
      inputFile.click();
    }
  };

  const handleFileChange = async (event: any) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const timecodeForUpload = Math.floor(Date.now() / 1000); //파일명이 같은 파일을 위한 시간코드.
      const key = `community/${timecodeForUpload}_${selectedFile.name}`;

      const s3 = new AWS.S3();
      const bucketName = "13team";
      const uploadParams = {
        Bucket: bucketName,
        Key: key,
        Body: selectedFile,
      };

      try {
        await s3.putObject(uploadParams).promise();
        console.log("File uploaded successfully:", key);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  return (
    <>
      {/* <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button> */}
      <Grid item xs={8}>
        <StyledTextField
          variant="outlined"
          placeholder="파일을 선택하세요"
          InputProps={{
            readOnly: true,
          }}
          onClick={handleFindButtonClick}
          fullWidth
        />
      </Grid>
      <Grid item xs={2} container justifyContent="flex-end">
        <label htmlFor="input-file">
          <input
            type="file"
            onChange={handleFileChange}
            id="input-file"
            style={{ display: "none" }}
          />
          <StyledFindButton onClick={handleFindButtonClick} variant="contained">
            파일찾기
          </StyledFindButton>
        </label>
      </Grid>
    </>
  );
};

export default FileUploader;

//텍스트필드 스타일지정
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "45px",
    borderRadius: "10px",
    border: "1px #00057D solid",
  },
}));

//버튼 스타일
const StyledFindButton = styled(Button)`
  && {
    border-radius: 10px;
    width: 132px;
    height: 45px;
    padding: auto;
    ${fonts.SubText}
    background-color: ${colors.dark_navy};
    color: ${colors.back_navy};
    &:hover {
      background-color: ${colors.back_navy};
      color: ${colors.dark_navy};
    }
  }
`;
