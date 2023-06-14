import React, { useState } from "react";
import { Button, Typography, Grid, Box } from "@mui/material";
import { Create, Person, Checklist } from "@mui/icons-material"; //MUI icon import
import { useNavigate } from "react-router-dom";
import StudyModify from "../../components/study/manage/StudyModify";
import StudyMemberManagement from "../../components/study/manage/StudyMemberManagement";
import StudyApplicantList from "../../components/study/manage/StudyApplicantList";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import { Link } from "react-router-dom";
import MenuTapBtn from "../../components/UI/MenuTapBtn";
const StudyManage = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("");

  const onClickStudyModify = () => {
    setActivePage("modify");
  };

  const onClickMemberManagement = () => {
    setActivePage("member");
  };

  const onClickApplicantList = () => {
    setActivePage("applicant");
  };

  return (
    <div>
      <CommonContainer>
        <StyledStudyListTopArea>
          <StyledTitleText>스터디 관리</StyledTitleText>
          <StyledSubTextThin>스터디 관리자 페이지입니다.</StyledSubTextThin>
        </StyledStudyListTopArea>
        {/* 버튼1, 버튼2, 버튼3 */}
        <Grid item xs={12}>
          <Grid container spacing={1} justifyContent="flex-start">
            <MenuTapBtn onClick={onClickStudyModify}>
              <Create />
              정보수정
            </MenuTapBtn>
            <MenuTapBtn onClick={onClickMemberManagement}>
              <Checklist />
              회원관리
            </MenuTapBtn>
            <MenuTapBtn onClick={onClickApplicantList}>
              <Person />
              신청목록
            </MenuTapBtn>
          </Grid>
        </Grid>
        {activePage === "modify" && <StudyModify />}
        {activePage === "member" && <StudyMemberManagement />}
        {activePage === "applicant" && <StudyApplicantList />}
      </CommonContainer>
    </div>
  );
};

export default StudyManage;

const CommonContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
  font-family: ${fonts.SubTextThinSmall};
`;

const StyledStudyListTopArea = styled.div`
  margin: 50px 0 0 0;
  display: flex;
  align-items: baseline;
`;
const StyledTitleText = styled.p`
  height: fit-content;
  ${fonts.TitleText}
  color: ${colors.main_mint};
  margin: 0 30px 0 0;
`;
const StyledSubTextThin = styled.p`
  width: 439px;
  height: fit-content;
  font-size: 18px;
  font-weight: light;
  color: ${colors.main_gray};
  margin: 0;
`;
