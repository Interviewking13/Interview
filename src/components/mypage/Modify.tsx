import React, { useState, ChangeEvent } from "react";
import { getUserData, putUserData } from "../../api/api-user";
import { Button, Typography, TextField } from "@mui/material";
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import axios from "axios";

const Modify = () => {
  // const token =
  //   localStorage.getItem("token") || ""; /**회원정보조회를 위한 토큰 가져오기*/

  // const {
  //   data: userData,
  //   isLoading,
  //   isError,
  // } = useQuery(["userData"], () => getUserData(token as string)); //useQuery로 getdata

  // // token 값을 활용하여 필요한 작업을 수행
  // console.log("UserData", userData);
  // const { user_name, phone_number, email, file_key, file_name } =
  //   userData?.data || {};

  // const [uploadedFile, setUploadedFile] = useState<string | null>(file_name);
  // const [uploadedKey, setUploadedKey] = useState<string | null>(file_key);
  // const [userPhoneNumber, setUserPhoneNumber] = useState<string | null>(
  //   phone_number
  // );
  // const [userPassword, setUserPassword] = useState<string | null>("");

  // const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
  //   setUserPhoneNumber(e.target.value);
  // };
  // const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
  //   setUserPassword(e.target.value);
  // };

  // const handleFindButtonClick = async () => {
  //   const inputFile = document.getElementById("input-file");
  //   if (inputFile) {
  //     inputFile.click();
  //   }
  // };
  // const handleFileChange = async (event: any) => {
  //   const selectedFile = event.target.files[0];

  //   if (selectedFile) {
  //     const timecodeForUpload = Date.now(); //파일명이 같은 파일을 위한 시간코드.
  //     const key = `community/${timecodeForUpload}_${selectedFile.name}`;
  //     const fileName = selectedFile.name;

  //     const s3 = new AWS.S3();
  //     const bucketName = "13team";
  //     const uploadParams = {
  //       Bucket: bucketName,
  //       Key: key,
  //       Body: selectedFile,
  //     };

  //     try {
  //       await s3.putObject(uploadParams).promise();
  //       console.log("File uploaded successfully:", key);
  //       setUploadedFile(fileName);
  //       setUploadedKey(key);
  //     } catch (error) {
  //       console.error("Error uploading file:", error);
  //     }
  //   }
  // };
  // const handleDownload = () => {
  //   if (uploadedFile) {
  //     const s3 = new AWS.S3();
  //     const bucketName = "13team";

  //     const params = {
  //       Bucket: bucketName,
  //       Key: uploadedKey,
  //     };

  //     s3.getSignedUrl("getObject", params, (err, url) => {
  //       if (err) {
  //         console.error("Error generating download URL:", err);
  //         return;
  //       }
  //       console.log("Download URL:", url);
  //       // 생성된 다운로드 URL을 사용하거나, 이를 표시할 다이얼로그 또는 링크로 전달하여 사용자에게 제공합니다.
  //       window.open(url, "_blank");
  //     });
  //   }
  // };

  // const handleDelete = () => {
  //   setUploadedFile(null);

  //   // Reset the file input element value to enable re-uploading the same file
  //   const inputFile = document.getElementById("input-file") as HTMLInputElement;
  //   if (inputFile) {
  //     inputFile.value = "";
  //   }
  // };

  // const handleSubmit = async (event: any) => {
  //   event.preventDefault();

  //   const updatedData = {
  //     file_key: uploadedKey,
  //     file_name: uploadedFile,
  //     phone_number: userPhoneNumber,
  //     password: userPassword,
  //     token: token,
  //   };
  //   try {
  //     // PUT 요청을 보내서 서버에 변경된 정보 전송
  //     await axios.put("http://34.22.79.51:5000/api/user/mypage", updatedData);

  //     // 성공적으로 정보를 업데이트한 경우, 필요한 후속 작업을 수행하거나 사용자에게 피드백을 제공할 수 있습니다.
  //   } catch (error) {
  //     // 오류가 발생한 경우, 오류 처리를 수행합니다.
  //     console.error("Error updating user data:", error);
  //   }
  // };

  // if (isLoading) {
  //   // 로딩 상태를 표시
  //   return <div>Loading...</div>;
  // }
  // if (isError) {
  //   // 에러 상태를 표시
  //   return <div>Error occurred while fetching token</div>;
  // }

  return (
    <StyledContainer>
      <StyledLowContent>
        <StyledTitle>내 정보 수정</StyledTitle>
        <StyledSubTitle variant="subtitle1">
          나의 회원 정보를 수정합니다.
        </StyledSubTitle>
      </StyledLowContent>
      {/**  페이지내용 */}
      <form>
        <StyledLowContent>
          <StyledInfoName>이름</StyledInfoName>

          <StyledTextField
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </StyledLowContent>
        <StyledLowContent>
          <StyledInfoName>연락처</StyledInfoName>

          <StyledTextField
            variant="outlined"
            defaultValue="01023445678"
            fullWidth
          />
        </StyledLowContent>
        <StyledLowContent>
          <StyledInfoName>아이디</StyledInfoName>

          <StyledTextField
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </StyledLowContent>
        <StyledLowContent>
          <StyledInfoName>비밀번호</StyledInfoName>
          <StyledTextField variant="outlined" type="password" fullWidth />
        </StyledLowContent>
        <StyledLowContent>
          <StyledInfoName>비밀번호확인</StyledInfoName>

          <StyledTextField variant="outlined" type="password" fullWidth />
        </StyledLowContent>

        <StyledLowContent>
          <StyledInfoName>자기소개서첨부</StyledInfoName>

          <StyledFileFindTextField
            variant="outlined"
            placeholder="파일을 선택하세요"
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <label htmlFor="input-file">
            <input type="file" id="input-file" style={{ display: "none" }} />
            <StyledFindButton variant="contained">파일찾기</StyledFindButton>
          </label>
        </StyledLowContent>

        {/* 버튼1, 버튼2 */}
        <StyledLowContent>
          <StyledDeleteButton variant="contained" sx={{ gap: "5px" }}>
            회원탈퇴
          </StyledDeleteButton>
          <StyledModifyButton variant="contained" type="submit">
            수정하기
          </StyledModifyButton>
        </StyledLowContent>
      </form>
    </StyledContainer>
  );
};
export default Modify;

const StyledContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const StyledLowContent = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: low;
  align-items: center;
  width: 1269px;
`;
// 내정보수정 타이틀 스타일
const StyledTitle = styled(Typography)`
  && {
    ${fonts.TitleText};
    color: ${colors.main_mint};
    padding: 0;
  }
`;
// 내정보를 수정하세요 서브타이틀 스타일
const StyledSubTitle = styled(Typography)`
  && {
    ${fonts.SubTextThin}
    color: ${colors.darkgray_navy};
    padding: 0;
    margin-left: 30px;
    line-height: 50px;
  }
`;
//각정보타이틀 스타일지정
const StyledInfoName = styled.div`
  && {
    ${fonts.SubTextBig}
    color:${colors.main_black};
    width: 160px;
  }
`;
//텍스트필드 스타일지정
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "45px",
    borderRadius: "10px",
    border: "1px #00057D solid",
    width: "1100px",
  },
}));
const StyledFileFindTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "45px",
    borderRadius: "10px",
    border: "1px #00057D solid",
    width: "960px",
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
