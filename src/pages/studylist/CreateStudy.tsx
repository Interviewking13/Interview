import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import StudyListItem from "../../components/study/StudyListItem";

import { colors } from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import PencilIconSrc from "../../img/pencil_mint.svg";
import { getInfoAllStudyData, postCreateStudy } from "../../api/api-study";
import { dateSplice } from "../../utils/dateFomatting";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const StudyList = (): JSX.Element => {

  const [error, setError] = useState("");
  const [studyData, setStudyData] = useState<StudyData[]>([]);
  const [studyName, setStudyName] = useState("");
  const [studyDescription, setStudyDescription] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [recruitmentDeadline, setRecruitmentDeadline] = useState("");
  const [recruitmentCount, setRecruitmentCount] = useState(0);
  const navigate = useNavigate();

  type StudyData = {
    _id: string,
    title: string,
    acceptcount: number,
    headcount: number,
    start: string,
    end: string,
    deadline: string,
    leader_name: string,
    study_name: string,
    content: string,
    chat_link: string,
    status: number
  }

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

  const handleCreateStudy = () => {
    // 입력 필드 확인
    if (
      !studyName ||
      !studyDescription ||
      !meetingLink ||
      !startDate ||
      !endDate ||
      !recruitmentDeadline ||
      recruitmentCount === 0
    ) {
      setError("모든 항목을 입력해주세요.");
      return;
    }

    const newStudyData: StudyData = {
      _id: "",
      study_name: studyName,
      title: studyName,
      content: studyDescription,
      deadline: recruitmentDeadline,
      acceptcount: 0,
      headcount: recruitmentCount,
      chat_link: meetingLink,
      status: 1,
      start: startDate,
      end: endDate,
      leader_name: ""
    };
    

    postCreateStudy(
      newStudyData.study_name,
      newStudyData.title,
      newStudyData.content,
      newStudyData.deadline,
      newStudyData.headcount,
      newStudyData.chat_link,
      newStudyData.status,
      newStudyData.start,
      newStudyData.end,
      newStudyData.leader_name
    )
      .then((response) => {
        if (response.data.success) {
          newStudyData._id = response.data.studyId;
          setStudyData((prevStudyData) => [newStudyData, ...prevStudyData]);
          // 스터디 목록 페이지로 이동
          navigate("/study");
        } else {
          setError("스터디 생성에 실패했습니다.");
        }
      })
      .catch((error) => {
        setError("오류가 발생했습니다.");
      });
  };

  return (
    <CommonContainer>
      
      <StyledStudyListTopArea>
          <StyledTitleText>스터디 개설하기</StyledTitleText>
          <StyledSubTextThin>만들고 싶은 스터디 정보를 입력하세요.</StyledSubTextThin>
      </StyledStudyListTopArea>

      <StyledStudyCreateArea>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>스터디 이름</StyledStudyCreateText>
          <StyledStudyInput type="text" placeholder="스터디 이름을 입력하세요." onChange={event => setStudyName(event.target.value)} />
        </StyledStudyCreateInputArea>
        <StyledStudyCreateInputAreaBig>
          <StyledStudyCreateText>스터디 소개</StyledStudyCreateText>
          <StyledStudyInputBig placeholder="스터디 설명을 입력하세요." onChange={event => setStudyDescription(event.target.value)} />
        </StyledStudyCreateInputAreaBig>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>회의 링크</StyledStudyCreateText>
          <StyledStudyInput type="url" placeholder="화상 회의 주소를 입력하세요." onChange={event => setMeetingLink(event.target.value)} />
        </StyledStudyCreateInputArea>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>진행 기간</StyledStudyCreateText>
          <StyledDateArea>
            <StyledStudyDate type="date" onChange={event => setStartDate(event.target.value)} />
            <StyledStudyDateText>~</StyledStudyDateText>
            <StyledStudyDate type="date" onChange={event => setEndDate(event.target.value)} />
          </StyledDateArea>
        </StyledStudyCreateInputArea>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>모집 마감일</StyledStudyCreateText>
          <StyledStudyDate type="date" onChange={event => setRecruitmentDeadline(event.target.value)} />
        </StyledStudyCreateInputArea>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>모집 인원</StyledStudyCreateText>
          <StyledStudyInputNumber type="number" min="1" placeholder="모집 인원을 입력하세요." onChange={event => setRecruitmentCount(parseInt(event.target.value))} />
        </StyledStudyCreateInputArea>
        <StyledStudyCreateBtnArea>
          <StyledLink to={`/study/create`} onClick={handleCreateStudy}>
            <StyledCommonButton>
              <StyledButtonText>만들기</StyledButtonText>
            </StyledCommonButton>
          </StyledLink>
          {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
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
const StyledStudyInputNumber = styled.input`
    width: 447px;
    height: 45px;
    border: solid 1px ${colors.main_navy};
    border-radius: 10px;
    margin: 0;
    padding: 0 20px 0 20px;
    font-family: sans-serif;
    font-size: 16px;
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
    align-items: baseline;
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

const StyledErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 0 15px 0 0;
`;