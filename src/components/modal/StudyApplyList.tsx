import React from "react";
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
type ListItemProps = {
  textTitle: string;
  textContent: string;
  imageSrc: string;
};

const ListItem: React.FC<ListItemProps> = ({
  textTitle,
  textContent,
  imageSrc,
}) => {
  return (
    <StyledListItem>
      <StyledImg src={imageSrc} alt="Icon" />
      <StyledSpan>{textTitle}</StyledSpan>
      <StyledSpanContent>{textContent}</StyledSpanContent>
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
        textTitle="진행기간"
        textContent={period}
        imageSrc="/study-icon-img.png"
      />
      <ListItem
        textTitle="모집마감"
        textContent={deadline}
        imageSrc="/study-icon-img.png"
      />
      <ListItem
        textTitle="모집인원"
        textContent={`${currentCount}/${headCount}명`}
        imageSrc="/study-icon-img.png"
      />
      <ListItem
        textTitle="스터디장"
        textContent={studyLeader}
        imageSrc="/study-icon-img.png"
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
  margin-right: 70px; /* 원하는 마진 값 설정 */
  font-family: ${fonts.SubTextThinSmall};
  font-size: 14px;
  color: ${colors.darkgray_navy};
`;

const StyledSpanContent = styled.span`
  font-family: ${fonts.SubTextThinSmall};
  font-size: 14px;
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
