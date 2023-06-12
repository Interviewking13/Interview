import styled from "styled-components";
import { StyledC, StyledText, StyledTitle } from "./CommunityPage";
import { useLocation } from "react-router-dom";
import { getDataByCommunity_noAndUser_id } from "../../api/api-community";
import { response } from "express";
import { useEffect, useState } from "react";

export const CommunityDetailPage: React.FC = () => {
  const [a, setA] = useState({
    content: "",
    title: "",
  });
  const location = useLocation();
  const path = location.pathname;
  const lastPathSegment = path.substring(path.lastIndexOf("/") + 1);
  console.log(lastPathSegment);

  useEffect(() => {
    getDataByCommunity_noAndUser_id(Number(lastPathSegment), "asd")
      .then((response) => {
        console.log(response.data.data.updateContent);
        setA(response.data.data.updateContent);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // getDataByCommunity_noAndUser_id(Number(lastPathSegment), "asd").then(
  //   (response) => {
  //     console.log(response.data);
  //   }
  // );
  return (
    <StyledCommonContainer>
      <StyledContainer>
        <StyledC>
          <StyledTitle>커뮤니티</StyledTitle>
          <StyledText>회원들과 정보를 공유해보세요.</StyledText>
        </StyledC>
        <Divider />
        <StyledTitlea>{a.content}</StyledTitlea>
        <StyledTitlea>{a.title}</StyledTitlea>
      </StyledContainer>
    </StyledCommonContainer>
  );
};
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCommonContainer = styled.div`
  width: 1270px;
  margin: 0px auto;
`;

const Divider = styled.div`
  margin-top: 10px;
  border: 1px solid black;
`;

const StyledTitlea = styled.div``;
