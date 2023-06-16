import { HTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "../../../constants/colors";
import * as fonts from "../../../constants/fonts";
import { Link } from "react-router-dom";
import { deleteStudy, getInfoStudyData } from "../../../api/api-study";
import { useQuery } from "react-query";
import React, { useState, useEffect } from "react";
import { dateFomatting, dateFomattingLine } from "../../../utils/dateFomatting";

interface StudyModifyProps {
  studyId: string;
}
const StudyModify: React.FC<StudyModifyProps> = ({ studyId }) => {
  const {
    data: studyData,
    isLoading,
    isError,
  } = useQuery(["studyData"], () =>
    getInfoStudyData(studyId).then((response) => response.data)
  );
  const [studyName, setStudyName] = useState(""); // 스터디 이름 상태 추가
  const [studyDescription, setStudyDescription] = useState(""); // 스터디 설명 상태 추가
  const [meetingLink, setMeetingLink] = useState(""); // 회의 링크 상태 추가
  const [startDate, setStartDate] = useState(""); // 시작 날짜 상태 추가
  const [endDate, setEndDate] = useState(""); // 종료 날짜 상태 추가
  const [recruitmentDeadline, setRecruitmentDeadline] = useState(""); // 모집 마감일 상태 추가
  const [recruitmentCount, setRecruitmentCount] = useState(0); // 모집 인원 상태 추가

  useEffect(() => {
    if (studyData) {
      const { title, content, chat_link, start, end, deadline, headcount } =
        studyData;
      console.log(dateFomattingLine(start));
      setStudyName(title);
      setStudyDescription(content);
      setMeetingLink(chat_link);
      setStartDate(dateFomattingLine(start));
      setEndDate(dateFomattingLine(end));
      setRecruitmentDeadline(dateFomattingLine(deadline));
      setRecruitmentCount(headcount);
    }
  }, [studyData]);
  if (isLoading) {
    // 로딩 상태를 표시
    return <div>Loading...</div>;
  }

  if (isError) {
    // 에러 상태를 표시
    return <div>Error occurred while fetching data</div>;
  }
  const handleModifyClick: React.MouseEventHandler<HTMLDivElement> = () => {
    // 스터디 수정 로직을 처리하는 코드를 작성하세요.
    // 입력된 상태값들을 사용하여 API 호출 등의 작업을 수행할 수 있습니다.
  };
  const handleDeleteClick: React.MouseEventHandler<HTMLDivElement> = () => {
    // 스터디 삭제 로직을 처리하는 코드를 작성하세요.
    // 필요한 API 호출 등의 작업을 수행할 수 있습니다.
    deleteStudy(String(localStorage.getItem("token")), studyId);
  };
  return (
    <>
      <StyledStudyCreateArea>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>스터디 이름</StyledStudyCreateText>
          <StyledStudyInput
            type="text"
            placeholder="스터디 이름을 입력하세요."
            value={studyName}
            onChange={(e) => setStudyName(e.target.value)}
          />
        </StyledStudyCreateInputArea>
        <StyledStudyCreateInputAreaBig>
          <StyledStudyCreateText>스터디 소개</StyledStudyCreateText>
          <StyledStudyInputBig
            placeholder="스터디 설명을 입력하세요."
            value={studyDescription}
            onChange={(e) => setStudyDescription(e.target.value)}
          />
        </StyledStudyCreateInputAreaBig>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>회의 링크</StyledStudyCreateText>
          <StyledStudyInput
            type="url"
            placeholder="화상 회의 주소를 입력하세요."
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />
        </StyledStudyCreateInputArea>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>진행 기간</StyledStudyCreateText>
          <StyledDateArea>
            <StyledStudyDate
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <StyledStudyDateText>~</StyledStudyDateText>
            <StyledStudyDate
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </StyledDateArea>
        </StyledStudyCreateInputArea>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>모집 마감일</StyledStudyCreateText>
          <StyledStudyDate
            type="date"
            value={recruitmentDeadline}
            onChange={(e) => setRecruitmentDeadline(e.target.value)}
          />
        </StyledStudyCreateInputArea>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>모집 인원</StyledStudyCreateText>
          <StyledStudyInputNumber
            type="number"
            min="1"
            placeholder="모집 인원을 입력하세요."
            value={recruitmentCount}
            onChange={(e) => setRecruitmentCount(Number(e.target.value))}
          />
        </StyledStudyCreateInputArea>
        <StyledStudyCreateBtnArea>
          <StyledLink to={`/study/modify`}>
            <SubButtonContainer>
              <StyledCommonButton
                backgroundColor={colors.main_mint}
                onClick={handleModifyClick} // onClick 이벤트 핸들러 추가
              >
                <StyledButtonTextDelete>수정하기</StyledButtonTextDelete>
              </StyledCommonButton>
            </SubButtonContainer>
          </StyledLink>
          <StyledLink to={`/study/delete`}>
            <SubButtonContainer>
              <StyledCommonButton
                backgroundColor={colors.main_red}
                onClick={handleDeleteClick}
              >
                <StyledButtonTextDelete>스터디 삭제</StyledButtonTextDelete>
              </StyledCommonButton>
            </SubButtonContainer>
          </StyledLink>
        </StyledStudyCreateBtnArea>
      </StyledStudyCreateArea>
    </>
  );
};

export default StudyModify;

const StyledStudyCreateArea = styled.div`
  height: 760px;
  margin: 20px 0 20px 0;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
`;
const StyledStudyCreateInputArea = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
`;
const StyledStudyCreateInputAreaBig = styled.div`
  height: 400px;
  display: flex;
`;
const StyledStudyCreateText = styled.p`
  width: 163px;
  margin: 0;
  font-family: ${fonts.SubText};
  padding: 10px 0;
  color: ${colors.main_gray};
`;

const StyledStudyInput = styled.input`
  width: 1080px;
  height: 45px;
  border: solid 1px ${colors.main_navy};
  border-radius: 10px;
  margin: 0;
  padding-left: 20px;
  font-family: ${fonts.SubTextThinSmall};
`;
const StyledStudyInputNumber = styled.input`
  width: 447px;
  height: 45px;
  border: solid 1px ${colors.main_navy};
  border-radius: 10px;
  margin: 0;
  padding: 0 20px 0 20px;
  font-family: sans-serif;
  font-size: 16px;
`;
const StyledDateArea = styled.div`
  width: 1103px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledStudyDateText = styled.p`
  margin: 0;
  font-family: ${fonts.SubText};
  color: ${colors.main_gray};
`;
const StyledStudyDate = styled.input`
  width: 447px;
  height: 45px;
  border: solid 1px ${colors.main_navy};
  border-radius: 10px;
  margin: 0;
  padding: 0 20px 0 20px;
  font-family: sans-serif;
  font-size: 16px;
`;
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
`;

const StyledStudyCreateBtnArea = styled.div`
  width: 1270px;
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.main_black};
  display: flex;
  align-items: center;
`;
interface StyledCommonButtonProps extends HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
}
const StyledCommonButton = styled.div<StyledCommonButtonProps>`
  cursor: pointer;
  width: 132px;
  height: 45px;
  background-color: ${(props) =>
    props.backgroundColor}; /* props로 전달받은 배경색을 사용 */
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

const StyledButtonTextDelete = styled.p`
  font-family: ${fonts.SubTextBig};
  color: ${colors.back_navy};
`;

const SubButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
