import React from "react";
import styled from "styled-components";
import BoardListItemContainer from "../community/components/BoardListItemContainer";
import BestBoardListItemContainer from "./components/BestBoardListItemContainer";
import CommunityTaps from '../community/components/CommunityTap';
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import SearchIconSrc from "../../img/search_navy.svg";
import { Link } from "react-router-dom";


const CommunityPage: React.FC = () => {

  return (
    <StyledCommonContainer>
      <StyledHeadContainer>
        <StyledTitle>커뮤니티</StyledTitle>
        <StyledText>회원들과 정보를 공유해보세요.</StyledText>
        <CommunityListInputArea>
          <StyledInput type="text" name="search" id="" placeholder="검색하기" />
          <StyledInputBtn>
            <StyledIcon src={SearchIconSrc} />
          </StyledInputBtn>
          <StyledLink to={`/community/communityCreatePage`}>
            <CommonButton>
              <ButtonText>글 쓰기</ButtonText>
            </CommonButton>
          </StyledLink>
        </CommunityListInputArea>
      </StyledHeadContainer>
      <CommunityTaps />
      {/* 게시판 목록 컨테이너, 아이템 컴포넌트 불러오기 */}
      <BestBoardListItemContainer />
      <BoardListItemContainer />
    </StyledCommonContainer>
  );
};

const StyledTitle = styled.div`
  height: fit-content;
  ${fonts.TitleText}
  color: ${colors.main_navy};
  margin: 0 30px 0 0;
`;

const StyledText = styled.div`
  width: 595px;
  height: fit-content;
  font-weight: light;
  color: ${colors.darkgray_navy};
  margin: 0;
  ${fonts.SubTextThin}
`;

export const StyledC = styled.div`
  margin-top: 20px;
  display: flex;
`;

const StyledCommonContainer = styled.div`
  width: 1270px;
  margin: 0px auto;
`;

const StyledHeadContainer = styled.div`
  margin: 50px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const StyledInput = styled.input`
  width: 325px;
  height: 45px;
  margin: 0;
  border: solid 1px ${colors.main_navy};
  box-sizing: border-box;
  border-radius: 10px;
  padding-left: 15px;
  color: ${colors.main_navy};
  ${fonts.SubTextThin}
`;

const StyledInputBtn = styled.button`
  background: none;
  border: none;
  margin-left: -70px;
  margin-top: 3px;
  cursor: pointer;
`;

const StyledIcon = styled.img`
  width: 27px;
  height: 27px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.main_black};
  transition: 0.3s;

  :hover {
    transform: scale(1.007);
    transition: 0.3s;
  }
`;

const CommunityListInputArea = styled.div`
  width: 472px;
  display: flex;
  justify-content: space-between;
`;

const CommonButton = styled.div`
  width: 132px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 10px;
  background-color: ${colors.main_mint};
  ${fonts.SubText}
`;

const ButtonText = styled.p`
  font-size: 18px;
  margin-top: 11px;
  border-radius: 10px;
`;

export default CommunityPage;
