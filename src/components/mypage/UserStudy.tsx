import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import styled from "styled-components";

import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import axios from "axios";
import StudyManageList from "../UI/StudyManageList";

//각 페이지컴포넌트 호출

const UserStudy = () => {
  const [makedStudy, setMakedStudy] = useState([]);
  const [enteredStudy, setEnteredStudy] = useState([]);

  const getData = () => {
    const res = axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {});
    const initData = res.slice(0, 20).map((item) => {
      return {
        title: item.title,
        manager: userId,
        key: id,
      };
    });
    console.log(initData);
  };
  useEffect(() => {
    getData();
  }, []);

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
