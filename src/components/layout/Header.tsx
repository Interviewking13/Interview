import styled from "@emotion/styled";
import { Link } from "@mui/material";

const Divider = styled.div`
  margin-top: 15px;
  border-bottom: 1px solid #909090;
`;
const StyledContainer = styled.div`
  margin: 0 auto; /* 가운데 정렬을 위한 수정 */
  padding-top: 40px;
  width: 1270px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLogo = styled(Link)`
  height: fit-content;
  font-family: 'establish Retrosans';
  font-size: 32px;
  font-weight: 400;
  color: #00057D;
  margin-right: 95px;
`;
const StyledNavItemContainer = styled.div`
`;

const StyledNavItem = styled(Link)`
  font-size: 18px;
  font-weight: 600;
  color: #0E0E0E;
  margin-left: 40px;
`;
const StyledLoginItemContainer = styled.div`

`;

const StyledLoginItem = styled(Link)`
  font-size: 16px;
  font-weight: 300;
  color: #7E7E7E;
  margin-left: 35px;
`;
const Header = (): JSX.Element => {
  return (
    <>
      <StyledContainer>
        <StyledLogo href="/" underline="none">
          면접왕
        </StyledLogo>
        <StyledNavItemContainer>
          <StyledNavItem href="/studylist" underline="none">
            스터디
          </StyledNavItem>
          <StyledNavItem href="/community/communityPage" underline="none">
            커뮤니티
          </StyledNavItem>
          <StyledNavItem href="/userstudy" underline="none">
            나의 스터디
          </StyledNavItem>
        </StyledNavItemContainer>
        <StyledLoginItemContainer>
          <StyledLoginItem href="/login" underline="none">
            로그인
          </StyledLoginItem>
          <StyledLoginItem href="/login/signup" underline="none">
            회원가입
          </StyledLoginItem>
          <StyledLoginItem href="/mypage" underline="none">
            마이페이지
          </StyledLoginItem>
        </StyledLoginItemContainer>
      </StyledContainer>
      <Divider></Divider>
    </>
  );
};

export default Header;
