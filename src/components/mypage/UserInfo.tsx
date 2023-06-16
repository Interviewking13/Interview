import React, { useState } from "react";

import { Typography, Grid, Box, Divider, IconButton } from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import { useQuery } from "react-query";
import { getUserData } from "../../api/api-user";
import AWS from "aws-sdk";

//1. s3 스토리지 플러그인가져오기
AWS.config.update({
  //스토리지인증키작성
  accessKeyId: "AKIA4WQLMJXFZI2K7J2F",
  secretAccessKey: "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",
  region: "ap-northeast-2",
});

const UserInfo = () => {
  const navigate = useNavigate();
  const onClickModify = () => {
    navigate("/mypage/userinfo/Modify"); // useNavigate 사용하여 페이지 이동
  };
  const token =
    localStorage.getItem("token") || ""; /**회원정보조회를 위한 토큰 가져오기*/
  const {
    data: userData,
    isLoading,
    isError,
  } = useQuery(["userData"], () => getUserData(token as string)); //useQuery로 getdata
  if (isLoading) {
    // 로딩 상태를 표시
    return <div>Loading...</div>;
  }
  if (isError) {
    // 에러 상태를 표시
    return <div>Error occurred while fetching token</div>;
  }
  // token 값을 활용하여 필요한 작업을 수행
  console.log("UserData", userData);
  const { user_name, phone_number, email, file_key, file_name, intro_yn } =
    userData?.data || {};

  const onClickfileDownload = () => {
    const s3 = new AWS.S3();
    const bucketName = "13team";

    const params = {
      Bucket: bucketName,
      Key: { file_key },
    };

    s3.getSignedUrl("getObject", params, (err, url) => {
      if (err) {
        console.error("Error generating download URL:", err);
        return;
      }
      console.log("Download URL:", url);
      // 생성된 다운로드 URL을 사용하거나, 이를 표시할 다이얼로그 또는 링크로 전달하여 사용자에게 제공합니다.
      window.open(url, "_blank");
    });
  };

  return (
    <StyledDiv>
      <Grid container rowSpacing={2} alignItems={"center"}>
        <Grid item xs={11.5}>
          <StyledSayHello noWrap>
            면접왕 <b>{user_name}</b> 님, 어서오세요.
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
              <StyledInfoValue> {email}</StyledInfoValue>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <StyledInfoText>연락처</StyledInfoText>
            </Grid>
            <Grid item>
              <StyledInfoValue>{phone_number}</StyledInfoValue>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <StyledInfoText>자기소개서</StyledInfoText>
            </Grid>
            <Grid item>
              <button onClick={onClickfileDownload}>{file_name}</button>
            </Grid>
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
