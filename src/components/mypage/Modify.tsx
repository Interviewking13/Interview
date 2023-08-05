import React, { useState, useEffect, useRef } from "react";
import { getUserData, putUserData, deleteUser } from "../../api/api-user";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import { useNavigate } from "react-router-dom";

import ModifyBtn from "../UI/ModifyBtn";
export type UserData = {
  email: string;
  user_name: string;
  phone_number: string;
  user_id: string;
  file_key: string | null;
  file_name: string | null;
};

const Modify = () => {
  const writePassword = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<any>(null);

  useEffect(() => {
    getData();
  }, []);

  const [userDataValue, setUserDataValue] = useState<UserData>({
    email: "",
    user_name: "",
    phone_number: "",
    user_id: "",
    file_key: null,
    file_name: null,
  });
  const [password, setPassword] = useState<string>("");
  const [verPassword, setVerPassword] = useState<string>("");

  const onChangePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const onChangeVerPassword = (e: any) => {
    setVerPassword(e.target.value);
  };
  const handleChangeState = (e: any) => {
    setUserDataValue({
      ...userDataValue,
      [e.target.name]: e.target.value, //내용이 적히는 key,value를 이용함
      //   // content: state.contant를 스프레드 연산자로 간단하게 복사가능
      //   //스프레드 연산자는 변경값 앞에 덧씌운다.
    });
  };
  const getData = async () => {
    try {
      const token = String(localStorage.getItem("token"));
      const data = await getUserData(token);
      console.log(data);
      setUserDataValue(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  /** 파일업로드 부분 */
  const onChangeFileInput = (e: React.FormEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };
  const handleFileUpload = () => {
    const file = fileInputRef.current?.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      console.log("File upload:", file);
      setUserDataValue({ ...userDataValue, file_name: file.name });
    }
  };

  return (
    <StyledContainer>
      {/* 타이틀 */}
      <StyledRowContent>
        <StyledTitle>내 정보 수정</StyledTitle>
        <StyledSubTitle variant="subtitle1">
          나의 회원 정보를 수정합니다.
        </StyledSubTitle>
      </StyledRowContent>
      {/* 회원정보 입력 */}
      <form>
        <StyledRowContent>
          <StyledInfoName>이름</StyledInfoName>
          <StyledTextField defaultValue={userDataValue.user_name} readOnly />
        </StyledRowContent>
        <StyledRowContent>
          <StyledInfoName>연락처</StyledInfoName>

          <StyledTextField
            defaultValue={userDataValue.phone_number}
            onChange={handleChangeState}
            // defaultValue="01023445678"
          />
        </StyledRowContent>
        <StyledRowContent>
          <StyledInfoName>아이디</StyledInfoName>

          <StyledTextField defaultValue={userDataValue.email} readOnly />
        </StyledRowContent>
        <StyledRowContent>
          <StyledInfoName>비밀번호</StyledInfoName>
          <StyledTextField
            ref={writePassword}
            type="password"
            onChange={onChangePassword}
          />
        </StyledRowContent>
        <StyledRowContent>
          <StyledInfoName>비밀번호확인</StyledInfoName>
          <StyledTextField type="password" onChange={onChangeVerPassword} />
        </StyledRowContent>

        {/* 파일첨부 부분 */}

        <StyledRowContent>
          <StyledInfoName>자기소개서첨부</StyledInfoName>
          <StyledFindMobileContainer>
            <StyledFileFindTextField placeholder="파일을 선택하세요" />
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
              ref={fileInputRef}
            />
            <StyledFindButton
              // onSubmit={onSubmitUpload}
              type="submit"
              variant="contained"
              onClick={onChangeFileInput}
            >
              파일찾기
            </StyledFindButton>
          </StyledFindMobileContainer>
        </StyledRowContent>

        {/* 회원탈퇴, 수정 버튼 컴포넌트*/}
        <ModifyBtn
          userDataValue={userDataValue}
          password={password}
          verPassword={verPassword}
        />
      </form>
    </StyledContainer>
  );
};
export default Modify;

/** 페이지 전체 감싸는 div*/
const StyledContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
/** 각 요소 가로배열 */
const StyledRowContent = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 10px;
  }
`;
/** title :내 정보수정*/
const StyledTitle = styled(Typography)`
  && {
    ${fonts.TitleText};
    color: ${colors.main_mint};
    color: ${colors.main_mint};
    padding: 0;
  }
`;
/** subTitle: 나의 회원정보수정 */
const StyledSubTitle = styled(Typography)`
  && {
    ${fonts.SubTextThin}
    color: ${colors.darkgray_navy};
    padding: 0;
    margin-left: 30px;
    line-height: 50px;
    @media screen and (max-width: 768px) {
      margin-left: 0px;
    }
  }
`;
/** 각 요소 텍스트*/
const StyledInfoName = styled.div`
  && {
    ${fonts.SubTextBig}
    color:${colors.main_black};
    width: 160px;
    @media screen and (max-width: 768px) {
      margin-bottom: 10px;
    }
  }
`;
/** MUI input 입력란 스타일*/
const StyledTextField = styled.input`
  ${fonts.SubTextThinSmall};
  color: ${colors.main_black};
  height: 45px;
  border-radius: 10px;
  border: 1px #00057d solid;
  width: 1100px;
  padding-left: 20px;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;
/** MUI input 파일찾기  */
const StyledFileFindTextField = styled.input`
  ${fonts.SubTextThinSmall};
  color: ${colors.main_black};
  height: 45px;
  border-radius: 10px;
  border: 1px #00057d solid;
  width: 940px;
  margin-right: 10px;
  padding-left: 20px;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`;
const StyledFindMobileContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
`;

/** 파일찾기버튼 스타일 */
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
    @media screen and (max-width: 768px) {
      width: 30%;
    }
  }
`;
