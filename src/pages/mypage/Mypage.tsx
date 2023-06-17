import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Typography, Grid, Box } from "@mui/material";
import { Create, Person, Checklist } from "@mui/icons-material"; //MUI icon import
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import MenuTapBtn from "../../components/UI/MenuTapBtn";

const Mypage = () => {
  const navigate = useNavigate();

  const onClickMypageMain = () => {
    navigate("/mypage"); // useNavigate 사용하여 페이지 이동
  };
  const onClickUserStudy = () => {
    navigate("/mypage/userstudy");
  };
  const onClickStudyApply = () => {
    navigate("/mypage/studyapply");
  };
  const onClickUserInfo = () => {
    navigate("/mypage/userInfo");
  };

  return (
    <StyledContainer>
      <StyledContent container spacing={1}>
        {/* 타이틀과 서브 타이틀 */}
        <Grid item xs={12}>
          <Grid container spacing={1.5} alignItems="baseline">
            <Grid item>
              <StyledTitle variant="text" onClick={onClickMypageMain}>
                마이페이지
              </StyledTitle>
            </Grid>
            <Grid item>
              <StyledSubTitle variant="subtitle1">
                나의 정보를 확인하세요.
              </StyledSubTitle>
            </Grid>
          </Grid>
        </Grid>

        {/* 버튼1, 버튼2, 버튼3 */}
        <Grid item xs={12}>
          <Grid container spacing={1} justifyContent="flex-start">
            <MenuTapBtn onClick={onClickUserStudy}>
              <Create />
              나의 스터디
            </MenuTapBtn>
            <MenuTapBtn onClick={onClickStudyApply}>
              <Checklist />
              스터디 신청
            </MenuTapBtn>
            <MenuTapBtn onClick={onClickUserInfo}>
              <Person />내 정보
            </MenuTapBtn>
          </Grid>
        </Grid>

        {/* 페이지 내용 */}
        <Grid item xs={12}>
          <Outlet />
        </Grid>
      </StyledContent>
    </StyledContainer>
  );
};
export default Mypage;

const StyledContainer = styled(Box)`
  && {
    width: 1270px;
    margin: 0 auto;
  }
`;
const StyledContent = styled(Grid)`
  && {
    margin-top: 40px;
  }
`;

const StyledTitle = styled(Button)`
  && {
    ${fonts.TitleText}
    color: ${colors.main_navy};
  }
`;

const StyledSubTitle = styled(Typography)`
  && {
    ${fonts.SubTextThin}
    color: ${colors.darkgray_navy};
  }
`;

//버튼 스타일
const StyledButton = styled(Button)`
  && {
    padding-left: 0;
    ${fonts.SubTextBig}
    color: ${colors.gray_mint}; /* 적절한 색상으로 변경 */
    &:hover {
      color: ${colors.main_mint}; /* 호버 시 변경할 색상 */
    }
    &:active {
      background-color: #0000ff; /* 선택 시 변경할 색상 */
    }
  }
`;
