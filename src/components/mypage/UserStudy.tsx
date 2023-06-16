import React from "react";
import { Typography, Grid } from "@mui/material";
import styled from "styled-components";

import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import StudyManageList from "../UI/StudyManageList";

//각 페이지컴포넌트 호출

const UserStudy = () => {
  return (
    <>
      <StyledTitle>개설스터디</StyledTitle>
      <StudyManageList />

      <StyledTitle>참여스터디</StyledTitle>
      <StudyManageList />
    </>
  );
};

const StyledTitle = styled(Typography)`
  && {
    ${fonts.SubTextBig}
    color:${colors.main_navy}
  }
`;
export default UserStudy;
