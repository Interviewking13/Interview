import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import Button from "@mui/material/Button";
import LeftSignContainer from "../../components/auth/LeftSignContainer";
import { postSignUp } from "../../api/api-user";
import { useNavigate } from "react-router-dom";

// SignupPage 컴포넌트 선언
const SignupPage = () => {
  // 이름 상태 추가
  const [name, setName] = useState("");
  // 전화번호 상태 추가
  const [phone, setPhone] = useState("");
  // 이메일 상태 추가
  const [email, setEmail] = useState("");
  // 비밀번호 상태 추가
  const [password, setPassword] = useState("");
  // 비밀번호 확인 상태 추가
  const [confirmPassword, setConfirmPassword] = useState("");
  // 에러 상태 추가
  const [error, setError] = useState("");
  // 이름 에러 상태 추가(이름 오류 메시지 표시)
  const [nameError, setNameError] = useState("");
  // 전화번호 에러 상태 추가(전화번호 오류 메시지 표시)
  const [phoneError, setPhoneError] = useState("");
  // 이메일 에러 상태 추가(이메일 오류 메시지 표시)
  const [emailError, setEmailError] = useState("");
  // 비밀번호 에러 상태 추가(비밀번호 오류 메시지 표시)
  const [passwordError, setPasswordError] = useState("");
  // 비밀번호 확인 에러 상태 추가(비밀번호 확인 오류 메시지 표시)
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // navigate 훅 사용 (라우터 이동을 위한 함수)
  const navigate = useNavigate();

  // 가입하기 버튼 클릭 시 호출되는 함수
  const onClickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 사용자 입력 유효성 검사
    // 사용자 입력에서 허용되는 문자 이외의 모든 문자를 대체하기 위한 변수
    const replaceText = "";
    // 이름 입력값 유효성 검사
    const nameValidated = name.replace(/[^가-힣a-zA-Z]/g, replaceText);
    // 전화번호 입력값 유효성 검사
    const phoneValidated = phone.replace(/[^0-9-]/g, replaceText);
    // 이메일 입력값 유효성 검사
    const emailValidated = email.replace(/[^a-zA-Z0-9@.]/g, replaceText);
    // 비밀번호 입력값 유효성 검사
    const passwordValidated = password.replace(/[^a-zA-Z0-9]/g, replaceText);
    // 비밀번호 확인 입력값 유효성 검사
    const confirmPasswordValidated = confirmPassword.replace(
      /[^a-zA-Z0-9]/g,
      replaceText
    );

    // 필수 필드가 모두 입력되었는지 확인
    if (!name || !phone || !email || !password || !confirmPassword) {
      alert("모든 필드를 입력해야 합니다.");
      return;
    }

    // 이름 필드 유효성 검사
    if (nameValidated.length < 2) {
      setNameError("이름은 최소 2자 이상이어야 합니다.");
      return;
    } else {
      setNameError("");
    }

    // 전화번호 필드 유효성 검사
    if (phoneValidated !== phone) {
      setPhoneError("전화번호는 숫자와 - 기호로만 입력해야 합니다.");
      return;
    } else {
      setPhoneError("");
    }

    // 이메일 필드 정규식을 사용한 유효성 검사
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("잘못된 유형의 이메일 주소입니다. @와 .을 포함해야합니다.");
      return;
    } else {
      setEmailError("");
    }

    // 비밀번호 필드 유효성 검사
    if (passwordValidated.length < 4) {
      setPasswordError("비밀번호는 4자 이상으로 설정해주세요.");
      return;
    } else {
      setPasswordError("");
    }

    // 비밀번호와 비밀번호 확인 필드 일치 여부 확인
    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      setConfirmPasswordError("");
    }

    // 사용자 회원가입을 위한 API 호출
    try {
      const response = await postSignUp(
        name,
        email,
        password,
        passwordValidated,
        Number(phone)
      );
      console.log("가입 성공:", response);

      // 가입 성공 후 로그인 페이지로 이동
      navigate("/login");
    } catch (error) {
      setError("회원가입 실패");
    }
  };

  // 입력 필드에 대한 이벤트 핸들러
  /** 이름 입력 값 변경 시 동작 */
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  /** 전화번호 입력 값 변경 시 동작 */
  const onChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  /** 이메일 입력 값 변경 시 동작 */
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  /** 비밀번호 입력 값 변경 시 동작 */
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  /** 비밀번호 확인 입력 값 변경 시 동작 */
  const onChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <StyledPageContainer>
      <StyledCommonContainer>
        <StyledSignupContainer>
          <LeftSignContainer />
          <StyledRightSignContainer onSubmit={onClickSubmit}>
            <StyledSignupInput
              type="text"
              placeholder="이름"
              value={name}
              onChange={onChangeName}
            />
            {nameError && (
              <StyledErrorMessage>{nameError.toString()}</StyledErrorMessage>
            )}
            <StyledSignupInput
              type="tel"
              placeholder="전화번호"
              value={phone}
              onChange={onChangePhone}
            />
            {phoneError && (
              <StyledErrorMessage>{phoneError.toString()}</StyledErrorMessage>
            )}
            <StyledSignupInput
              type="email"
              placeholder="이메일"
              value={email}
              onChange={onChangeEmail}
            />
            {emailError && (
              <StyledErrorMessage>{emailError.toString()}</StyledErrorMessage>
            )}
            <StyledSignupInput
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onChangePassword}
            />
            {passwordError && (
              <StyledErrorMessage>
                {passwordError.toString()}
              </StyledErrorMessage>
            )}
            <StyledSignupInput
              type="password"
              placeholder="비밀번호 확인"
              value={confirmPassword}
              onChange={onChangePasswordConfirm}
            />
            {confirmPasswordError && (
              <StyledErrorMessage>
                {confirmPasswordError.toString()}
              </StyledErrorMessage>
            )}
            <StyledSignupBtn variant="contained" color="primary" type="submit">
              가입하기
            </StyledSignupBtn>
          </StyledRightSignContainer>
        </StyledSignupContainer>
        <StyledSignupCopyright>
          Copyright © 2023 INTERVIEWKING All Rights Reserved.
        </StyledSignupCopyright>
      </StyledCommonContainer>
    </StyledPageContainer>
  );
};

/** 페이지 컨테이너 div (로그인 페이지 전체 배경색 지정) */
const StyledPageContainer = styled.div`
  background-color: ${colors.back_navy};
`;

/** 공통 컨테이너 div (가운데 정렬 및 레이아웃 크기 지정) */
const StyledCommonContainer = styled.div`
  width: 100%;
  max-width: 1270px;
  margin: 0 auto;
  padding-bottom: 30px;
`;

/** 회원가입 컨테이너 div (좌/우 컴포넌트 가운데 정렬) */
const StyledSignupContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/** 오른쪽 컴포넌트 컨테이너 div */
const StyledRightSignContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
`;

/** 이름, 전화번호, 이메일, 비밀번호, 비밀번호 확인 input */
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

/** 회원가입 버튼 */
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
  color: #c0c3e5;
`;

export default SignupPage;
