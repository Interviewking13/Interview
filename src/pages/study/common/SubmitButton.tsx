import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import CreateIcon from "@mui/icons-material/Create";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useState } from "react";
import { colors } from "../../../constants/colors";
import { SubText } from "../../../constants/fonts";

export const SubmitButton = () => {
  return (
    <SubButtonContainer>
      <SubButton>신청하기</SubButton>
    </SubButtonContainer>
  );
};

const SubButton = styled.button`
  cursor: pointer;
  width: 132px;
  height: 45px;
  background-color: ${colors.main_mint};
  border: none;
  border-radius: 10px;
  &:hover {
    background-color: ${colors.main_navy}; /* 호버 시 변경할 색상 */
    color: white;
  }
  ${SubText}
`;

const SubButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
