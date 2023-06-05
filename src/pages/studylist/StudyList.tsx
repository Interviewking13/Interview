import React from "react";
import styled from "@emotion/styled";
import { Link } from "@mui/material";
import StudyListItem from "../../components/layout/StudyListItem";

const StudyList = (): JSX.Element => {
  const studyData = [{
      id: 1,
      title: "면접 스터디 1",
      currentParticipants: 3,
      maxParticipants: 8,
      startDate: "23.07.01",
      endDate: "23.07.31",
      recruitDeadline: "23.06.30",
      master: "정채진"
    },
    {
      id: 2,
      title: "면접 스터디 2",
      currentParticipants: 3,
      maxParticipants: 8,
      startDate: "23.07.01",
      endDate: "23.07.31",
      recruitDeadline: "23.06.30",
      master: "정채진"
    },
    {
      id: 3,
      title: "면접 스터디 3",
      currentParticipants: 3,
      maxParticipants: 8,
      startDate: "23.07.01",
      endDate: "23.07.31",
      recruitDeadline: "23.06.30",
      master: "정채진"
    },
    {
      id: 4,
      title: "면접 스터디 4",
      currentParticipants: 3,
      maxParticipants: 8,
      startDate: "23.07.01",
      endDate: "23.07.31",
      recruitDeadline: "23.06.30",
      master: "정채진"
    },
    {
      id: 5,
      title: "면접 스터디 5",
      currentParticipants: 3,
      maxParticipants: 8,
      startDate: "23.07.01",
      endDate: "23.07.31",
      recruitDeadline: "23.06.30",
      master: "정채진"
    },
    {
      id: 6,
      title: "면접 스터디 6",
      currentParticipants: 3,
      maxParticipants: 8,
      startDate: "23.07.01",
      endDate: "23.07.31",
      recruitDeadline: "23.06.30",
      master: "정채진"
    }
  ];
  return (
      <CommonContainer>
          <StudyListTopArea>
            
              <TitleText>스터디 찾기</TitleText>
              <SubTextThin>원하는 스터디를 찾고 가입해보세요.</SubTextThin>

              <StudyListInputArea>
                  <select name="" id="StudyListSort">
                      최신순
                  </select>
                  <input type="text" name="" id="" placeholder="검색하기" />
                  <CommonButton>
                      <ButtonText>스터디 만들기</ButtonText>
                  </CommonButton>
              </StudyListInputArea>
              
          </StudyListTopArea>

          <StudyListItemArea>
          {studyData.map((study) => (
              <StudyListItem
               id={study.id}
               title={study.title}
               currentParticipants={study.currentParticipants}
               maxParticipants={study.maxParticipants}
               startDate={study.startDate}
               endDate={study.endDate}
               recruitDeadline={study.recruitDeadline}
               master={study.master}
               />

          ))}
          </StudyListItemArea>
            
      </CommonContainer>
  );
};

export default StudyList;

const CommonContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
`;
const StudyListTopArea = styled.div`
  margin: 50px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const StudyListInputArea = styled.div`
  width: 620px;
  display: flex;
  justify-content: space-between;
`;
const TitleText = styled.p`
  height: fit-content;
  font-family: 'establish Retrosans';
  font-size: 32px;
  color: navy;
  margin: 0 30px 0 0;
`;
const SubTextThin = styled.p`
  width: 439px;
  height: fit-content;
  font-size: 18px;
  font-weight: light;
  color: gray;
  margin: 0;
`;

const CommonButton = styled.div`
  width: 132px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 10px;
  background-color: lightgreen;
`;
const ButtonText = styled.p`
  font-size: 18px;
  margin-top: 11px;
  border-radius: 10px;
`;

const StudyListItemArea = styled.p`
  width: 1270px;
  height: 945px;
  margin: 30px 0 40PX 0;
  display: grid;
  grid-auto-rows: 295px;
  grid-template-columns: 298px 298px 298px 298px;
  grid-row-gap: 30px;
  grid-column-gap: 25px;
`;