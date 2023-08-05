import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { colors } from '../../constants/colors';
import { TitleText, SubText, SubTextThinSmall } from '../../constants/fonts';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userDataAtom } from '../../recoil/userDataAtom';

// logout 함수
const logout = () => {
    localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 제거
    localStorage.removeItem('autoLogin'); // 자동로그인 초기화
    window.sessionStorage.clear(); // 세션 스토리지 모든 데이터 삭제
};

const NavItemContainer = styled.div<{ menuOpen: boolean }>`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: 768px) {
        width:35%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        background-color: white;
        position: absolute;
        top: 0;
        right: 0;
        padding: 20px;
        z-index: 1;
        display: none;
        ${({ menuOpen }) =>
        menuOpen &&
        css`
                display: flex;
            `}
    }
`;

const Header = (): JSX.Element => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false); // 메뉴 열림/닫힘 상태를 추적하는 상태 변수
    const token = localStorage.getItem('token');
    const userData = useRecoilValue(userDataAtom); // Recoil atom 값 가져오기
    const userName = userData ? userData.user_name : ''; // userName 가져오기
    const displayName = userName ? `${userName}님` : '마이페이지';
    const handleLogout = () => {
        localStorage.removeItem('token'); // 토큰 삭제
        logout(); // logout함수 호출하여 로그아웃 처리
        navigate('/login'); // 로그인 페이지로 이동
    };

    const handleMyPageClick = () => {
        alert('로그인이 필요합니다.\n로그인 페이지로 이동합니다.');
    };

    return (
        <>
            {menuOpen && <OverlayBackground />}
            <StyledContainer>
                <StyledLogoContainer>
                    <StyledLogo to="/">면접왕</StyledLogo>
                </StyledLogoContainer>
                <StyledMenuIcon onClick={() => setMenuOpen(!menuOpen)}> {/* 메뉴 상태 전환 */}
                    <MenuIconLine />
                    <MenuIconLine />
                    <MenuIconLine />
                </StyledMenuIcon>
                {menuOpen && (
                    <CloseIcon onClick={() => setMenuOpen(false)}>&times;</CloseIcon>
                )}
                <NavItemContainer menuOpen={menuOpen}>
                    <StyledNavItem to="/study">스터디</StyledNavItem>
                    <StyledNavItem to="/community/communityPage">커뮤니티</StyledNavItem>
                    {/* ... */}
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
                </NavItemContainer>
                {/* <StyledNavItemContainer>
                    <StyledNavItem to="/study">스터디</StyledNavItem>
                    <StyledNavItem to="/community/communityPage">커뮤니티</StyledNavItem>
                </StyledNavItemContainer> */}
                {/* <StyledLoginItemContainer>
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
                </StyledLoginItemContainer> */}
            </StyledContainer >
            <Divider></Divider>
        </>
    );
};


export default Header;

const Divider = styled.div`
    /* margin-top: 15px; */
    border-bottom: 1px solid ${colors.gray_stroke};
    @media (max-width: 768px) {
        margin-top: 10px;
    }
`;
const StyledContainer = styled.div`
    margin: 0 auto; /* 가운데 정렬을 위한 수정 */
    padding-top: 30px;
    width: 100%;
    max-width: 1270px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    @media (max-width: 768px) {
        width: 100%;
        padding-top: 20px;
        justify-content: space-between;
    }
`;

const StyledLogoContainer = styled.div`
    min-width: 100px;
    margin-right: 40px;
    ${TitleText}

    @media (max-width: 768px) {
        margin: 0 40px 0 20px;
    }
`;

const StyledLogo = styled(Link)`
    color: ${colors.main_navy};
    text-decoration: none;
`;

const OverlayBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

const CloseIcon = styled.div`
    position: absolute;
    top: 5px;
    right: 20px;
    font-size: 32px;
    cursor: pointer;
    z-index: 2;
`;

const StyledMenuIcon = styled.div`
    display: none; /* 큰 화면에서 숨김 */
    cursor: pointer;

    @media (max-width: 768px) {
        display: block; /* 화면이 줄어들 때 표시 */
        cursor: pointer;
        margin-right: 20px;
    }
`;

const MenuIconLine = styled.div`
    width: 25px;
    height: 3px;
    background-color: ${colors.main_navy};
    margin: 3px 0;
`;

const StyledNavItemContainer = styled.div``;

const StyledNavItem = styled(Link)`
    ${SubText};
    color: ${colors.main_black};
    margin: 20px;
    text-decoration: none;

    @media (max-width: 768px) {
        margin: 20px 20px 20px 0;
        &:first-child {
            margin: 0 20px 20px 0;  
        }
    }
`;
const StyledLoginItemContainer = styled.div`
    /* display: inline-block; */
    margin-left: auto;
    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin: 0;
        padding: 0;
    }
`;

const StyledLoginItem = styled(Link)`
    ${SubTextThinSmall};
    color: ${colors.main_gray};
    margin-left: 35px;
    text-decoration: none;

    @media (max-width: 768px) {
        margin: 20px 20px 20px 0;
    }
`;

const StyledLogOutButton = styled(Link)`
    ${SubTextThinSmall};
    color: ${colors.main_gray};
    margin-left: 35px;
    text-decoration: none;
    cursor: pointer;

    @media (max-width: 768px) {
        margin: 20px 20px 20px 0;
    }
`;
