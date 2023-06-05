import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import CreateIcon from "@mui/icons-material/Create";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useState } from "react";

export const StudyTaps = () => {
  const navigate = useNavigate();
  const onClickTap = (event: any) => {
    if (event.target.id == "info") navigate("/study/info");
    else navigate("/study/feedback");
  };

  return (
    <StydyTap>
      <StydyTapText onClick={onClickTap} id="info">
        <CreateIcon />
        &nbsp;스터디정보
      </StydyTapText>
      <StydyTapText onClick={onClickTap} id="feedback">
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

  color: #9fefd3; /* 적절한 색상으로 변경 */
  &:hover {
    color: #00e595; /* 호버 시 변경할 색상 */
  }
`;
