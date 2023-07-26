import Box from '@mui/material/Box';
import styled from 'styled-components';
import { HTMLAttributes } from 'react';
import * as fonts from '../../constants/fonts';
import { colors } from '../../constants/colors';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getUserData, getUserDataById } from '../../api/api-user';
import { useAuth } from '../../hooks/useAuth';
import InfoMessage from '../UI/InfoMessage';
import { FetchingSpinner, LoadingSpinner } from '../common/Spinners';

// 다운로드 이미지 링크
const downImageSrc = '/download.png';
// 취소 이미지 링크
const cancelImageSrc = '/cancel-button.png';

/** 자기소개서 모달 타입지정 */
type UserInfoModalProps = {
    userId: string;
    handleModalClose: () => void;
};

/** 자기소개서 모달 컴포넌트 props : (userId, handleModalClose) */
const UserInfoModal: React.FC<UserInfoModalProps> = ({ userId, handleModalClose }) => {
    useAuth();
    // 리액트 쿼리로 유저 데이터 userData에 저장
    const {
        data: userData,
        isLoading,
        isError,
        isFetching,
    } = useQuery(['userData'], () => getUserDataById(String(localStorage.getItem('token')), userId));

    // 유저 이름 상태 관리
    const [userName, setUserName] = useState('');
    // 유저 자기소개서 이름 상태 관리
    const [introName, setIntroName] = useState('');

    useEffect(() => {
        if (userData) {
            // userData 분해구조 할당
            const { user_name, user_id, email, intro_yn, phone_number, file_key, file_name } = userData.data;
            setUserName(user_name);
            setIntroName(file_name);
        }
    }, [userData]);

    /** 모달 닫기 핸들러 */
    const handleCloseModal = () => {
        handleModalClose();
    };

    /** 자기소개서 다운로드 버튼 핸들러 */
    const introDownloadButtonHandler = () => {
        // 파일 다운로드 구현
    };

    if (isLoading) {
        // 로딩 상태를 표시
        return <LoadingSpinner />;
    }

    if (isFetching) {
        // 로딩 상태를 표시
        return <FetchingSpinner />;
    }

    if (isError) {
        // 에러 상태를 표시
        return <InfoMessage message="Error occurred while fetching data" />;
    }

    return (
        <StyledBox>
            <StyledContainer>
                <StyledTopContainer>
                    <StyledContainerText>
                        <StyledTitleText color={colors.darkgray_navy}>
                            <StyledTitleText color={colors.main_mint}>{userName}</StyledTitleText>
                            {/* 자기소개서 유무에 따른 설명란 */}
                            {introName ? '님의' : '님은'}
                        </StyledTitleText>
                    </StyledContainerText>
                    <StyledCancelButton onClick={handleCloseModal}>
                        <CancelButtonImage src={cancelImageSrc} alt="Cancel Button" />
                    </StyledCancelButton>
                </StyledTopContainer>
                <StyledContainerText>
                    <StyledTitleText color={colors.darkgray_navy}>
                        <StyledTitleText color={colors.main_navy}>자기소개서</StyledTitleText>
                        {/* 자기소개서 유무에 따른 설명란 */}
                        {introName ? '입니다.' : '가 미작성된 회원입니다.'}
                    </StyledTitleText>
                </StyledContainerText>
                {/* 자기소개서 유무에 따라 버튼 활성화 */}
                {introName && (
                    <SubButtonContainer>
                        <StyledCommonButton backgroundColor={colors.main_mint} onClick={introDownloadButtonHandler}>
                            <StyledIntroTextField>{introName}</StyledIntroTextField>
                            <StyledDownloadImg src={downImageSrc} alt="downImage" />
                        </StyledCommonButton>
                    </SubButtonContainer>
                )}
            </StyledContainer>
        </StyledBox>
    );
};

export default UserInfoModal;

/** 최상단 Box */
const StyledBox = styled(Box)`
    height: 218px;
    width: 1004px;
    background-color: #f1f4ff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    display: flex;
`;

/** 전체 컨테이너 div */
const StyledContainer = styled.div`
    margin: 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

/** 상단 컨테이너 div */
const StyledTopContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

/** Text 컨테이너 div */
const StyledContainerText = styled.div`
    display: flex;
    align-items: center;
`;

/** 설명 및 내용 Text p */
const StyledTitleText = styled.p`
    margin: 0px;
    ${fonts.TitleText}
    color: ${(props) => props.color};
    display: inline-block;
    padding-right: 10px;
`;

/** 취소버튼 button */
const StyledCancelButton = styled.button`
    width: 23px;
    height: 23px;
    background: none;
    border: none;
    padding: 0;
    margin-left: auto;
    cursor: pointer; /* 클릭 커서 스타일 추가 */
`;

/** 취소버튼 img */
const CancelButtonImage = styled.img`
    width: 100%;
    height: 100%;
`;

/** StyledCommonButton 타입지정 */
interface StyledCommonButtonProps extends HTMLAttributes<HTMLDivElement> {
    backgroundColor?: string;
}

/** 자기소개서 다운 버튼 div */
const StyledCommonButton = styled.div<StyledCommonButtonProps>`
    cursor: pointer;
    height: 45px;
    background-color: ${(props) => props.backgroundColor}; /* props로 전달받은 배경색을 사용 */
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 10px;
    &:hover {
        background-color: ${colors.main_navy};
        color: white;
    }
    ${fonts.SubText}
`;

/** 자기소개서 text p */
const StyledIntroTextField = styled.p`
    color: ${colors.back_navy};
    ${fonts.SubTextThin}
    font-size: 16px;
    margin: 20px;
    min-width: 80px;
`;

/** 자기소개서 버튼 컨테이너 div */
const SubButtonContainer = styled.div`
    display: flex;
    margin-top: 30px;
    color: ${colors.main_mint};
`;

/** 자기소개서 버튼 컨테이너 div */
const StyledDownloadImg = styled.img`
    width: 16px;
    height: 16px;
    margin: 20px;
`;
