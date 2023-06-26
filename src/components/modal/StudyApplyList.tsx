import React from "react";
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";

/** 모달에 들어가는 리스트 아이템의 props 타입 지정 */
type ListItemProps = {
  textTitle: string;
  textContent: string;
  imageSrc: string;
};

/** 스터디 신청 모달에 들어가는 리스트 아이템 컴포넌트 props : (textTitle, textContent, imageSrc) */
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

/** 모달에 들어가는 리스트 아이템의 타입 지정 */
type ApplyListProps = {
  period: string;
  deadline: string;
  currentCount: number;
  headCount: number;
  studyLeader: string;
};

/** 스터디 신청 모달에 들어가는 리스트 컴포넌트 props : (period, deadline, currentCount, headCount, studyLeader) */
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
        // 현재인원 / 모집인원
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

/** 리스트 담는 컨테이너 */
const ListContainer = styled.span`
  width: 923px;
  border-bottom: 1px solid #dadada;
  margin-bottom: 20px;
`;

/** 리스트 아이템 */
const StyledListItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px; 
`;

/** 개요 span */
const StyledSpan = styled.span`
  margin-right: 70px; 
  font-family: ${fonts.SubTextThinSmall};
  font-size: 14px;
  color: ${colors.darkgray_navy};
`;

/** 내용 span */
const StyledSpanContent = styled.span`
  font-family: ${fonts.SubTextThinSmall};
  font-size: 14px;
`;

/** 사람모양 아이콘 img */
const StyledImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 20px; /* 원하는 마진 값 설정 */
`;

