import React, { ChangeEvent, useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LeftSignContainer from "../../components/auth/LeftSignContainer";

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

    try {
      const response = await axios.post(
        "http://34.22.79.51:5000/api/user/login",
        {
          email,
          password,
        }
      );

      if (response.data.resultCode === "200") {
        console.log("로그인 성공");
        navigate("/homepage"); // 로그인 성공 시 홈페이지로 이동
      } else {
        console.log("로그인 실패");
      }
    } catch (error) {
      setError("에러 발생: " + String(error));
    }
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const onClickSignup = () => {
    navigate("./signup"); // useNavigate 사용하여 페이지 이동
  };

  // useEffect(() => {
  //   fetchData()
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // }, []);

  // const fetchData = () => {
  //   const user_id = "6478073927182b326a1ced5c"; // 원하는 임의의 user_id 값
  //   const user_password =
  //     "$2b$10$pAm1KetUgiKxto4Hd8oUV.QqHXhKtBq9gAnPktMytb7lY4LmpGjly"; // "원하는_임의의_비밀번호" 부분을 원하는 비밀번호로 대체하세요.

  //   return axios
  //     .get(`http://34.22.79.51:5000/api/user/mypage/${user_id}`, {
  //       headers: {
  //         Authorization: `Bearer ${user_password}`,
  //       },
  //     })
  //     .then((response) => response.data);
  // };

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
