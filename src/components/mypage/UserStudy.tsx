import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import styled from "styled-components";

import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import axios from "axios";
import StudyManageList from "../UI/StudyManageList";

const UserStudy = () => {
  const [studyList, setStudyList] = useState<any[]>([]);

  // const handle;
  const handleLeaveStudy = () => {};

  const getData = () => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      const initData = res.data.slice(0, 20).map((item: any) => {
        return {
          title: item.title,
          manager: item.userId,
          id: item.id,
        };
      });
      setStudyList(initData);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const filterMakedStudy = studyList.filter((item: any) => item.id >= 13);
  const filterEnteredStudy = studyList.filter((item: any) => item.id < 13);

  return (
    <StyledContainer>
      <StyledTitle>개설스터디</StyledTitle>
      {filterMakedStudy.map((item) => (
        <StudyManageList
          id={item.id}
          title={item.title}
          manager={item.manager}
          backgroundColor={colors.main_mint}
          children={"스터디 관리"}
        />
      ))}
      <StyledContent>
        <StyledTitle>참여스터디</StyledTitle>
      </StyledContent>
      {filterEnteredStudy.map((item) => (
        <StudyManageList
          id={item.id}
          title={item.title}
          manager={item.manager}
          backgroundColor={colors.main_red}
          children={"스터디 탈퇴"}
        />
      ))}
    </StyledContainer>
  );
};

const StyledTitle = styled(Typography)`
  && {
    ${fonts.SubTextBig}
    color:${colors.main_navy}
  }
`;
export default UserStudy;

const StyledContainer = styled.div`
  width: 1270px;
  margin-bottom: 200px;
`;
const StyledContent = styled.div`
  margin-top: 20px;
`;
