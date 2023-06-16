import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import Button from "@mui/material/Button";
import LeftSignContainer from "../../components/auth/LeftSignContainer";
import { postSignUp } from "../../api/api-user";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onClickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const replaceText = "";
    const nameValidated = name.replace(/[^가-힣a-zA-Z]/g, replaceText);
    const phoneValidated = phone.replace(/[^0-9-]/g, replaceText);
    const emailValidated = email.replace(/[^a-zA-Z0-9@.]/g, replaceText);
    const passwordValidated = password.replace(/[^a-zA-Z0-9]/g, replaceText);
    const confirmPasswordValidated = confirmPassword.replace(
      /[^a-zA-Z0-9]/g,
      replaceText
    );

    if (!name || !phone || !email || !password || !confirmPassword) {
      console.log("모든 필드를 입력해야 합니다.");
      return;
    }

    // if (nameValidated.length < 2) {
    //   console.log("이름은 최소 2자 이상이어야 합니다.");
    //   return;
    // }

    // if (phoneValidated !== phone) {
    //   console.log("전화번호는 숫자와 - 기호로만 입력해야 합니다.");
    //   return;
    // }

    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // if (!emailRegex.test(email)) {
    //   console.log("유효한 이메일 주소를 입력해야 합니다.");
    //   return;
    // }

    // if (passwordValidated.length < 6) {
    //   console.log("비밀번호는 6자 이상으로 설정해주세요.");
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   console.log("비밀번호가 일치하지 않습니다.");
    //   return;
    // }
    // postSignUp(name, email, password, passwordValidated);
    // console.log(postSignUp);
    // API 호출
    try {
      const response = await postSignUp(name, email, password, passwordValidated);
      console.log("가입 성공:", response);

      // 가입 성공 후 홈으로 이동
      navigate("/");
    } catch (error) {
      console.log("가입 실패:", error);
    }

  };

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <StyledCommonContainer>
      <StyledSignupWrapper>
        <StyledSignupContainer>
          <LeftSignContainer />
          <StyledSignupInputContainer onSubmit={onClickSubmit}>
            <StyledSignupInput
              type="text"
              placeholder="이름"
              value={name}
              onChange={onChangeName}
            />
            <StyledSignupInput
              type="tel"
              placeholder="전화번호"
              value={phone}
              onChange={onChangePhone}
            />
            <StyledSignupInput
              type="email"
              placeholder="이메일"
              value={email}
              onChange={onChangeEmail}
            />
            <StyledSignupInput
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onChangePassword}
            />
            <StyledSignupInput
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={onChangePasswordConfirm}
            />
            <StyledSignupBtn variant="contained" color="primary" type="submit">
              가입하기
            </StyledSignupBtn>
          </StyledSignupInputContainer>
        </StyledSignupContainer>
        <StyledSignupCopyright>
          Copyright © 2023 INTERVIEWKING All Rights Reserved.
        </StyledSignupCopyright>
      </StyledSignupWrapper>
    </StyledCommonContainer>
  );
};

const StyledCommonContainer = styled.div`
  background-color: ${colors.back_navy};
`;

const StyledSignupWrapper = styled.div`
  width: 1270px;
  margin: 0 auto;
  padding-bottom: 30px;
`;

const StyledSignupContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSignupInputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
`;

const StyledSignupInput = styled.input`
  width: 457px;
  height: 45px;
  margin-top: 15px;
  color: ${colors.main_black};
  border: 1px solid ${colors.gray_navy};
  border-radius: 10px;
  padding-left: 18px;
  font-weight: 300;
  font-size: 18px;
  &:first-of-type {
    margin-top: 15px;
  }
  &::placeholder {
    color: ${colors.gray_navy};
  }
  &:focus {
    outline: none;
    border: 1px solid ${colors.gray_navy};
    box-shadow: none;
  }
`;

const StyledSignupBtn = styled(Button)`
  && {
    width: 132px;
    height: 45px;
    border-radius: 10px;
    background-color: ${colors.dark_navy};
    color: ${colors.back_navy};
    font-weight: 600;
    font-size: 18px;
    border: 1px solid ${colors.dark_navy};
    margin-top: 40px;
    margin-left: auto;
    &:hover {
      background-color: ${colors.dark_navy};
    }
  }
`;

const StyledSignupCopyright = styled.div`
  text-align: center;
  font-size: 14px;
  color: #c0c3e5;
`;

export default SignupPage;
