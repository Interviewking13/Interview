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
  padding: 10px 20px;
  border: 13px solid ${colors.darkgray_navy};
  border-radius: 10px;
`;
