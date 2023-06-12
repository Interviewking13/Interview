import styled from "styled-components";
import React from 'react';
import StudyListItem from "../../components/study/StudyListItem";

import { colors } from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import PencilIconSrc from "../../img/pencil_mint.svg";
import { getInfoAllStudyData } from "../../api/api-study";
import { dateSplice } from "../../utils/dateFomatting";
import { Link } from "react-router-dom";

const StudyList = (): JSX.Element => {

  type StudyData = {
    _id: string,
    title: string,
    acceptcount: number,
    headcount: number,
    start: string,
    end: string,
    deadline: string,
    master: string
  }

  const [studyData, setStudyData] = React.useState<StudyData[]>([]);

  React.useEffect(() => {
    getInfoAllStudyData()
      .then((response) => {
        console.log(response.data);
        setStudyData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
      <CommonContainer>
          <StyledStudyListTopArea>
              <StyledTitleText>스터디 개설하기</StyledTitleText>
              <StyledSubTextThin>만들고 싶은 스터디 정보를 입력하세요.</StyledSubTextThin>
          </StyledStudyListTopArea>

        <StyledStudyCreateArea>
          <StyledStudyCreateInputArea>
            <StyledStudyCreateText>스터디 이름</StyledStudyCreateText>
            <StyledStudyInput type="text" placeholder="스터디 이름을 입력하세요." />
          </StyledStudyCreateInputArea>
          <StyledStudyCreateInputAreaBig>
            <StyledStudyCreateText>스터디 소개</StyledStudyCreateText>
            <StyledStudyInputBig placeholder="스터디 설명을 입력하세요." />
          </StyledStudyCreateInputAreaBig>
          <StyledStudyCreateInputArea>
            <StyledStudyCreateText>회의 링크</StyledStudyCreateText>
            <StyledStudyInput type="text" placeholder="화상 회의 주소를 입력하세요." />
          </StyledStudyCreateInputArea>
          <StyledStudyCreateInputArea>
            <StyledStudyCreateText>진행 기간</StyledStudyCreateText>
            <StyledDateArea>
                <StyledStudyDate type="date" placeholder="스터디 이름을 입력하세요." />
                <StyledStudyDateText>~</StyledStudyDateText>
                <StyledStudyDate type="date" placeholder="스터디 이름을 입력하세요." />
            </StyledDateArea>
            
        </StyledStudyCreateInputArea>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>모집 마감일</StyledStudyCreateText>
          <StyledStudyDate type="date" placeholder="스터디 이름을 입력하세요." />
        </StyledStudyCreateInputArea>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>모집 인원</StyledStudyCreateText>
          <StyledStudyInput type="text" placeholder="스터디 이름을 입력하세요." />
        </StyledStudyCreateInputArea>

        <StyledStudyCreateBtnArea>
            <StyledLink to={`/study/create`}>
                <StyledCommonButton>
                    <StyledButtonText>만들기</StyledButtonText>
                </StyledCommonButton>
            </StyledLink>
        </StyledStudyCreateBtnArea>
       
        </StyledStudyCreateArea>
            
      </CommonContainer>
  );
};

export default StudyList;

const CommonContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
  font-family: ${fonts.SubTextThinSmall};
`;
const StyledStudyListTopArea = styled.div`
  margin: 50px 0 0 0;
  display: flex;
  align-items: baseline;
`;
const StyledTitleText = styled.p`
  height: fit-content;
  ${fonts.TitleText}
  color: ${colors.main_mint};
  margin: 0 30px 0 0;
  `;
const StyledSubTextThin = styled.p`
  width: 439px;
  height: fit-content;
  font-size: 18px;
  font-weight: light;
  color: ${colors.main_gray};
  margin: 0;
`;
const StyledStudyCreateArea = styled.div`
    height: 760px;
    margin: 20px 0 20px 0;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
`
const StyledStudyCreateInputArea = styled.div`
    height: 45px;
    display: flex;
    align-items: center;
`
const StyledStudyCreateInputAreaBig = styled.div`
    height: 400px;
    display: flex;
`
const StyledStudyCreateText = styled.p`
    width: 163px;
    margin: 0;
    font-family: ${fonts.SubText};
    padding: 10px 0;
    color: ${colors.main_gray};
`

const StyledStudyInput = styled.input`
    width: 1080px;
    height: 45px;
    border: solid 1px ${colors.main_navy};
    border-radius: 10px;
    margin: 0;
    padding-left: 20px;
    font-family: ${fonts.SubTextThinSmall};
`
const StyledDateArea = styled.div`
    width: 1103px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const StyledStudyDateText = styled.p`
    margin: 0;
    font-family: ${fonts.SubText};
    color: ${colors.main_gray};
`
const StyledStudyDate = styled.input`
    width: 447px;
    height: 45px;
    border: solid 1px ${colors.main_navy};
    border-radius: 10px;
    margin: 0;
    padding: 0 20px 0 20px;
    font-family: sans-serif;
    font-size: 16px;
`
const StyledStudyInputBig = styled.textarea`
    width: 1082px;
    height: 380px;
    border: solid 1px ${colors.main_navy};
    border-radius: 10px;
    margin: 0;
    padding: 20px 0 0 20px;
    font-family: sans-serif;
    font-size: 16px;
    resize: none;

    ::-webkit-scrollbar {
      width: 20px; /* 스크롤바 너비 */
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${colors.darkgray_navy}; /* 스크롤바 색상 */
      border-radius: 20px; /* 스크롤바 둥글게 */
      margin-right: 20px;
      border: solid 6px white;
    }

    ::-webkit-scrollbar-track {
      width: 14px;
      background-color: none; /* 스크롤바 트랙 색상 */
      border-radius: 4px; /* 스크롤바 트랙 둥글게 */
    }
`

const StyledStudyCreateBtnArea = styled.div`
    width: 1270px;
    display: flex;
    flex-direction: row-reverse;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.main_black};
`
const StyledCommonButton = styled.div`
  width: 132px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${colors.main_mint};
`;
const StyledButtonText = styled.p`
  font-family: ${fonts.SubTextBig};
  color: ${colors.main_black};
`;