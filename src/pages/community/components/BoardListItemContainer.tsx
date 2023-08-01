import React from "react";
import styled from "styled-components";
import BoardListItem from "../../community/components/BoardListItem";

interface BoardListItemContainerProps {
  tap: number;
}

const BoardListItemContainer: React.FC<BoardListItemContainerProps> = ({
  tap,
}) => {
  return (
    <div>
      <StyledPostListItemBox>
        <BoardListItem tap={tap} />
      </StyledPostListItemBox>
    </div>
  );
};

export default BoardListItemContainer;

const StyledPostListItemBox = styled.div`
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;
