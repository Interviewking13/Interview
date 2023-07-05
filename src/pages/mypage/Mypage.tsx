import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Typography, Grid } from "@mui/material";
import { Create, Person, Checklist } from "@mui/icons-material"; //MUI icon import
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import MenuTapBtn from "../../components/UI/MenuTapBtn";
import { getUserData } from "../../api/api-user";

const Mypage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    onClickUserStudy();
  }, []);

  /** 탭버튼 페이지 이동 */
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
      <StyledTitleContainer>
        <StyledTitle variant="text" onClick={onClickUserStudy}>
          마이페이지
        </StyledTitle>
        <StyledSubTitle variant="subtitle1">
          나의 정보를 확인하세요.
        </StyledSubTitle>
      </StyledTitleContainer>

      {/* 메뉴컴포넌트가 그리드로 작업되어서 그대로 남았음, 추후 변경 가능 */}
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

      <Outlet />
    </StyledContainer>
  );
};
export default Mypage;

/**페이지 전체 사이즈 및 정렬 */
const StyledContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
  padding-top: 40px;
`;

/** 타이틀 컨테이너 */
const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: low;
  align-items: center;
`;

/** 마이페이지 타이틀 텍스트 버튼 */
const StyledTitle = styled(Button)`
  && {
    ${fonts.TitleText}
    color: ${colors.main_navy};
    margin-right: 15px;
  }
`;

/** 서브타이틀 스타일 */
const StyledSubTitle = styled(Typography)`
  && {
    ${fonts.SubTextThin}
    color: ${colors.darkgray_navy};
  }
`;
