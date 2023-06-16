import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../../constants/colors";
import BestBoardListItem from "./BestBoardListItem";
import { SubTextBig, SubTextThin } from "../../../constants/fonts";
interface BoardListItemContainerProps {
  tap: number;
}

const BestBoardListItemContainer: React.FC<BoardListItemContainerProps> = ({
  tap,
}) => {
  return (
    <div>
      {tap === 1 ? (
        <StyledBestPostListItemBox>
          <StyledPostItems>
            <StyledBestTitle>인기 글</StyledBestTitle>
            <StyledRightPostItem>
              <StyledPostItem>댓글</StyledPostItem>
              <StyledPostItem>조회</StyledPostItem>
              <StyledPostItem>작성자</StyledPostItem>
              <StyledPostItem>게시일</StyledPostItem>
            </StyledRightPostItem>
          </StyledPostItems>
          <BestBoardListItem tap={tap} />
        </StyledBestPostListItemBox>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default BestBoardListItemContainer;

const StyledBestTitle = styled.div`
  ${SubTextBig};
  width: 430px;
  color: ${colors.main_mint};
  padding: 10px 20px;
`;

const StyledPostItems = styled.div`
  border-bottom: 1px solid ${colors.main_navy};
  cursor: pointer;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledBestPostListItemBox = styled.div`
  border: 1px solid ${colors.main_navy};
  border-radius: 10px;
  margin-bottom: 15px;
`;

export const StyledLeftPostItem = styled.div``;

const StyledRightPostItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledPostItem = styled.div`
  width: 100px;
  color: ${colors.darkgray_navy};
  ${SubTextThin};
  margin-left: 20px;
`;
