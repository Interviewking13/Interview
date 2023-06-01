import React from "react";
import styled from "styled-components";

interface ListItemProps {
  text1: string;
  text2: string;
  imageSrc: string;
}

const ListItem: React.FC<ListItemProps> = ({ text1, text2, imageSrc }) => {
  return (
    <StyledListItem>
      <StyledImg src={imageSrc} alt="Icon" />
      <StyledSpan>{text1}</StyledSpan>
      <StyledSpanContent>{text2}</StyledSpanContent>
    </StyledListItem>
  );
};
const ApplyList: React.FC = () => {
  return (
    <ListContainer>
      <ListItem
        text1="진행기간"
        text2="23.05.02 ~ 23.08.01"
        imageSrc="./study-icon-img.png"
      />
      <ListItem
        text1="모집마감"
        text2="23.05.01"
        imageSrc="./study-icon-img.png"
      />
      <ListItem
        text1="모집인원"
        text2="3/10명"
        imageSrc="./study-icon-img.png"
      />
      <ListItem
        text1="스터디장"
        text2="정채진"
        imageSrc="./study-icon-img.png"
      />
    </ListContainer>
  );
};

export default ApplyList;

const StyledListItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* 원하는 마진 값 설정 */
`;

const StyledSpan = styled.span`
  font-size: 18px;
  margin-right: 70px; /* 원하는 마진 값 설정 */
`;

const StyledSpanContent = styled.span`
  font-size: 18px;
`;

const StyledImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 20px; /* 원하는 마진 값 설정 */
`;

const ListContainer = styled.span`
  width: 923px;
  border-bottom: 1px solid #dadada;
`;
