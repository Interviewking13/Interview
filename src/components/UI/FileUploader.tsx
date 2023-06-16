import React, { useEffect, useState } from "react";
import { Button, TextField, Grid, Typography } from "@mui/material";
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
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploadedKey, setUploadedKey] = useState<string | null>(null);

  const handleFindButtonClick = async () => {
    const inputFile = document.getElementById("input-file");
    if (inputFile) {
      inputFile.click();
    }
  };

  const handleFileChange = async (event: any) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const timecodeForUpload = Date.now(); //파일명이 같은 파일을 위한 시간코드.
      const key = `community/${timecodeForUpload}_${selectedFile.name}`;
      const fileName = selectedFile.name;

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
        setUploadedFile(fileName);
        setUploadedKey(key);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };
  const handleDownload = () => {
    if (uploadedFile) {
      const s3 = new AWS.S3();
      const bucketName = "13team";

      const params = {
        Bucket: bucketName,
        Key: uploadedKey,
      };

      s3.getSignedUrl("getObject", params, (err, url) => {
        if (err) {
          console.error("Error generating download URL:", err);
          return;
        }
        console.log("Download URL:", url);
        // 생성된 다운로드 URL을 사용하거나, 이를 표시할 다이얼로그 또는 링크로 전달하여 사용자에게 제공합니다.
        window.open(url, "_blank");
      });
    }
  };

  const handleDelete = () => {
    setUploadedFile(null);

    // Reset the file input element value to enable re-uploading the same file
    const inputFile = document.getElementById("input-file") as HTMLInputElement;
    if (inputFile) {
      inputFile.value = "";
    }
  };
  return (
    <>
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
      <Grid container>
        {uploadedFile && (
          <>
            <Grid item xs={2}></Grid>
            <Grid item xs={6}>
              <StyledFileButton onClick={handleDownload}>
                {uploadedFile}
              </StyledFileButton>
            </Grid>
            <Grid item xs={2}>
              <Grid container justifyContent="flex-end">
                <StyledDeleteButton onClick={handleDelete}>
                  삭제
                </StyledDeleteButton>{" "}
              </Grid>
            </Grid>
            <Grid item xs={2}></Grid>
          </>
        )}
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

const StyledDeleteButton = styled(Button)`
  && {
    color: ${colors.main_red};
    ${fonts.SubTextThinSmall}
    cursor: pointer;
  }
`;

const StyledFileButton = styled(Button)`
  && {
    color: ${colors.darkgray_navy};
    ${fonts.SubTextSmall}
    cursor: pointer;
  }
`;
