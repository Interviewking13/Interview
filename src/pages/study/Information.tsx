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

const Information: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const lastPathSegment = path.substring(path.lastIndexOf("/") + 1);
  const [userInfoModalOpen, setUserInfoModalOpen] = React.useState(false);
  const [studyApplyModalOpen, setStudyApplyModalOpen] = React.useState(false);

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

  const {
    data: studyData,
    isLoading,
    isError,
  } = useQuery("studyData", () =>
    getInfoStudyData(lastPathSegment).then((response) => response.data)
  );
  if (isLoading) {
    // 로딩 상태를 표시
    return <div>Loading...</div>;
  }

  if (isError) {
    // 에러 상태를 표시
    return <div>Error occurred while fetching data</div>;
  }

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
  } = studyData;
  return (
    <Container>
      <Mystudy>{status !== 0 ? "스터디정보" : "나의 스터디"}</Mystudy>
      <StudyTaps />
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
          content="이용섭"
          onClick={handleOpenUserInfoModal}
        ></DetailButton>
        <Modal open={userInfoModalOpen} onClose={handleCloseUserInfoModal}>
          <UserInfoModal
            studyId={lastPathSegment}
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
  margin: 30px 100px;
  display: flex;
  flex-direction: column;
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
