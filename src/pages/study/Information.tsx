import styled from "styled-components";
import { Link } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { DetailButton, DetailTitle } from "./common/DetailTitle";
import { StudyTaps } from "./common/StudyTap";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { SubTextBig, TitleText } from "../../constants/fonts";
import { getInfoAllStudyData, getInfoStudyData } from "../../api/api-study";
import { SubmitButton } from "./common/SubmitButton";
import { dateSplice } from "../../utils/dateFomatting";
import { useLocation } from "react-router-dom";
import { Modal } from "@mui/material";
import StudyApplyModal from "../../components/modal/StudyApplyModal";
import { useQuery } from "react-query";
import UserInfoModal from "../../components/modal/UserInfoModal";
import { getUserData } from "../../api/api-user";
import SettingsIcon from "@mui/icons-material/Settings";
const Information: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const lastPathSegment = path.substring(path.lastIndexOf("/") + 1);
  const [userInfoModalOpen, setUserInfoModalOpen] = React.useState(false);
  const [studyApplyModalOpen, setStudyApplyModalOpen] = React.useState(false);
  const [useId, setUserId] = useState("1");
  const [leaderId, setLeaderId] = useState("2");

  useEffect(() => {
    getUserData(String(localStorage.getItem("token"))).then((response) => {
      console.log(response.data.user_id);
      setUserId(response.data.user_id);
    });
  }, []);
  useEffect(() => {
    getInfoStudyData(String(lastPathSegment)).then((response) => {
      console.log(response.data.leader_id);
      setLeaderId(response.data.leader_id);
    });
  }, []);
  const handleOpenUserInfoModal = () => {
    setUserInfoModalOpen(true);
  };

  const handleCloseUserInfoModal = () => {
    setUserInfoModalOpen(false);
  };

  const handleOpenStudyApplyModal = () => {
    setStudyApplyModalOpen(true);
  };

  const handleCloseStudyApplyModal = () => {
    setStudyApplyModalOpen(false);
  };

  const handleStudyManageButtonClick = () => {
    window.location.href = `/management/${_id}`;
  };

  const {
    data: studyData,
    isLoading,
    isError,
  } = useQuery(["studyData"], () =>
    getInfoStudyData(lastPathSegment).then((response) => response.data)
  );

  console.log(`path is: ${lastPathSegment}:`, studyData);
  const {
    title,
    status,
    content,
    start,
    end,
    chat_link,
    headcount,
    acceptcount,
    leader_name,
    leader_id,
    _id,
  } = studyData;

  if (isLoading) {
    // 로딩 상태를 표시
    return <div>Loading...</div>;
  }

  if (isError) {
    // 에러 상태를 표시
    return <div>Error occurred while fetching data</div>;
  }
  return (
    <Container>
      <Mystudy>스터디정보</Mystudy>
      <StyeldTapContainer>
        <StudyTaps />
        {useId === leaderId ? (
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
            <Link color="#00e595;" href="http://naver.com">
              {chat_link}
            </Link>
          }
        ></DetailTitle>
        <DetailTitle
          name="&nbsp;진행 기간"
          content={`${dateSplice(start)} ~ ${dateSplice(end)}`}
        ></DetailTitle>
        <DetailTitle
          name="&nbsp;인원"
          content={`${acceptcount} / ${headcount}명`}
        ></DetailTitle>
        <DetailButton
          name="&nbsp;스터디장"
          content={leader_name}
          onClick={handleOpenUserInfoModal}
        ></DetailButton>
        <Modal open={userInfoModalOpen} onClose={handleCloseUserInfoModal}>
          <UserInfoModal
            userId={leader_id}
            handleModalClose={handleCloseUserInfoModal}
          />
        </Modal>
      </SubTitle>
      <Divider></Divider>
      <StudyIntro>
        <PeopleAltIcon />
        &nbsp;스터디 소개
      </StudyIntro>
      <p>{content}</p>
      <SubmitButton onClick={handleOpenStudyApplyModal} />
      <Modal open={studyApplyModalOpen} onClose={handleCloseStudyApplyModal}>
        <StudyApplyModal
          studyId={lastPathSegment}
          handleModalClose={handleCloseStudyApplyModal}
        />
      </Modal>
    </Container>
  );
};
const Container = styled.div`
  margin: 0 auto;
  width: 1270px;
  display: flex;
  flex-direction: column;
`;

const StyeldTapContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const StyledStudyManageButton = styled.div`
  cursor: pointer;
`;

export const Title = styled.span`
  margin-top: 10px;
  ${TitleText};
  color: ${colors.main_navy};
  font-size: 48px;
`;
export const Mystudy = styled.span`
  margin-top: 20px;
  ${TitleText};
  color: ${colors.main_navy};
  font-size: 32px;
`;
const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
`;
const Divider = styled.div`
  margin: 15px 0px;
  border-bottom: 1px solid #000;
`;

const StudyIntro = styled.div`
  display: flex;
  margin: 10px 0px;
  ${SubTextBig};
  color: ${colors.main_navy};
`;
const StyledDetailTitle = styled(DetailTitle)`
  cursor: pointer;
  &.cursor-style {
    cursor: pointer;
  }
`;

export default Information;
