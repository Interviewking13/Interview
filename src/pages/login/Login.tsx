import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LeftSignContainer from "../../components/auth/LeftSignContainer";
import { getUserData, postSignIn } from "../../api/api-user";
import { response } from "express";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onClickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      console.log("모든 필드를 입력해야 합니다.");
      return;
    }
    postSignIn(email, password).then((response) => {
      console.log(response.data);
      if (response.data.resultCode == "200")
        localStorage.setItem("token", response.data.data.token);
      getUserData(String(localStorage.getItem("token"))).then((response) =>
        console.log("response")
      );

      navigate("/"); // useNavigate 사용하여 페이지 이동
    });
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };

  // 비밀번호 입력 값 변경 시 동작
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  // 회원가입 페이지로 이동
  const onClickSignup = () => {
    navigate("./signup"); // useNavigate 사용하여 페이지 이동
  };

  return (
    <StyledCommonContainer>
      <StyledLoginWrapper>
        <StyledLoginContainer>
          <LeftSignContainer />
          <StyledSignupContainer onSubmit={onClickSubmit}>
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
            <StyledBtnWrapper>
              <StyledSignupBtn
                variant="contained"
                color="primary"
                type="button"
                onClick={onClickSignup}
              >
                회원가입
              </StyledSignupBtn>
              <StyledLoginBtn variant="contained" color="primary" type="submit">
                로그인
              </StyledLoginBtn>
            </StyledBtnWrapper>
            {error && (
              <StyledErrorMessage>{error.toString()}</StyledErrorMessage>
            )}
          </StyledSignupContainer>
        </StyledLoginContainer>
        <StyledSignupCopyright>
          Copyright © 2023 INTERVIEWKING All Rights Reserved.
        </StyledSignupCopyright>
      </StyledLoginWrapper>
    </StyledCommonContainer>
  );
};

const StyledCommonContainer = styled.div`
  background-color: ${colors.back_navy};
`;

const StyledLoginWrapper = styled.div`
  width: 1270px;
  margin: 0 auto;
  padding-bottom: 30px;
`;

const StyledLoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSignupContainer = styled.form`
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

const StyledBtnWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  margin-left: auto;
`;

const StyledSignupBtn = styled(Button)`
  && {
    width: 132px;
    height: 45px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 18px;
    background-color: ${colors.main_mint};
    color: ${colors.main_black};
    border: 1px solid ${colors.main_mint};
    &:hover {
      background-color: ${colors.main_mint};
    }
  }
`;

const StyledLoginBtn = styled(Button)`
  && {
    width: 132px;
    height: 45px;
    border-radius: 10px;
    color: ${colors.back_navy};
    font-weight: 600;
    font-size: 18px;
    background-color: ${colors.dark_navy};
    border: 1px solid ${colors.dark_navy};
    margin-left: 15px;
    &:hover {
      background-color: ${colors.dark_navy};
    }
  }
`;

const StyledErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const StyledSignupCopyright = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${colors.gray_navy};
`;

export default LoginPage;
