import Box from '@mui/material/Box';
import styled from 'styled-components';
import StudyApplyList from './StudyApplyList';
import { Link } from 'react-router-dom';
import { dateFomatting, dateSplice } from '../../utils/dateFomatting';
import { TitleText } from '../../constants/fonts';
import { colors } from '../../constants/colors';
import React, { ChangeEvent, useState } from 'react';
import { HTMLAttributes } from 'react';
import * as fonts from '../../constants/fonts';
import { getInfoStudyData, postApplyStudy } from '../../api/api-study';
import { useQuery } from 'react-query';
import { useAuth } from '../../hooks/useAuth';
<<<<<<< HEAD
=======
import InfoMessage from '../UI/InfoMessage';
>>>>>>> c9398ff93cbb1400dd5b7530b24d44a0a751a160

/** 스터디 신청 모달에 전달되는 props 타입지정 */
type StudyApplyModalProps = {
    studyId: string;
    handleModalClose: () => void;
};

/** 스터디 신청 모달 컴포넌트 props : (studyId, handleModalClose) */
const StudyApplyModal: React.FC<StudyApplyModalProps> = ({ studyId, handleModalClose }) => {
    useAuth();
    // 신청 목표 상태관리
    const [goal, setGoal] = useState('');
    // 취소버튼 이미지 링크
    const imageSrc = '/cancel-button.png';

    /** 스터디 데이터를 리액트 쿼리로 받아옴 */
    const {
        data: studyData,
        isLoading,
        isError,
    } = useQuery('studyData', () => getInfoStudyData(studyId).then((response) => response.data));

    //받아온 스터디의 데이터들을 분해구조 할당
    const {
        title,
        start,
        end,
        deadline,
        headcount,
        acceptcount,
        study_id,
        leader_name,
        study_name,
        content,
        chat_link,
        status,
    } = studyData;

    /** 신청 목표 체인지 핸들러  */
    const handleGoalChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setGoal(event.target.value);
    };

    /** 모달 닫는 핸들러 */
    const handleCloseModal = () => {
        handleModalClose();
    };

    /** 스터디 신청 버튼 핸들러 */
    const onApplyButtonHandler = () => {
        // 스터디 신청 버튼 클릭시 로컬스토리지에서 토큰을 가져와서 스터디 신청 api 요청 -> alert -> 모달 종료 -> 재랜더링
        postApplyStudy(String(localStorage.getItem('token')), studyId, goal);
        alert('스터디가 신청되었습니다!');
        handleModalClose();
        //information에서 정보 재랜더링 해야함 쿼리로.
    };

    if (isLoading) {
        // 로딩 상태를 표시
<<<<<<< HEAD
        return <div>Loading...</div>;
=======
        return <InfoMessage message="Loading..." />;
>>>>>>> c9398ff93cbb1400dd5b7530b24d44a0a751a160
    }

    if (isError) {
        // 에러 상태를 표시
<<<<<<< HEAD
        return <div>Error occurred while fetching data</div>;
=======
        return <InfoMessage message="Error occurred while fetching data" />;
>>>>>>> c9398ff93cbb1400dd5b7530b24d44a0a751a160
    }

    return (
        <div>
            <StyledBox>
                <StyledContainer>
                    <StyledTopContainer>
                        <StyledTitleText>스터디 신청하기</StyledTitleText>
                        <StyledCancelButton onClick={handleCloseModal}>
                            <CancelButtonImage src={imageSrc} alt="Cancel Button" />
                        </StyledCancelButton>
                    </StyledTopContainer>
                    <StyledTitleTextNavy>{title}</StyledTitleTextNavy>
                    <StudyApplyList
                        period={`${dateSplice(start)} ~ ${dateSplice(end)}`}
                        deadline={dateFomatting(deadline)}
                        currentCount={acceptcount}
                        headCount={headcount}
                        studyLeader={leader_name}
                    />
                    <TextInput
                        placeholder="한 줄 소개를 입력해 주세요. (60자 이내)"
                        value={goal}
                        onChange={handleGoalChange}
                    />
                    <StyledBottom>
                        <BottomContainer>
                            <StyledP>스터디장의 승인 후 가입이 가능합니다.</StyledP>
                            <InfoContainer>
                                <StyledP>
                                    신청 시 입력한 한 줄 소개와 등록된 자기소개서가 스터디장에게 발송됩니다.
                                </StyledP>
                                <StyledA to="/mypage/userinfo/Modify">자기소개서 등록을 안 하셨나요?</StyledA>
                            </InfoContainer>
                        </BottomContainer>
                        <StyledCommonButton backgroundColor={colors.main_mint} onClick={onApplyButtonHandler}>
                            <StyledButtonTextField>신청하기</StyledButtonTextField>
                        </StyledCommonButton>
                    </StyledBottom>
                </StyledContainer>
            </StyledBox>
        </div>
    );
};

export default StudyApplyModal;

/** 박스 mui(box)를 스타일드 컴포넌트 */
const StyledBox = styled(Box)`
    height: 594px;
    width: 1004px;
    background-color: #f1f4ff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    display: flex;
`;

/** 상단 컨테이너 div */
const StyledTopContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

/** 자기소개서 설명 컨테이너 div */
const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

/** 전체 컨테이너 div */
const StyledContainer = styled.div`
    margin: 40px;
    display: flex;
    flex-direction: column;
`;

/** 신청하기 제목 개요 p */
const StyledTitleText = styled.p`
    margin: 0px;
    margin-bottom: 22px;
    ${TitleText}
    color: ${colors.main_mint}
`;

/** 신청하기 제목 p */
const StyledTitleTextNavy = styled.p`
    margin: 0px;
    margin-bottom: 22px;
    ${TitleText}
    color: ${colors.main_navy}
`;

/** 입력란 textarea */
const TextInput = styled.textarea`
    padding: 10px 0 0 10px;
    width: 923px;
    height: 172px;
    border-radius: 10px;
    font-size: 18px;
`;

/** 자기소개서 설명 개요 p */
const StyledP = styled.p`
    font-size: 14px;
    margin: 0;
    margin-right: 10px;
`;

/** 자기소개서 링크 mul(link) */
const StyledA = styled(Link)`
    font-size: 14px;
    text-decoration: none;
    color: #000;
    text-decoration: underline;
`;

/** 취소 버튼 button */
const StyledCancelButton = styled.button`
    width: 23px;
    height: 23px;
    background: none;
    border: none;
    padding: 0;
    margin-left: auto;
    cursor: pointer; /* 클릭 커서 스타일 추가 */
`;

/** 취소 버튼 img */
const CancelButtonImage = styled.img`
    width: 100%;
    height: 100%;
`;

const BottomContainer = styled.div``;

/** 바텀 div */
const StyledBottom = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    font-family: ${fonts.SubTextThinSmall};
`;

/** 신청 버튼 컨테이너 타입지정 */
interface StyledCommonButtonProps extends HTMLAttributes<HTMLDivElement> {
    backgroundColor?: string;
}

/** 신청 버튼 컨테이너 div*/
const StyledCommonButton = styled.div<StyledCommonButtonProps>`
    margin-left: auto;
    cursor: pointer;
    width: 132px;
    height: 45px;
    color: ${colors.main_black};
    background-color: ${(props) => props.backgroundColor}; /* props로 전달받은 배경색을 사용 */
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 10px;
    &:hover {
        background-color: ${colors.main_navy};
        color: ${colors.main_white};
    }
    ${fonts.SubText}
`;

/** 신청하기 텍스트 p */
const StyledButtonTextField = styled.p`
    font-family: ${fonts.SubTextBig};
`;
