import styled from 'styled-components';
import { Link } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { DetailButton, DetailTitle } from './common/DetailTitle';
import { StudyTaps } from './common/StudyTap';
import React, { useEffect, useState } from 'react';
import { colors } from '../../constants/colors';
import { SubTextBig, TitleText, SubTextThin } from '../../constants/fonts';
import { getInfoStudyData } from '../../api/api-study';
import { SubmitButton } from './common/SubmitButton';
import { dateSplice } from '../../utils/dateFomatting';
import { useLocation } from 'react-router-dom';
import { Modal } from '@mui/material';
import StudyApplyModal from '../../components/modal/StudyApplyModal';
import { useQuery } from 'react-query';
import UserInfoModal from '../../components/modal/UserInfoModal';
import { getUserData } from '../../api/api-user';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../../hooks/useAuth';

const Information: React.FC = () => {
    const location = useLocation();
    const path = location.pathname;
    const lastPathSegment = path.substring(path.lastIndexOf('/') + 1);
    const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
    const [studyApplyModalOpen, setStudyApplyModalOpen] = useState(false);
    const [useId, setUserId] = useState('1');

    useEffect(() => {
        getUserData(String(localStorage.getItem('token'))).then((response) => {
            setUserId(response.data.user_id); //현재 유저 id
        });
    }, []);

    /** 모달창 오픈 */
    const handleOpenUserInfoModal = () => {
        setUserInfoModalOpen(true);
    };

    /** 모달창 클로즈 */
    const handleCloseUserInfoModal = () => {
        setUserInfoModalOpen(false);
    };

    const handleOpenStudyApplyModal = () => {
        setStudyApplyModalOpen(true);
    };

    const handleCloseStudyApplyModal = () => {
        setStudyApplyModalOpen(false);
    };

    /** 스터디 관리로 가는 함수 */
    const handleStudyManageButtonClick = () => {
        window.location.href = `/management/${_id}`;
    };

    const {
        data: studyData,
        isLoading,
        isError,
    } = useQuery(['studyData'], () => getInfoStudyData(lastPathSegment).then((response) => response.data));

    if (isLoading) {
        // 로딩 상태를 표시
        return <div>Loading...</div>;
    }

    if (isError) {
        // 에러 상태를 표시
        return <div>Error occurred while fetching data</div>;
    }

    const { title, content, start, end, chat_link, headcount, acceptcount, leader_name, leader_id, _id } = studyData;

    return (
        <Container>
            <MystudyContainer>
                <Mystudy>스터디 정보</Mystudy>
                <MystudySubtitle>스터디 상세 정보를 둘러보고 신청하세요.</MystudySubtitle>
            </MystudyContainer>
            <StyeldTapContainer>
                <StudyTaps />
                {useId === leader_id ? (
                    <StyledStudyManageButton onClick={handleStudyManageButtonClick}>
                        <SettingsIcon fontSize="large"></SettingsIcon>
                    </StyledStudyManageButton>
                ) : (
                    <div></div>
                )}
            </StyeldTapContainer>
            <Title>{title}</Title>
            <SubTitle>
                <DetailTitle
                    name="&nbsp;회의링크"
                    content={
                        <Link href={chat_link} target="_blank" rel="noopener" color="#00e595">
                            {chat_link}
                        </Link>
                    }
                ></DetailTitle>
                <DetailTitle name="&nbsp;진행 기간" content={`${dateSplice(start)} ~ ${dateSplice(end)}`}></DetailTitle>
                <DetailTitle name="&nbsp;인원" content={`${acceptcount} / ${headcount}명`}></DetailTitle>
                <DetailButton
                    name="&nbsp;스터디장"
                    content={leader_name}
                    onClick={handleOpenUserInfoModal}
                ></DetailButton>
                <Modal open={userInfoModalOpen} onClose={handleCloseUserInfoModal}>
                    <UserInfoModal userId={leader_id} handleModalClose={handleCloseUserInfoModal} />
                </Modal>
            </SubTitle>
            <Divider></Divider>
            <StudyIntro>
                <PeopleAltIcon />
                &nbsp;스터디 소개
            </StudyIntro>
            <InfoContent>{content}</InfoContent>
            {useId !== leader_id ? <SubmitButton onClick={handleOpenStudyApplyModal} /> : <></>}
            <Modal open={studyApplyModalOpen} onClose={handleCloseStudyApplyModal}>
                <StudyApplyModal studyId={lastPathSegment} handleModalClose={handleCloseStudyApplyModal} />
            </Modal>
        </Container>
    );
};

/** 전체 컨테이너 */
const Container = styled.div`
    margin: 0 auto;
    width: 1270px;
    display: flex;
    flex-direction: column;
`;

/** 스터디 정보 컨테이너 */
const MystudyContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: end;
`;

/** 스터디 정보 타이틀 */
export const Mystudy = styled.div`
    margin-top: 60px;
    ${TitleText};
    color: ${colors.main_navy};
    font-size: 32px;
    margin-right: 30px;
`;

/** 스터디 정보 세부 타이틀 */
const MystudySubtitle = styled.div`
    ${SubTextThin};
    color: ${colors.darkgray_navy};
`;
const InfoContent = styled.p`
    font-size: 20px;
    padding: 10px;
`;

/** 스터디 정보탭 컨테이너 */
const StyeldTapContainer = styled.div`
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

/** 스터디 관리버튼 */
const StyledStudyManageButton = styled.div`
    cursor: pointer;
`;

/** 스터디정보 타이틀 */
export const Title = styled.span`
    ${TitleText};
    color: ${colors.main_navy};
    font-size: 48px;
`;

const SubTitle = styled.div`
    display: flex;
    flex-direction: column;
    margin: 30px 0;
`;
const Divider = styled.div`
    margin-bottom: 20px;
    border-bottom: 1px solid ${colors.gray_stroke};
`;

/** 스터디 소개 */
const StudyIntro = styled.div`
    display: flex;
    margin: 10px 0px;
    ${SubTextBig};
    color: ${colors.main_navy};
`;

export default Information;
