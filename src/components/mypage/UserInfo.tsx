import React, { useState } from "react";
import { Typography, Grid, Box, Divider, IconButton } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";

type userDate = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
};

const Dummy = {
  name: "박세진",
  email: "cobaltcyan.park@gmail.com",
  password: "tpwls1234",
  privacy_use_yn: "Y",
  marketing_use_yn: "N",
  intro_yn: "00030001_202305300019.pdf", // 또는 NULL
  phone_number: "010-4916-4244",
  admin_yn: false,
  dts_insert: "202305291250",
  dts_update: "202306100421",
};

const UserInfo = () => {
  const [userData, setUesrDate] = useState(Dummy);

  const navigate = useNavigate();
  const onClickModify = () => {
    navigate("/mypage/userinfo/Modify"); // useNavigate 사용하여 페이지 이동
  };

  return (
    <StyledDiv>
      <Grid container rowSpacing={2} alignItems={"center"}>
        <Grid item xs={11.5}>
          <StyledSayHello noWrap>
            면접왕 <b>{userData.name}</b> 님, 어서오세요.
          </StyledSayHello>
        </Grid>
        <Grid item xs={0.5}>
          <IconButton onClick={onClickModify}>
            <SettingsIcon />
          </IconButton>
          {/* 설정 버튼 UI */}
        </Grid>
      </Grid>
      <StyledLine></StyledLine>
      {/* 구분선 */}
      <StyledInfo container rowSpacing={2.5}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <StyledInfoText>아이디</StyledInfoText>
            </Grid>
            <Grid item>
              <StyledInfoValue> {userData.email}</StyledInfoValue>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <StyledInfoText>비밀번호</StyledInfoText>
            </Grid>
            <Grid item>
              <StyledInfoValue>{userData.password}</StyledInfoValue>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <StyledInfoText>연락처</StyledInfoText>
            </Grid>
            <Grid item>
              <StyledInfoValue>{userData.phone_number}</StyledInfoValue>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <StyledInfoText>자기소개서</StyledInfoText>
            </Grid>
            <Grid item>dasdsㅁㄴㅇㅁㄴ</Grid>
          </Grid>
        </Grid>
      </StyledInfo>
    </StyledDiv>
  );
};

export default UserInfo;

const StyledSayHello = styled(Typography)`
  && {
    ${fonts.SubTextBig};
    color: ${colors.main_navy};
    margin: 22px;
  }
`;

const StyledDiv = styled(Box)`
  && {
    border: 1px solid ${colors.main_navy};
    border-radius: 7px;
  }
`;

const StyledInfo = styled(Grid)`
  && {
    margin: 10px 0 22px 22px;
  }
`;
const StyledLine = styled(Divider)`
  && {
    border: 1px solid ${colors.main_navy};
  }
`;

const StyledInfoText = styled(Typography)`
  && {
    color: ${colors.darkgray_navy};
    ${fonts.SubTextThinSmall};
  }
`;
const StyledInfoValue = styled(Typography)`
  && {
    color: ${colors.main_navy};
    ${fonts.SubTextSmall};
  }
`;
