import React, { useState, useEffect, useRef } from "react";
import { getUserData, putUserData, deleteUser } from "../../api/api-user";
import { Button, Typography } from "@mui/material";
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import { useNavigate } from "react-router-dom";

type UserData = {
  email: string;
  user_name: string;
  phone_number: string;
  user_id: string;
  file_key: string;
  file_name: string;
  password: string;
  verPassword: string;
};

const Modify = () => {
  const navigate = useNavigate();
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
    file_key: "",
    file_name: "",
    password: "",
    verPassword: "",
  });
  const handleChangeState = (e: any) => {
    setUserDataValue({
      ...userDataValue,
      [e.target.name]: e.target.value, //내용이 적히는 요소의 이름===key,적히는 내용===value를 이용함
      //   // content: state.contant를 스프레드 연산자로 간단하게 복사가능
      //   //스프레드 연산자는 변경값 앞에 덧씌운다.
    });
  };

  const handleChangePassword = (e: any) => {
    setUserDataValue({
      ...userDataValue,
      [e.target.name]: String(e.target.value),
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
  console.log(userDataValue);
  const onSubmitDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userDataValue.password === userDataValue.verPassword) {
      if (window.confirm("회원탈퇴를 하시겠습니까?")) {
        try {
          const token = String(localStorage.getItem("token"));
          const user_id = userDataValue.user_id;
          const email = userDataValue.email;
          const password = userDataValue.password;
          const response = await deleteUser(user_id, email, password, token);
          console.log("User deleted successfully", response);
          alert("이용해주셔서 감사합니다.");
          navigate("/");
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("탈퇴가 취소되었습니다.");
      }
    } else {
      alert("탈퇴를 위해 비밀번호를 작성해주세요");
      writePassword.current?.focus();
    }
  };

  // const onSubmitModify = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (
  //     userDataValue.password &&
  //    userDataValue.password.length > 1&&
  //     userDataValue.password === userDataValue.verPassword
  //   ) {
  //     try {
  //       const token = String(localStorage.getItem("token"));
  //       const user_id = userDataValue.user_id;
  //       const email = userDataValue.email;
  //       const password = userDataValue.password;
  //       // const response = await putUserData(user_id, email, password, token);
  //       // console.log("User deleted successfully", response);
  //       alert("정보가 수정되었습니다.");
  //       navigate("/mypage/userInfo");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     alert("정보수정을 위해 비밀번호를 작성해주세요");
  //     writePassword.current?.focus();
  //   }
  // };
  // const onSubmitUpload = async (e: React.FormEvent) => {
  //   e.preventDefault();
  // };

  return (
    <StyledContainer>
      {/* 타이틀 */}
      <StyledLowContent>
        <StyledTitle>내 정보 수정</StyledTitle>
        <StyledSubTitle variant="subtitle1">
          나의 회원 정보를 수정합니다.
        </StyledSubTitle>
      </StyledLowContent>
      {/* 회원정보 입력 */}
      <form>
        <StyledLowContent>
          <StyledInfoName>이름</StyledInfoName>
          <StyledTextField defaultValue={userDataValue.user_name} readOnly />
        </StyledLowContent>
        <StyledLowContent>
          <StyledInfoName>연락처</StyledInfoName>

          <StyledTextField
            defaultValue={userDataValue.phone_number}
            onChange={handleChangeState}
            // defaultValue="01023445678"
          />
        </StyledLowContent>
        <StyledLowContent>
          <StyledInfoName>아이디</StyledInfoName>

          <StyledTextField defaultValue={userDataValue.email} readOnly />
        </StyledLowContent>
        <StyledLowContent>
          <StyledInfoName>비밀번호</StyledInfoName>
          <StyledTextField
            ref={writePassword}
            type="password"
            onChange={handleChangePassword}
          />
        </StyledLowContent>
        <StyledLowContent>
          <StyledInfoName>비밀번호확인</StyledInfoName>
          <StyledTextField type="password" onChange={handleChangePassword} />
        </StyledLowContent>

        {/* 파일첨부 부분 */}

        <StyledLowContent>
          <StyledInfoName>자기소개서첨부</StyledInfoName>
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
        </StyledLowContent>

        {/* 회원탈퇴, 수정 버튼 */}
        <StyledButtonContent>
          <StyledDeleteButton
            onClick={onSubmitDelete}
            type="submit"
            variant="contained"
          >
            회원탈퇴
          </StyledDeleteButton>
          <StyledModifyButton
            // onClick={onSubmitModify}
            variant="contained"
            type="submit"
          >
            수정하기
          </StyledModifyButton>
        </StyledButtonContent>
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
`;
/** 각 요소 가로배열 */
const StyledLowContent = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 1269px;
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
  }
`;
/** 각 요소 텍스트*/
const StyledInfoName = styled.div`
  && {
    ${fonts.SubTextBig}
    color:${colors.main_black};
    width: 160px;
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
`;
/** MUI input 파일찾기  */
const StyledFileFindTextField = styled.input`
  ${fonts.SubTextThinSmall};
  color: ${colors.main_black};
  height: 45px;
  border-radius: 10px;
  border: 1px #00057d solid;
  width: 960px;
  margin-right: 10px;
  padding-left: 20px;
`;
/** 버튼 배치 스타일 */
const StyledButtonContent = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 1269px;
`;

/** 수정하기버튼 스타일 */
const StyledModifyButton = styled(Button)`
  && {
    margin-right: 10px;
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
/** 회원탈퇴 버튼 스타일 */
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
  }
`;
/**업로드된 파일 삭제 텍스트버튼  */
const StyledFileDeleteButton = styled(Button)`
  && {
    color: ${colors.main_red};
    ${fonts.SubTextThinSmall}
    cursor: pointer;
  }
`;
/**업로드된 파일 다운로드 텍스트버튼 */
const StyledFileDownButton = styled(Button)`
  && {
    color: ${colors.darkgray_navy};
    ${fonts.SubTextSmall}
    cursor: pointer;
  }
`;
