import React from "react";
import { Typography, Grid, Box, Divider, IconButton } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";

const UserInfo = () => {
  const navigate = useNavigate();
  const onClickModify = () => {
    navigate("/mypage/userinfo/Modify"); // useNavigate 사용하여 페이지 이동
  };

  return (
    <StyledDiv>
      <Grid container xs={12}>
        <Grid item xs={11}>
          <StyledSayHello> 면접왕 준영님, 어서오세요. </StyledSayHello>
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={onClickModify}>
            <SettingsIcon />
          </IconButton>{" "}
          {/* 설정 버튼 UI */}
        </Grid>
      </Grid>
      <StyledLine></StyledLine>
      {/* 구분선 */}
      <StyledInfo container>
        <Grid item xs={12}>
          <Grid container rowSpacing={2}>
            <Grid item xs={1}>
              아이디
            </Grid>
            <Grid item>dasdsㅁㄴㅇㅁㄴ</Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1}>
              비밀번호
            </Grid>
            <Grid item>dasdsㅁㄴㅇㅁㄴ</Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1}>
              연락처
            </Grid>
            <Grid item>dasdsㅁㄴㅇㅁㄴ</Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1}>
              자기소개서
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
  ${fonts.SubTextBig}
`;

const StyledDiv = styled(Box)`
  border: 1px solid ${colors.main_navy};
  border-radius: 7px;
`;
const StyledTitle = styled(Grid)`
  align-items: center;
`;
const StyledInfo = styled(Grid)`
  margin: 24px;
`;
const StyledLine = styled(Divider)`
  border: 1px solid ${colors.main_navy};
`;
