import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../../constants/colors";
import BestBoardListItem from "./BestBoardListItem";

const BestBoardListItemContainer: React.FC = () => {
  return (
    <div>
      <StyledBestPostListItemBox>
        <StyledBestPostTitle>인기글(조회순)</StyledBestPostTitle>
        <BestBoardListItem />
      </StyledBestPostListItemBox>
    </div>
  );
};

export default BestBoardListItemContainer;

const StyledBestPostTitle = styled.div`
  font-size: 30px;
  border-bottom: 1px solid ${colors.gray_stroke};
`;

const StyledBestPostListItemBox = styled.div`
  padding: 0 20px;

  border: 13px solid ${colors.darkgray_navy};
  border-radius: 10px;
  margin-bottom: 15px;
`;
