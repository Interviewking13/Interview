import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BoardListItemContainer from '../community/components/BoardListItemContainer';
import BestBoardListItemContainer from '../community/components/BestBoardListItemContainer';

const CommunityPage: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 검색하기 버튼 클릭 시 처리 로직
    // 입력된 검색어 활용 등
    console.log('Search');
  };

  const handleCreatePost = () => {
    navigate('/community/communityCreatePage');
  };


  return (
    <StyledCommonContainer>

      <StyledContainer>
        <StyledHeadContainer>
          <StyledTitle>커뮤니티</StyledTitle>
          <StyledText>회원들과 정보를 공유해보세요.</StyledText>
          <StyledSelect>
            <option value="all">전체</option>
            <option value="mypost">내가쓴글</option>
          </StyledSelect>
          <StyledSelect>
            <option value="popular">인기순</option>
          </StyledSelect>
          <StyledSearchContainer onSubmit={handleSearch}>
            <StyledSearchInput type="text" placeholder="검색하기" />
          </StyledSearchContainer>
          <StyledPostButton onClick={handleCreatePost}>글쓰기</StyledPostButton>
        </StyledHeadContainer>
        {/* 게시판 목록 컨테이너, 아이템 컴포넌트 불러오기 */}
        <BestBoardListItemContainer />
        <BoardListItemContainer />
      </StyledContainer>

    </StyledCommonContainer>
  );
};

const StyledCommonContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledHeadContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const StyledSearchContainer = styled.form`
  align-items: center;
  margin-right: 15px;
`;

const StyledTitle = styled.h2`
  height: fit-content;
  font-family: 'establish Retrosans';
  font-size: 32px;
  font-weight: 400;
  color: #00057D;
`;

const StyledText = styled.h2`
  margin: 0 85px 0 40px;
  font-size: 18px;
  font-weight: 300;
  color: #8689A3;
`;

const StyledSelect = styled.select`
  width: 133px;
  height: 45px;
  margin-right: 15px;
  border-radius: 10px;
  border: 1px solid #00057D;
  font-size: 18px;
  font-weight: 300;
  color: #00057D;
`;

const StyledSearchInput = styled.input`
  width: 325px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid #00057D;
  font-size: 18px;
  font-weight: 300;
  color: #C0C3E5;
  padding: 0;
  box-sizing: border-box;
`;

const StyledPostButton = styled.button`
  width: 132px;
  height: 45px;
  padding: 10px 20px;
  background-color: #00E595;
  color: #0E0E0E;
  font-size: 18px;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  cursor: pointer;
`;



export default CommunityPage;
