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
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const StyledPostItems = styled.div`
  border-top: none;
  border-radius: 5px;
  background-color: ${colors.dark_navy};
  cursor: pointer;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 350px;
  }
`;

const StyledBestPostListItemBox = styled.div`
  border: 1px solid ${colors.main_navy};
  border-radius: 5px;
  margin-bottom: 15px;
  border-top: none;
  @media screen and (max-width: 768px) {
    width: 350px;
  }
`;

const StyledRightPostItem = styled.div`
  margin-left: auto;
  display: flex;
  justify-content: space-between;
`;

const StyledPostItem = styled.div`
  width: 100px;

  color: ${colors.main_mint};
  ${SubTextThin};
  margin-right: 27px;
  font-weight: 700;

  &:nth-child(3) {
    margin-right: 25px;
  }
  &:nth-child(4) {
    margin-right: 16px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
  font-size: 16px;
`;

// @media screen and (max-width: 360px) {
//   display: ${({ className }) => (className === "hidden" ? "none" : "block")};
// }
