import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import LeftSignContainer from "../../components/auth/LeftSignContainer";
import { postSignIn } from "../../api/api-user";
import { useMutation, useQueryClient } from "react-query";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();


  const loginMutation = useMutation(
    (credentials: { email: string; password: string }) =>
      postSignIn(credentials.email, credentials.password)
  );

  /** 로그인 버튼 클릭 시 동작 */
  const onClickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    try {
      const response = await loginMutation.mutateAsync({ email, password });

      if (response && response.data.resultCode === "200") {
        localStorage.setItem("token", response.data.data.token);
      }

      else if (response && response.data.resultCode === "400") {
        setEmailError(response.data.message);
        return;
      }

      queryClient.invalidateQueries("userData");
      console.log(response);
      navigate("/");
    } catch (passwordError) {
      setPasswordError("비밀번호를 확인하세요.")
    }
  };
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
  };

  /** 비밀번호 입력 값 변경 시 동작 */
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  /** 회원가입 페이지로 이동 */
  const onClickSignup = () => {
    navigate("./signup");
  };

  return (
    <StyledPageContainer>
      <StyledCommonContainer>
        <StyledLoginContainer>
          <LeftSignContainer />
          <StyledRightSignContainer onSubmit={onClickSubmit}>
            <StyledLoginInput
              type="email"
              placeholder="이메일"
              value={email}
              onChange={onChangeEmail}
            />
            {emailError && (
              <StyledErrorMessage>{emailError.toString()}</StyledErrorMessage>
            )}
            <StyledLoginInput
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onChangePassword}
            />
            {passwordError && (
              <StyledErrorMessage>{passwordError.toString()}</StyledErrorMessage>
            )}
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
          </StyledRightSignContainer>
        </StyledLoginContainer>
        <StyledSignupCopyright>
          Copyright © 2023 INTERVIEWKING All Rights Reserved.
        </StyledSignupCopyright>
      </StyledCommonContainer>
    </StyledPageContainer>
  );
};

/** 페이지 컨테이너 */
const StyledPageContainer = styled.div`
  background-color: ${colors.back_navy};
`;

/** 공통 컨테이너 */
const StyledCommonContainer = styled.div`
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

const StyledRightSignContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
`;

const StyledLoginInput = styled.input`
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

/** 회원가입 버튼 */
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

/** 로그인 버튼 */
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

/** 에러 메세지 */
const StyledErrorMessage = styled.p`
  color: ${colors.main_red};
  font-size: 14px;
  margin-left: auto;
  margin-top: 5px;
  margin-bottom: 0;
`;

/** 카피라이터 */
const StyledSignupCopyright = styled.div`
  text-align: center;
  font-size: 14px;
  color: ${colors.gray_navy};
`;

export default LoginPage;
