import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import CreateIcon from "@mui/icons-material/Create";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useState } from "react";
import { colors } from "../../../constants/colors";
import { TitleText } from "../../../constants/fonts";

export const StudyTaps = () => {
  const location = useLocation();
  const path = location.pathname;
  const lastPathSegment = path.substring(path.lastIndexOf("/") + 1);
  const navigate = useNavigate();
  const onClickTap = (value: string) => {
    navigate(`/study/${value}`);
  };

  return (
    <StydyTap>
      <StydyTapText onClick={() => onClickTap(`${lastPathSegment}`)}>
        <CreateIcon />
        &nbsp;스터디정보
      </StydyTapText>
      <StydyTapText onClick={() => onClickTap(`feedback/${lastPathSegment}`)}>
        <PeopleAltIcon />
        &nbsp;피드백
      </StydyTapText>
    </StydyTap>
  );
};

const StydyTap = styled.div`
  margin-top: 10px;
  display: flex;
`;

const StydyTapText = styled.button`
  cursor: pointer;
  display: flex;
  font-size: 20px;
  font-weight: 800;
  border: none;
  background: none;
  &:not(:first-child) {
    margin-left: 30px;
  }
  color: ${colors.main_mint};
  &:hover {
    color: skyblue; /* 호버 시 변경할 색상 */
  }

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;
