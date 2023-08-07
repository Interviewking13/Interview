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
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from '@mui/material';
import StudyApplyModal from '../../components/modal/StudyApplyModal';
import { useQuery } from 'react-query';
import UserInfoModal from '../../components/modal/UserInfoModal';
import { getUserData } from '../../api/api-user';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../../hooks/useAuth';
import InfoMessage from '../../components/UI/InfoMessage';
import { FetchingSpinner, LoadingSpinner } from '../../components/common/Spinners';
import { isLogin } from '../../hooks/isLogin';
import { getCurrentDate } from '../../utils/getCurrentDate';

/** 스터디 정보 컴포넌트 */
const Information: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const lastPathSegment = path.substring(path.lastIndexOf('/') + 1);
  const [userInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [studyApplyModalOpen, setStudyApplyModalOpen] = useState(false);
  const [useId, setUserId] = useState('');

  // 로그인 상태면 isUserLoggedIn===true
  const isUserLoggedIn = isLogin();

  // 리액트 쿼리 훅으로 유저 데이터 가져오기
  const {
    data: userData,
    isLoading: userDataLoading,
    isError: userDataError,
    isFetching: userDataFetching,
  } = useQuery('userData', () => getUserData(String(localStorage.getItem('token'))), {
    enabled: isUserLoggedIn, // 로그인 상태일 때만 useQuery 호출
  });

  // 리액트 쿼리 훅으로 스터디 데이터 가져오기
  const {
    data: studyData,
    isLoading: studyDataLoading,
    isError: studyDataError,
    isFetching: studyDataFetching,
  } = useQuery(['studyData'], () => getInfoStudyData(lastPathSegment).then((response) => response.data));

  // 데이터가 로딩 중이 아니고, 패칭중 아니고, 에러가 아닐 때에만 user_id를 설정합니다.
  useEffect(() => {
    if (!userDataLoading && !userDataError && !userDataFetching) {
      setUserId(userData.data.user_id);
    }
  }, [userDataLoading, userDataError, userDataFetching, userData]);

  /** 자기소개서 모달창 오픈 핸들러 */
  const handleOpenUserInfoModal = () => {
    setUserInfoModalOpen(true);
  };

  /** 자기소개서 모달창 클로즈 핸들러 */
  const handleCloseUserInfoModal = () => {
    setUserInfoModalOpen(false);
  };

  /** 스터디 신청 모달창 오픈 핸들러 */
  const handleOpenStudyApplyModal = () => {
    setStudyApplyModalOpen(true);
  };

  /** 스터디 신청 모달창 클로즈 핸들러 */
  const handleCloseStudyApplyModal = () => {
    setStudyApplyModalOpen(false);
  };

  /** 스터디 관리로 가는 함수 */
  const handleStudyManageButtonClick = () => {
    navigate(`/management/${_id}`);
  };

  if (userDataLoading) {
    // userData로딩 상태를 표시
    return <LoadingSpinner />;
  }

  if (userDataError) {
    // userData에러 상태를 표시
    return <InfoMessage message="UserDataError occurred while fetching data" />;
  }

  if (studyDataLoading) {
    // studyData로딩 상태를 표시
    return <LoadingSpinner />;
  }

  if (studyDataFetching && !studyApplyModalOpen) {
    // studyData패칭 상태를 표시
    return <FetchingSpinner />;
  }

  if (studyDataError) {
    // studyData에러 상태를 표시
    return <InfoMessage message="StudyDataError occurred while fetching data" />;
  }

  // 스터디 데이터 분해구조 할당
  const { title, content, start, end, chat_link, headcount, acceptcount, leader_name, leader_id, _id, deadline } =
    studyData;
  const currentDate = getCurrentDate();
  const fommattedEndDate = `20${dateSplice(end)}`.replaceAll('.', '-');
  const fommattedDeadlineDate = `20${dateSplice(deadline)}`.replaceAll('.', '-');
  // 스터디 종료 = true
  const isStudyClosed = fommattedEndDate < currentDate;
  // 모집 종료 = true
  const isRecruitmentClosed = fommattedDeadlineDate < currentDate;

  return (
    <Container>
      <MystudyContainer>
        <Mystudy>스터디 정보</Mystudy>
        <MystudySubtitle>스터디 상세 정보를 둘러보고 신청하세요.</MystudySubtitle>
      </MystudyContainer>
      <StyeldTapContainer>
        <StudyTaps />
        {/* 로그인 유저가 스터디장이면서 종료일이 안됐을 경우 보이도록 */}
        {useId === leader_id && !isStudyClosed ? (
          <StyledStudyManageButton onClick={handleStudyManageButtonClick}>
            <SettingsIcon fontSize="large"></SettingsIcon>
          </StyledStudyManageButton>
        ) : (
          <></>
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
      {/* 로그인 유저가 스터디장이 아니면서 모집마감일이 지나지 않았을 경우 보이도록*/}
      {useId !== leader_id && !isRecruitmentClosed ? <SubmitButton onClick={handleOpenStudyApplyModal} /> : <></>}
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
    @media screen and (max-width: 768px) {
        width: 350px;
        padding: 10px;
    }
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
    @media screen and (max-width: 768px) {
        font-size: 20px;
        white-space: nowrap;
    }
    /* @media screen and (max-width: 360px) {
    font-size: 20px;
    white-space: nowrap;
  } */
`;

/** 스터디 정보 세부 타이틀 */
const MystudySubtitle = styled.div`
    ${SubTextThin};
    color: ${colors.darkgray_navy};
    @media screen and (max-width: 768px) {
        display: none;
    }
`;
const InfoContent = styled.p`
    font-size: 20px;
    padding: 10px;
    @media screen and (max-width: 768px) {
        font-size: 12px;
    }
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

    @media screen and (max-width: 768px) {
        font-size: 24px;
    }
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
