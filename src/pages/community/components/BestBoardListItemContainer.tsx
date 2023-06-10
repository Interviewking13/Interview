import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../../constants/colors';
import BestBoardListItem from './BestBoardListItem';

const BestBoardListItemContainer: React.FC = () => {
  return (
    <div>
      <StyledBestPostListItemBox>
        <StyledBestPostTitle>
          인기글
        </StyledBestPostTitle>
        <BestBoardListItem />
      </StyledBestPostListItemBox>
    </div>
  );
};

export default BestBoardListItemContainer;

const StyledBestPostTitle = styled.div`
`;

const StyledBestPostListItemBox = styled.div`
  padding: 0 20px;
  border: 1px solid ${colors.main_navy};
  border-radius: 10px;
  margin-bottom: 15px;
`;
