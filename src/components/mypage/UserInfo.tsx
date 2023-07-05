import React, { useState } from "react";

import { Typography, Grid, Box, Divider, IconButton } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import { useQuery } from "react-query";
import { getUserData } from "../../api/api-user";

const UserInfo = () => {
  const navigate = useNavigate();

  const onClickModify = () => {
    navigate("/");
  };

  return (
    <StyledDiv>
      <StyledLowContent>
        <StyledWelcome noWrap>면접왕 님, 어서오세요.</StyledWelcome>
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </StyledLowContent>

      {/* 구분선 */}
      <StyledLine></StyledLine>
      {/* 회원정보부분 */}
      <StyledInfo>
        <StyledLowContent>
          <StyledInfoText>아이디</StyledInfoText>
          <StyledInfoValue>면접왕</StyledInfoValue>
        </StyledLowContent>

        <StyledLowContent>
          <StyledInfoText>연락처</StyledInfoText>
          <StyledInfoValue>01023445678</StyledInfoValue>
        </StyledLowContent>

        <StyledLowContent>
          <StyledInfoText>자기소개서</StyledInfoText>
          <button>파일 버튼 텍스트 버튼</button>
        </StyledLowContent>
      </StyledInfo>
    </StyledDiv>
  );
};

export default UserInfo;
/** 인삿말 스타일:===님 환영합니다. */
const StyledWelcome = styled(Typography)`
  && {
    ${fonts.SubTextBig};
    color: ${colors.main_navy};
    margin: 22px;
    margin-right: 1000px;
  }
`;
/** 배경 테두리 */
const StyledDiv = styled.div`
  border: 1px solid ${colors.main_navy};
  border-radius: 7px;
`;
/** 구분선 */
const StyledLine = styled(Divider)`
  && {
    border: 1px solid ${colors.main_navy};
  }
`;
/** 테두리 내 여백 */
const StyledInfo = styled.div`
  margin: 10px 0 22px 22px;
`;

/** 각 요소 가로배열 */
const StyledLowContent = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: low;
  align-items: center;
  width: 1269px;
`;

/** 회원정보 요소 텍스트 스타일 */
const StyledInfoText = styled(Typography)`
  && {
    color: ${colors.darkgray_navy};
    ${fonts.SubTextThinSmall};
    width: 180px;
  }
`;
/** 회원정보 텍스트 스타일 */
const StyledInfoValue = styled(Typography)`
  && {
    color: ${colors.main_navy};
    ${fonts.SubTextSmall};
  }
`;
