import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../../constants/colors";
import BoardListItem from "../../community/components/BoardListItem";

const BoardListItemContainer: React.FC = () => {
  return (
    <div>
      <StyledPostListItemBox>
        <BoardListItem />
      </StyledPostListItemBox>
    </div>
  );
};

export default BoardListItemContainer;

const StyledPostListItemBox = styled.div`
`;
