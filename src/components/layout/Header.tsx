import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { TitleText, SubText, SubTextThinSmall } from '../../constants/fonts';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userDataAtom } from '../../recoil/userDataAtom';

const Header = (): JSX.Element => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userData = useRecoilValue(userDataAtom); // Recoil atom 값 가져오기
    const userName = userData ? userData.user_name : ''; // userName 가져오기
    const displayName = userName ? `${userName}님` : '마이페이지';
    const handleLogout = () => {
        localStorage.removeItem('token'); // 토큰 삭제
        navigate('/login');
    };

    const handleMyPageClick = () => {
        alert('로그인이 필요합니다.\n로그인 페이지로 이동합니다.');
    };

    return (
        <>
            <StyledContainer>
                <StyledLogoContainer>
                    <StyledLogo to="/">면접왕</StyledLogo>
                </StyledLogoContainer>
                <StyledNavItemContainer>
                    <StyledNavItem to="/study">스터디</StyledNavItem>
                    <StyledNavItem to="/community/communityPage">커뮤니티</StyledNavItem>
                </StyledNavItemContainer>
                <StyledLoginItemContainer>
                    {!token ? (
                        <>
                            <StyledLoginItem to="/login">로그인</StyledLoginItem>
                            <StyledLoginItem to="/login/signup">회원가입</StyledLoginItem>
                            <StyledLoginItem to="/login" onClick={handleMyPageClick}>
                                마이페이지
                            </StyledLoginItem>
                        </>
                    ) : (
                        <>
                            <StyledLogOutButton to="" onClick={handleLogout}>
                                로그아웃
                            </StyledLogOutButton>
                            <StyledLoginItem to="/mypage">{displayName}</StyledLoginItem>
                        </>
                    )}
                </StyledLoginItemContainer>
            </StyledContainer>
            <Divider></Divider>
        </>
    );
};

export default Header;

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
    justify-content: flex-start;
`;

const StyledLogoContainer = styled.div`
    ${TitleText}
`;

const StyledLogo = styled(Link)`
    margin-right: 100px;
    color: ${colors.main_navy};
    text-decoration: none;
`;

const StyledNavItemContainer = styled.div``;

const StyledNavItem = styled(Link)`
    ${SubText};
    color: ${colors.main_black};
    margin-right: 40px;
    text-decoration: none;
`;
const StyledLoginItemContainer = styled.div`
    margin-left: auto;
`;

const StyledLoginItem = styled(Link)`
    ${SubTextThinSmall};
    color: ${colors.main_gray};
    margin-left: 35px;
    text-decoration: none;
`;

const StyledLogOutButton = styled(Link)`
    ${SubTextThinSmall};
    color: ${colors.main_gray};
    margin-left: 35px;
    text-decoration: none;
    cursor: pointer;
`;
