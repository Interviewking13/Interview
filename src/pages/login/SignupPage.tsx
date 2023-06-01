import styled from "@emotion/styled";
import { Button } from "@mui/base";
import { TextField } from "@mui/material";
import { useState } from "react";

const SignupPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //@ts-ignore
  const onClickSubmit = (e) => {
    e.preventDefault();
    // 회원가입 처리 등의 로직 추가
    if (password===confirmPassword) {
      console.log("비밀번호가 일치합니다.")
    } else {
      console.log("비밀번호가 일치하지않습니다.")
    }
    
  };

  //@ts-ignore
  const onChangePassword = (e) => {
    setPassword(e.target.value)
    console.log(password);
  }
  //@ts-ignore
  const onChangePasswordConfirm = (e) => {
    setConfirmPassword(e.target.value)
    console.log(confirmPassword);
  }

  return (
    <StyledLoginContainer>
      <StyledLoginTitleContainer>
        <StyledLoginText>면접을 면접답게</StyledLoginText>
        <StyledLoginText>면접왕</StyledLoginText>
        <StyledLoginText>면접왕에서 스터디 찾고, 동료들과 함께 자신있는 면접을 준비하세요</StyledLoginText>
      </StyledLoginTitleContainer>

      {/* <StyledSignupContainer>
        <StyledSignupInput label="이름" variant="outlined" />
        <StyledSignupInput label="연락처" variant="outlined" />
        <StyledSignupInput label="아이디" variant="outlined" />
        <StyledSignupInput label="비밀번호" variant="outlined" />
        <StyledSignupInput label="비밀번호 확인" variant="outlined" />
        <StyledSignupBtn onClick={onClickSubmit}>신청하기</StyledSignupBtn>
      </StyledSignupContainer> */}

      <StyledSignupContainer>
        <StyledSignupInput placeholder="이름" ></StyledSignupInput>
        <StyledSignupInput placeholder="연락처" ></StyledSignupInput>
        <StyledSignupInput placeholder="아이디" ></StyledSignupInput>
        <StyledSignupInput placeholder="비밀번호" onChange={onChangePassword} ></StyledSignupInput>
        <StyledSignupInput placeholder="비밀번호 확인" onChange={onChangePasswordConfirm} ></StyledSignupInput>
        <StyledSignupBtn onClick={onClickSubmit}>신청하기</StyledSignupBtn>
      </StyledSignupContainer>
    </StyledLoginContainer>
  );
};

const StyledLoginContainer = styled.div`
    background-color: #f1f4ff;
    align-items: center; /* 수직 가운데 정렬 */
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `
  const StyledLoginTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    
  `
  const StyledLoginText = styled.div`
    color: #00057D; 
    font-size: 64px; 
    font-weight:400;

    &:nth-of-type(2) {
      color: #00E595;
      margin-top: 20px;
    }

    &:nth-of-type(3) {
      color: #8689A3;
      font-size: 18px;
      font-weight:300;
      margin-top: 50px;
    }
  `
  const StyledSignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 100px;
  `
  // styled 함수의 인자로 화살표 함수를 사용해 스타일 속성을 정의
  // [theme 객체]사용시 MUI 테마 참조 가능
  // & .MuiInputBase-root는 TextField의 루트 요소를 선택하고, 해당 요소에 css적용하도록 설정
  // const StyledSignupInput = styled(TextField)(({ theme }) => ({
  //   "& .MuiInputLabel-root": {
  //     transform: "translateY(25%)",
  //     color: "red",
  //   },
  //   "& .MuiInputBase-root": {
  //     height: "45px",
  //     width: "457px",
  //     marginTop: "15px",
  //     borderRadius: "10px",
  //     color: "#C0C3E5",
  //   },
  // }));

  const StyledSignupInput = styled.input`
    width: 457px;
    height: 45px;
    margin-top: 15px;
    color: #C0C3E5;
    border: 1px solid #C0C3E5;
    border-radius: 10px;
    padding-left: 18px;
    font-weight: 300;
    font-size: 18px; 
    &:not(:first-child) {
    margin-top: 15px; 
  }
    &::placeholder {
      color: #C0C3E5;
    }
  `
  const StyledSignupBtn = styled(Button)`
  width: 132px;
  height: 45px;
  height: 45px;
  border-radius: 10px;
  background-color: #2E3057;
  color: #ffffff;
  font-weight: 600;
  font-size: 18px;
  border: 1px solid #2E3057;
  margin-top: 40px;
  margin-left: auto;
  `
export default SignupPage;
