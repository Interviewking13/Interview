import React from "react";
import styled from "styled-components";

type ListItemProps = {
  text1: string;
  text2: string;
  imageSrc: string;
};

const ListItem: React.FC<ListItemProps> = ({ text1, text2, imageSrc }) => {
  return (
    <StyledListItem>
      <StyledImg src={imageSrc} alt="Icon" />
      <StyledSpan>{text1}</StyledSpan>
      <StyledSpanContent>{text2}</StyledSpanContent>
    </StyledListItem>
  );
};

type ApplyListProps = {
  period: string;
  deadline: string;
  currentCount: number;
  headCount: number;
  studyLeader: string;
};

const StudyApplyList: React.FC<ApplyListProps> = ({
  period,
  deadline,
  currentCount,
  headCount,
  studyLeader,
}) => {
  return (
    <ListContainer>
      <ListItem
        text1="진행기간"
        text2={period}
        imageSrc="./study-icon-img.png"
      />
      <ListItem
        text1="모집마감"
        text2={deadline}
        imageSrc="./study-icon-img.png"
      />
      <ListItem
        text1="모집인원"
        text2={`${currentCount}/${headCount}명`}
        imageSrc="./study-icon-img.png"
      />
      <ListItem
        text1="스터디장"
        text2={studyLeader}
        imageSrc="./study-icon-img.png"
      />
    </ListContainer>
  );
};

export default StudyApplyList;

const StyledListItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* 원하는 마진 값 설정 */
`;

const StyledSpan = styled.span`
  font-size: 14px;
  margin-right: 70px; /* 원하는 마진 값 설정 */
`;

const StyledSpanContent = styled.span`
  font-size: 12px;
`;

const StyledImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 20px; /* 원하는 마진 값 설정 */
`;

const ListContainer = styled.span`
  width: 923px;
  border-bottom: 1px solid #dadada;
  margin-bottom: 20px;
`;
