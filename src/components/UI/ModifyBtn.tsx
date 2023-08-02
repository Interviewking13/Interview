import React, { useRef } from "react";
import { putUserData, deleteUser } from "../../api/api-user";
import { Button } from "@mui/material";
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import { useNavigate } from "react-router-dom";
import { UserData } from "../mypage/Modify";

type UserInfo = {
  password: string;
  verPassword: string;
  userDataValue: UserData;
};

const ModifyBtn = ({ userDataValue, password, verPassword }: UserInfo) => {
  // const { email, user_name, phone_number, user_id, file_key, file_name } =
  //   userDataValue;
  const navigate = useNavigate();
  const writePassword = useRef<HTMLInputElement>(null);

  const onSubmitDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 1 && password === verPassword) {
      if (window.confirm("회원탈퇴를 하시겠습니까?")) {
        try {
          const token = String(localStorage.getItem("token"));
          const user_id = userDataValue.user_id;
          const email = userDataValue.email;
          const response = await deleteUser(user_id, email, password, token);
          console.log("User deleted successfully", response);
          alert("이용해주셔서 감사합니다.");
          navigate("/");
          localStorage.removeItem("token");
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("탈퇴가 취소되었습니다.");
      }
    } else {
      alert("탈퇴를 위해 비밀번호,비밀번호확인을 작성해주세요");
      writePassword.current?.focus();
    }
  };

  const onSubmitModify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length > 1 && password === verPassword) {
      try {
        const token = String(localStorage.getItem("token"));
        const user_id = userDataValue.user_id;
        const email = userDataValue.email;
        const phone_number = userDataValue.phone_number;
        const passwordCheck = verPassword;
        const file_key = userDataValue.file_key;
        const file_name = userDataValue.file_name;
        const response = await putUserData(
          user_id,
          email,
          password,
          passwordCheck,
          token,
          phone_number,
          file_name,
          file_key
        );
        console.log("UserInfo Modify successfully", response);
        alert("정보가 수정되었습니다.");
        navigate("/mypage/userInfo");
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("정보수정을 위해 비밀번호,비밀번호확인을 작성해주세요");
      writePassword.current?.focus();
    }
  };

  return (
    <StyledButtonContent>
      <StyledDeleteButton
        onClick={onSubmitDelete}
        type="submit"
        variant="contained"
      >
        회원탈퇴
      </StyledDeleteButton>
      <StyledModifyButton
        onClick={onSubmitModify}
        variant="contained"
        type="submit"
      >
        수정하기
      </StyledModifyButton>
    </StyledButtonContent>
  );
};

export default ModifyBtn;

/** 버튼 배치 스타일 */
const StyledButtonContent = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 1269px;
  @media screen and (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    margin-left: 10px;
    margin-bottom: 10px;
  }
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
    @media screen and (max-width: 768px) {
      width: 42%;
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
    @media screen and (max-width: 768px) {
      width: 42%;
      margin-right: 10px;
    }
  }
`;
