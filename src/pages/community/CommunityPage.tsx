import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BoardListItemContainer from "../community/components/BoardListItemContainer";
import BestBoardListItemContainer from "./components/BestBoardListItemContainer";

const CommunityPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 검색하기 버튼 클릭 시 처리 로직
    // 입력된 검색어 활용 등
    console.log("Search");
  };

  const handleCreatePost = () => {
    navigate("/community/communityCreatePage");
  };

  return (
    <StyledCommonContainer>
      <StyledContainer>
        <StyledHeadContainer>
          <StyledC>
            <StyledTitle>커뮤니티</StyledTitle>
            <StyledText>회원들과 정보를 공유해보세요.</StyledText>
          </StyledC>
          <StyledC>
            <StyledSearchContainer onSubmit={handleSearch}>
              <StyledSearchInput type="text" placeholder="검색하기" />
            </StyledSearchContainer>
            <StyledPostButton onClick={handleCreatePost}>
              글쓰기
            </StyledPostButton>
          </StyledC>
        </StyledHeadContainer>
        {/* 게시판 목록 컨테이너, 아이템 컴포넌트 불러오기 */}
        <BestBoardListItemContainer />
        <BoardListItemContainer />
      </StyledContainer>
    </StyledCommonContainer>
  );
};

export const StyledC = styled.div`
  margin-top: 20px;
  display: flex;
`;

const StyledCommonContainer = styled.div`
  width: 1270px;
  margin: 0px auto;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledHeadContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0;
`;

const StyledSearchContainer = styled.form`
  text-align: center;
`;

export const StyledTitle = styled.div`
  font-family: "establish Retrosans";
  font-size: 32px;
  color: #00057d;
`;

export const StyledText = styled.div`
  font-size: 18px;
  font-weight: 300;
  color: #8689a3;
  margin-left: 20px;
`;

const StyledSearchInput = styled.input`
  text-align: center;
  width: 325px;
  height: 45px;
  border-radius: 10px;
  border: 1px solid #00057d;
  font-size: 18px;
  font-weight: 300;
  color: #c0c3e5;
  padding: 0;
  box-sizing: border-box;
`;

const StyledPostButton = styled.button`
  width: 132px;
  height: 45px;
  padding: 10px 20px;
  background-color: #00e595;
  color: #0e0e0e;
  font-size: 18px;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  margin-left: 20px;
  cursor: pointer;
`;

export default CommunityPage;
