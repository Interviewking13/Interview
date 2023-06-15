import { HTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import { Link } from "react-router-dom";

interface StyledCommonButtonProps extends HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
}

const items = [
  {
    title: "아으 다롱디리 으으ㅏㅇ아으",
    manager: "이병욱",
    children: "스터디관리",
  },
];

const onDelete = () => {};

const StudyManageList = () => {
  return (
    <>
      {items.map((item, index) => (
        <CardContainer key={index}>
          <CardContent>
            <StyledName>{item.title}</StyledName>
            <StyledDescription>{item.manager}</StyledDescription>
          </CardContent>
          <StyledCommonButton
            backgroundColor={colors.main_red}
            onClick={onDelete}
          >
            {item.children}
          </StyledCommonButton>
        </CardContainer>
      ))}
    </>
  );
};

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  color: ${colors.main_navy};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  background-color: ${colors.back_navy}; /* 수정된 부분 */
  border-radius: 10px; /* 수정된 부분 */
`;

const StyledName = styled.p`
  ${fonts.SubTextBig}
  margin-right: 10px;
  margin-left: 20px;
`;

const StyledDescription = styled.p`
  flex-grow: 1;
  margin-right: 10px;
  margin-left: 100px;
  ${fonts.SubTextThin}
`;

const StyledCommonButton = styled.div<StyledCommonButtonProps>`
  cursor: pointer;
  margin-left: 20px;
  width: 132px;
  height: 45px;
  background-color: ${(props) => props.backgroundColor};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  &:hover {
    background-color: ${colors.main_navy};
    color: white;
  }
  ${fonts.SubText}
`;

export default StudyManageList;
