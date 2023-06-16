import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../../constants/colors";
import * as fonts from "../../../constants/fonts";

//각 페이지컴포넌트 호출

interface StudyManageMainProps {
  activePage: string;
  onClickStudyModify: () => void;
  onClickMemberManagement: () => void;
  onClickApplicantList: () => void;
}

const StudyManageMain: React.FC<StudyManageMainProps> = ({
  activePage,
  onClickStudyModify,
  onClickMemberManagement,
  onClickApplicantList,
}) => {
  return (
    <>
      <CommonContainer>
        <StyledTitleTextButton onClick={onClickStudyModify}>
          정보수정
        </StyledTitleTextButton>
        <StyledTitleTextCenterButton onClick={onClickMemberManagement}>
          회원관리
        </StyledTitleTextCenterButton>
        <StyledTitleTextButton onClick={onClickApplicantList}>
          신청목록
        </StyledTitleTextButton>
      </CommonContainer>
    </>
  );
};

export default StudyManageMain;

const CommonContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
  font-family: ${fonts.SubTextThinSmall};
  display: flex;
`;
const StyledTitleTextButton = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600px;
  cursor: pointer;
  background-color: ${colors.main_white};
  ${fonts.TitleText}
  color: ${colors.main_yellow};
  transition: background-color 1.5s ease, color 1.5s ease;

  &:hover {
    background-color: ${colors.main_mint};
    color: ${colors.main_white};
  }
`;
const StyledTitleTextCenterButton = styled.p`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600px;
  background-color: ${colors.main_white};
  cursor: pointer;
  ${fonts.TitleText}
  color: ${colors.main_yellow};
  border: 1px solid ${colors.gray_mint};
  border-top: 0px;
  border-bottom: 0px;
  transition: background-color 1.5s ease, color 1.5s ease;

  &:hover {
    background-color: ${colors.main_mint};
    color: ${colors.main_white};
  }
`;
