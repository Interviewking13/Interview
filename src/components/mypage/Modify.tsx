import React, { useState } from "react";
import { useQuery } from "react-query";
import { getUserData } from "../../api/api-user";
import { Button, Typography, TextField, Grid, Box } from "@mui/material";
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
              <StyledFileDownButton onClick={handleDownload}>
                {uploadedFile}
              </StyledFileDownButton>
            </Grid>
            <Grid item xs={2}>
              <Grid container justifyContent="flex-end">
                <StyledFileDeleteButton onClick={handleDelete}>
                  삭제
                </StyledFileDeleteButton>{" "}
              </Grid>
            </Grid>
            <Grid item xs={2}></Grid>
          </>
        )}
      </Grid>
    </>
  );
};

const Modify = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  const token =
    localStorage.getItem("token") || ""; /**회원정보조회를 위한 토큰 가져오기*/
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery(["userData"], () => getUserData(token as string)); //useQuery로 getdata
  if (isLoading) {
    // 로딩 상태를 표시
    return <div>Loading...</div>;
  }
  if (isError) {
    // 에러 상태를 표시
    return <div>Error occurred while fetching token</div>;
  }
  // token 값을 활용하여 필요한 작업을 수행
  console.log("UserData", userData);
  const { user_name, phone_number, email, file_key, file_name } =
    userData?.data || {};

  //유저 데이터 정보.
  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid item>
          <StyledTitle variant="h5">내 정보수정</StyledTitle>
        </Grid>
        <Grid item>
          <StyledSubTitle variant="subtitle1">
            나의 회원정보를 수정합니다.
          </StyledSubTitle>
        </Grid>
      </Grid>
      {/**  페이지내용 */}
      <form onSubmit={handleSubmit}>
        <Grid
          container
          rowSpacing={2}
          alignItems="center"
          sx={{ marginTop: "7px" }}
        >
          <Grid item xs={2}>
            <StyledInfoName>이름</StyledInfoName>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField
              variant="outlined"
              defaultValue={user_name}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <StyledInfoName>연락처</StyledInfoName>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField
              variant="outlined"
              defaultValue={phone_number}
              // onChange={(e) =>
              //   setCustomUserData((prevData) => ({
              //     ...prevData,
              //     userPhoneNumber: e.target.value,
              //   }))
              // }
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <StyledInfoName>아이디</StyledInfoName>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField
              variant="outlined"
              defaultValue={email}
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <StyledInfoName>비밀번호</StyledInfoName>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField
              variant="outlined"
              // onChange={(e) =>
              //   setCustomUserData((prevData) => ({
              //     ...prevData,
              //     userPassword: e.target.value,
              //   }))
              // }
              type="password"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <StyledInfoName>비밀번호확인</StyledInfoName>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField variant="outlined" type="password" fullWidth />
          </Grid>
          <Grid item xs={12}></Grid>
          <Grid container>
            <Grid item xs={2}>
              <StyledInfoName>자기소개서첨부</StyledInfoName>
            </Grid>
            <FileUploader />
          </Grid>

          {/* 버튼1, 버튼2 */}
          <Grid
            container
            spacing={1}
            sx={{ marginTop: "7px" }}
            justifyContent="flex-end"
          >
            <Grid item>
              <StyledDeleteButton variant="contained" sx={{ gap: "5px" }}>
                회원탈퇴
              </StyledDeleteButton>
            </Grid>
            <Grid item>
              <StyledModifyButton variant="contained">
                수정하기
              </StyledModifyButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </StyledContainer>
  );
};
export default Modify;

const StyledContainer = styled(Box)`
  && {
    width: 66.1%;
    max-width: 1270px;
    margin-left: 325px;
    padding-left: 0;
  }
`;
// 내정보수정 타이틀 스타일
const StyledTitle = styled(Typography)`
  && {
    ${fonts.TitleText}
    color:${colors.main_mint}
  }
`;
// 내정보를 수정하세요 서브타이틀 스타일
const StyledSubTitle = styled(Typography)`
  && {
    ${fonts.SubTextThin}
    color: ${colors.darkgray_navy};
  }
`;
//각정보타이틀 스타일지정
const StyledInfoName = styled(Typography)`
  && {
    ${fonts.SubTextBig}
    color:${colors.main_black}
  }
`;
//텍스트필드 스타일지정
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "45px",
    borderRadius: "10px",
    border: "1px #00057D solid",
  },
}));

//버튼 스타일

const StyledModifyButton = styled(Button)`
  && {
    border-radius: 10px;
    width: 132px;
    height: 45px;
    ${fonts.SubText}
    padding: auto;
    background-color: ${colors.main_mint};
    color: ${colors.main_navy};
    &:hover {
      background-color: ${colors.main_navy};
      color: ${colors.main_mint};
    }
  }
`;
const StyledDeleteButton = styled(Button)`
  && {
    border-radius: 10px;
    width: 132px;
    height: 45px;
    ${fonts.SubText}
    padding: auto;
    background-color: ${colors.main_red};
    color: ${colors.back_navy};
    &:hover {
      background-color: ${colors.back_navy};
      color: ${colors.main_red};
    }
  }
`;
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

const StyledFileDeleteButton = styled(Button)`
  && {
    color: ${colors.main_red};
    ${fonts.SubTextThinSmall}
    cursor: pointer;
  }
`;

const StyledFileDownButton = styled(Button)`
  && {
    color: ${colors.darkgray_navy};
    ${fonts.SubTextSmall}
    cursor: pointer;
  }
`;
