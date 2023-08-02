import React, { ChangeEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import LeftSignContainer from '../../components/auth/LeftSignContainer';
import { postSignIn } from '../../api/api-user';
import { useMutation, useQueryClient } from 'react-query';
import SearchIdModal from './SearchIdModal';
import SearchPasswordModal from './SearchPasswordModal';
import { useRecoilState } from 'recoil';
import { userDataAtom } from '../../recoil/userDataAtom';

// LoginPage 컴포넌트 선언
const LoginPage = () => {
    // 이메일 상태 추가(이메일 입력 필드의 값 관리)
    const [email, setEmail] = useState('');
    // 비밀번호 상태 추가(비밀번호 입력 필드의 값 관리)
    const [password, setPassword] = useState('');
    // 이메일 확인 상태 추가(이메일 오류 메시지 표시)
    const [emailError, setEmailError] = useState('');
    // 비밀번호 확인 상태 추가(비밀번호 오류 메시지 표시)
    const [passwordError, setPasswordError] = useState('');
    // 아이디 찾기 모달 상태 추가
    const [searchIdModalOpen, setSearchIdModalOpen] = useState(false);
    // 비밀번호 찾기 모달 상태 추가
    const [searchPasswordModalOpen, setSearchPasswordModalOpen] = useState(false);
    // navigate 훅 사용 (라우터 이동을 위한 함수)
    const navigate = useNavigate();
    // queryClient 사용 (쿼리 데이터 관리를 위한 객체)
    const queryClient = useQueryClient();
    const [userData, setUserData] = useRecoilState(userDataAtom);
    // 자동로그인 상태 추가
    const [autoLogin, setAutoLogin] = useState(false);

    // loginMutation 사용 (로그인 요청을 처리하는 mutation)
    const loginMutation = useMutation((credentials: { email: string; password: string }) =>
        postSignIn(credentials.email, credentials.password, '')
    );

    /** 로그인 버튼 클릭 시 동작 */
    const onClickSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            alert('모든 필드를 입력해 주세요.');
            return;
        }

        try {
            const response = await loginMutation.mutateAsync({ email, password });

            // 로그인 성공 시 토큰을 localStorage에 저장
            if (response && response.data.resultCode === '200') {
                localStorage.setItem('token', response.data.data.token);
                setUserData(response.data.data); // Recoil atom 값을 업데이트

                if (autoLogin) {
                    localStorage.setItem('autoLogin', 'true'); // localStorage에 'autoLogin' 키와 값 'true'를 저장
                } else {
                    localStorage.removeItem('autoLogin'); // autoLogin이 false일 경우, localStorage에서 'autoLogin' 키 제거
                }

                // 로그인 성공 시 토큰을 이용하여 자동 로그인 요청을 서버에 전송
                const autoLoginResponse = await postSignIn(email, password, response.data.data.token);
                // 자동 로그인 요청이 성공한 경우
                if (autoLoginResponse && autoLoginResponse.data.resultCode === '200') {
                    setUserData(autoLoginResponse.data.data); // 서버로부터 받은 사용자 데이터로 Recoil atom 값을 업데이트
                    navigate('/'); // 메인 페이지로 이동
                } else {
                    localStorage.removeItem('token'); // 자동 로그인 요청이 실패 시 localStorage에서 'token'을 제거, 로그아웃 상태로 설정
                }
            }

            // 로그인 실패 시 이메일 관련 오류 메시지 설정
            else if (response && response.data.resultCode === '400') {
                setEmailError(response.data.message);
                return;
            }

            // userData 쿼리를 다시 불러오기 위해 캐시를 무효화
            queryClient.invalidateQueries('userData');
            // 메인페이지로 이동
            navigate('/');
        } catch (passwordError) {
            // 비밀번호 오류 시 오류 메시지 설정
            setPasswordError('비밀번호를 확인하세요.');
            // 이메일 오류 메세지 초기화
            setEmailError('');
        }
    };

    /** 이메일 입력 값 변경 시 동작 */
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
        navigate('./signup');
    };

    /** 아이디 찾기 버튼 클릭 시 동작 */
    const openSearchIdModal = () => {
        setSearchIdModalOpen(true);
        setAutoLogin(false);
    };

    /** 아이디 찾기 닫기 버튼 클릭 시 동작 */
    const closeSearchIdModal = () => {
        setSearchIdModalOpen(false);
    };

    /** 비밀번호 찾기 버튼 클릭 시 동작 */
    const openSearchPasswordModal = () => {
        setSearchPasswordModalOpen(true);
        setAutoLogin(false);
    };

    /** 비밀번호 찾기 닫기 버튼 클릭 시 동작 */
    const closeSearchPasswordModal = () => {
        setSearchPasswordModalOpen(false);
    };

    return (
        <StyledPageContainer>
            <StyledCommonContainer>
                <StyledLoginContainer>
                    <LeftSignContainer />
                    <StyledRightSignContainer onSubmit={onClickSubmit}>
                        <StyledLoginInput type="email" placeholder="이메일" value={email} onChange={onChangeEmail} />
                        {emailError && <StyledErrorMessage>{emailError.toString()}</StyledErrorMessage>}
                        <StyledLoginInput
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={onChangePassword}
                        />
                        {passwordError && <StyledErrorMessage>{passwordError.toString()}</StyledErrorMessage>}
                        <StyledBtnWrapper>
                            <StyledSignupBtn variant="contained" color="primary" type="button" onClick={onClickSignup}>
                                회원가입
                            </StyledSignupBtn>
                            <StyledLoginBtn variant="contained" color="primary" type="submit">
                                로그인
                            </StyledLoginBtn>
                        </StyledBtnWrapper>
                        <StyledSearchUserInfo>
                            <StyledSearchId onClick={openSearchIdModal}>아이디 찾기</StyledSearchId>
                            <StyledSearchPassword onClick={openSearchPasswordModal}>비밀번호 찾기</StyledSearchPassword>
                        </StyledSearchUserInfo>
                        {searchIdModalOpen && <SearchIdModal closeModal={closeSearchIdModal} />}
                        {searchPasswordModalOpen && <SearchPasswordModal closeModal={closeSearchPasswordModal} />}
                        <StyledAutoLogin style={{ display: searchIdModalOpen || searchPasswordModalOpen ? 'none' : 'flex' }}>
                            <StyledAutoLoginCheckbox
                                type="checkbox"
                                checked={autoLogin}
                                onChange={(e) => setAutoLogin(e.target.checked)}
                            />
                            <StyledAutoLoginLabel>자동로그인</StyledAutoLoginLabel>
                        </StyledAutoLogin>
                    </StyledRightSignContainer>
                </StyledLoginContainer>
                <StyledSignupCopyright>Copyright © 2023 INTERVIEWKING All Rights Reserved.</StyledSignupCopyright>
            </StyledCommonContainer>
        </StyledPageContainer>
    );
};

/** 페이지 컨테이너 div (로그인 페이지 전체 배경색 지정) */
const StyledPageContainer = styled.div`
    background-color: ${colors.back_navy};
    
    @media (max-width: 768px) {
        padding: 0 20px;
    }
`;

/** 공통 컨테이너 div (가운데 정렬 및 레이아웃 크기 지정) */
const StyledCommonContainer = styled.div`
    width: 100%;
    max-width: 1270px;
    margin: 0 auto;
    padding-bottom: 30px;

    @media (max-width: 768px) {
        padding-top: 100px;
    }
`;

/** 로그인 컨테이너 div (좌/우 컴포넌트 가운데 정렬) */
const StyledLoginContainer = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        display: block;
        height: 100%;
    }
`;

/** 오른쪽 컴포넌트 컨테이너 div */
const StyledRightSignContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: auto;

    @media (max-width: 768px) {
        margin: 60px auto;
    }
`;

/** 이메일, 비밀번호 input */
const StyledLoginInput = styled.input`
    width: 457px;
    height: 45px;
    color: ${colors.main_black};
    border: 1px solid ${colors.gray_navy};
    border-radius: 10px;
    padding-left: 18px;
    font-weight: 300;
    font-size: 18px;
    &:last-of-type {
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

    @media (max-width: 768px) {
        width: 100%; 
        max-width: 457px;
        height: 40px;
        font-size: 16px;
    }
    @media (max-width: 500px) {
        width: calc(100% - 25px);
        border-radius: 5px;
        height: 35px;
        font-size: 14px;
    }
`;

/** 버튼 Wrapper form */
const StyledBtnWrapper = styled.form`
    display: flex;
    margin-top: 40px;
    margin-left: auto;

    @media (max-width: 768px) {
        margin-left: 0;
    }
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
    @media (max-width: 768px) {
        width: 110px !important;
        height: 40px !important;
        font-size: 14px !important;
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
    @media (max-width: 768px) {
        width: 110px !important;
        height: 40px !important;
        font-size: 14px !important;
    }
`;

/** 에러 메세지 */
const StyledErrorMessage = styled.p`
    color: ${colors.main_red};
    font-size: 14px;
    margin-left: auto;
    margin-top: 5px;
    margin-bottom: 0;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;

/** 카피라이터 */
const StyledSignupCopyright = styled.div`
    text-align: center;
    font-size: 14px;
    color: ${colors.gray_navy};

    @media (max-width: 768px) {
        font-size: 12px; 
  }
`;

/** 아이디/비밀번호 찾기 container div */
const StyledSearchUserInfo = styled.div`
    display: flex;
    justify-content: flex-start;
    margin-left: auto; /** 오른쪽 정렬시키기 */
    color: ${colors.darkgray_navy};
    font-size: 18px;
    font-weight: 300;
    margin-top: 40px;

    @media (max-width: 768px) {
        margin-left: 0;
        font-size: 14px;
    }
`;

/** 아이디 찾기 div */
const StyledSearchId = styled.div`
    cursor: pointer;`;

/** 비밀번호 찾기 div */
const StyledSearchPassword = styled.div`
    border-left: 1px solid ${colors.darkgray_navy};
    margin-left: 10px;
    padding-left: 10px;
    cursor: pointer;
`;

/** 자동로그인 컨테이너 div */
const StyledAutoLogin = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-left: auto;
    position: relative;

    @media (max-width: 768px) {
        margin-left: 0;
        font-size: 14px;
    }
`;

/** 자동로그인 체크박스 input */
const StyledAutoLoginCheckbox = styled.input`
    margin-right: 10px;

    /* 체크박스 커스텀 스타일 */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border: 2px solid ${colors.main_mint};
    border-radius: 4px;
    outline: none;
    cursor: pointer;

    /* 체크박스가 체크된 상태일 때의 스타일 */
    &:checked {
        background-color: ${colors.main_mint};
        border: 2px solid ${colors.main_mint};
    }

    /* 체크박스 커스텀 스타일에서 체크 표시 추가 */
    &:checked:before {
        content: '';
        display: block;
        position: absolute;
        top: 5px;
        left: 11px;
        width: 5px;
        height: 10px;
        border: solid ${colors.main_black};
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        z-index: 1;
    }
`;

/** 자동로그인 레이블 */
const StyledAutoLoginLabel = styled.label`
    color: ${colors.darkgray_navy};
    font-size: 18px;
    font-weight: 300;

    @media (max-width: 768px) {
        font-size: 14px;
    }
`;

export default LoginPage;
