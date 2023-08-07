import { HTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import { Link } from "react-router-dom";

interface StyledCommonButtonProps extends HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
}

type StudyListProps = {
  key: number;
  title: string;
  manager: string;
  backgroundColor: string;
  children: React.ReactNode;
};

const onClick = ({}) => {};

const StudyManageList = ({
  key,
  title,
  manager,
  children,
  backgroundColor,
}: StudyListProps) => {
  return (
    <>
      <CardContainer key={key}>
        <CardContent>
          <StyledName>{title}</StyledName>
          <StyledDescription>{manager}</StyledDescription>
        </CardContent>
        <StyledCommonButton backgroundColor={backgroundColor} onClick={onClick}>
          {children}
        </StyledCommonButton>
      </CardContainer>
    </>
  );
};

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  color: ${colors.main_navy};
  @media screen and (max-width: 768px) {
    width: 100%;
    box-sizing: border-box;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 1123px;
  height: 45px;
  background-color: ${colors.back_navy}; /* 수정된 부분 */
  border-radius: 10px; /* 수정된 부분 */
  @media screen and (max-width: 768px) {
    width: 70%;
    height: 45px;
    align-items: center;
  }
`;

const StyledName = styled.p`
  ${fonts.SubTextBig}
  margin-right: 10px;
  margin-left: 20px;
  @media screen and (max-width: 768px) {
    width: 70%;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const StyledDescription = styled.p`
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
  @media screen and (max-width: 768px) {
    width: 25%;
  }
`;

export default StudyManageList;
