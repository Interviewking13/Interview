import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import { TitleText } from "../../constants/fonts";

const Divider = styled.div`
  margin-top: 15px;
  border-bottom: 1px solid ${colors.gray_stroke};
`;
const StyledContainer = styled.div`
  margin: 0 auto; /* 가운데 정렬을 위한 수정 */
  padding-top: 40px;
  width: 1270px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledLogoContainer = styled.div`
  ${TitleText}
`;

const StyledLogo = styled(Link)`
  margin-right: 95px;
  color: ${colors.main_navy};
  text-decoration: none;
`;

const StyledNavItemContainer = styled.div``;

const StyledNavItem = styled(Link)`
  font-size: 18px;
  font-weight: 600;
  color: ${colors.main_black};
  margin-left: 40px;
  text-decoration: none;
`;
const StyledLoginItemContainer = styled.div``;

const StyledLoginItem = styled(Link)`
  font-size: 16px;
  font-weight: 300;
  color: ${colors.main_gray};
  margin-left: 35px;
  text-decoration: none;
`;
const Header = (): JSX.Element => {
  return (
    <>
      <StyledContainer>
        <StyledLogoContainer>
          <StyledLogo to="/">면접왕</StyledLogo>
        </StyledLogoContainer>
        <StyledNavItemContainer>
          <StyledNavItem to="/study">스터디</StyledNavItem>
          <StyledNavItem to="/community/communityPage">커뮤니티</StyledNavItem>
          <StyledNavItem to="/userstudy">나의 스터디</StyledNavItem>
        </StyledNavItemContainer>
        <StyledLoginItemContainer>
          <StyledLoginItem to="/login">로그인</StyledLoginItem>
          <StyledLoginItem to="/login/signup">회원가입</StyledLoginItem>
          <StyledLoginItem to="/mypage">마이페이지</StyledLoginItem>
        </StyledLoginItemContainer>
      </StyledContainer>
      <Divider></Divider>
    </>
  );
};

export default Header;
