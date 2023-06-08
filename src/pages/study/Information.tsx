// import styled from "@emotion/styled";
import styled from "styled-components";
import { Link } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { DetailTitle } from "./common/DetailTitle";
import { StudyTaps } from "./common/StudyTap";
import axios from "axios";
import { useEffect, useState } from "react";
import { fetchData, postData } from "../../api/api-community";
import { colors } from "../../constants/colors";
import { SubTextBig, TitleText } from "../../constants/fonts";
import { fetchStudyData, fetchStudyDatas } from "../../api/api-study";

// const data = {
//   // 스터디 정보
//   study_id: 1,
//   study_name: "interview king",
//   title: "신입 백엔드 개발자 취업을 위한 CS 스터디",
//   content: "우리 스터디는 ~~을 목표로 하고, ...을 규칙으로 함",
//   start: "2023-06-15",
//   end: "2023-07-30",
//   deadline: "2023-05-30",
//   headcount: 6,
//   chat_link:
//     "https://us05web.zoom.us/j/83754399005?pwd=QWRMY0I4VjhkWkhtdHdydkhTM0dLUT09",
//   status: 0,

//   // 스터디원 신청 정보 (스터디 신청 시, 사용자가 입력)
//   user_name: "강혜리",
//   email: "merrykang1103@gmail.com",
//   phone_number: "010-7296-2003",
//   goal: "금융, 인공지능",
// };

const Information = () => {
  const [adata, setData] = useState("");

  useEffect(() => {
    fetchStudyData()
      // postData()
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <Container>
      <div>{adata}</div>
      {/* <Mystudy>{data.status !== 0 ? "스터디정보" : "나의 스터디"}</Mystudy>
      <StudyTaps></StudyTaps>
      <Title>{data.title}</Title>
      <SubTitle>
        <DetailTitle
          name="&nbsp;회의링크"
          content={
            <Link color="#00e595;" href="http://naver.com">
              {data.chat_link}
            </Link>
          }
        ></DetailTitle>
        <DetailTitle
          name="&nbsp;진행 기간"
          content="23.06.01 ~ 23.08.01"
        ></DetailTitle>
        <DetailTitle name="&nbsp;인원" content={data.headcount}></DetailTitle>
        <DetailTitle name="&nbsp;스터디장" content="이용섭"></DetailTitle>
      </SubTitle>
      <Divider></Divider>
      <StudyIntro>
        <PeopleAltIcon />
        &nbsp;스터디 소개
      </StudyIntro>
      <p>{data.content}</p> */}
    </Container>
  );
};
const Container = styled.div`
  margin: 30px 100px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  margin-top: 10px;
  ${TitleText};
  color: ${colors.main_navy};
  font-size: 48px;
`;
const Mystudy = styled.span`
  margin-top: 20px;
  ${TitleText};
  color: ${colors.main_navy};
  font-size: 32px;
`;
const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
`;
const Divider = styled.div`
  margin: 15px 0px;
  border-bottom: 1px solid #000;
`;

const StudyIntro = styled.div`
  display: flex;
  margin: 10px 0px;
  ${SubTextBig};
  color: ${colors.main_navy};
`;

export default Information;
