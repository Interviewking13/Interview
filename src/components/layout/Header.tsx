import React from "react";
import styled from "@emotion/styled";
import { Link, TextField } from "@mui/material";

const Divider = styled.div`
  margin: 15px 0px;
  border-bottom: 1px solid #000;
`;
const StyledContainer = styled.div`
  margin: 15px 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLogo = styled(Link)`
  font-size: 30px;
  font-weight: bold;
  color: #00057d;
`;
const StyledNavItemContainer = styled.div``;

const StyledNavItem = styled(Link)`
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin-left: 20px;
`;
const StyledLoginItemContainer = styled.div``;

const StyledLoginItem = styled(Link)`
  font-size: 15px;
  font-weight: bold;
  color: grey;
  margin-left: 10px;
`;
const Header = (): JSX.Element => {
  return (
    <>
      <StyledContainer>
        <StyledLogo href="#" underline="none">
          면접왕
        </StyledLogo>
        <StyledNavItemContainer>
          <StyledNavItem href="#" underline="none">
            스터디
          </StyledNavItem>
          <StyledNavItem href="#" underline="none">
            커뮤니티
          </StyledNavItem>
          <StyledNavItem href="#" underline="none">
            나의 스터디
          </StyledNavItem>
        </StyledNavItemContainer>
        <StyledLoginItemContainer>
          <StyledLoginItem href="#" underline="none">
            로그인
          </StyledLoginItem>
          <StyledLoginItem href="#" underline="none">
            회원가입
          </StyledLoginItem>
          <StyledLoginItem href="#" underline="none">
            마이페이지
          </StyledLoginItem>
        </StyledLoginItemContainer>
      </StyledContainer>
      <Divider></Divider>
    </>
  );
};

export default Header;
