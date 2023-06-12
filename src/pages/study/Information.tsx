import styled from "styled-components";
import { Link } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { DetailTitle } from "./common/DetailTitle";
import { StudyTaps } from "./common/StudyTap";
import { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { SubTextBig, TitleText } from "../../constants/fonts";
import { getInfoAllStudyData, getInfoStudyData } from "../../api/api-study";
import { SubmitButton } from "./common/SubmitButton";
import { dateSplice } from "../../utils/dateFomatting";
import { useLocation } from "react-router-dom";

const Information: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const lastPathSegment = path.substring(path.lastIndexOf("/") + 1);

  //스터디 목록에서 특정 스터디 클릭시 스터디 id를 쿼리로 받아서 화면에 보여줄예정
  const [studyData, setStudyData] = useState({
    title: "",
    study_name: "",
    status: 0,
    content: 0,
    start: "",
    end: "",
    chat_link: "",
    headcount: 0,
    acceptcount: 0,
  });

  useEffect(() => {
    getInfoStudyData(lastPathSegment)
      .then((response) => {
        console.log(response.data);
        setStudyData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <Container>
      <Mystudy>{studyData.status !== 0 ? "스터디정보" : "나의 스터디"}</Mystudy>
      <StudyTaps />
      <Title>{studyData.title}</Title>
      <SubTitle>
        <DetailTitle
          name="&nbsp;회의링크"
          content={
            <Link color="#00e595;" href="http://naver.com">
              {studyData.chat_link}
            </Link>
          }
        ></DetailTitle>
        <DetailTitle
          name="&nbsp;진행 기간"
          content={`${dateSplice(studyData.start)} ~ ${dateSplice(
            studyData.end
          )}`}
        ></DetailTitle>
        <DetailTitle
          name="&nbsp;인원"
          content={`${studyData.acceptcount} / ${studyData.headcount}명`}
        ></DetailTitle>
        <DetailTitle name="&nbsp;스터디장" content="이용섭"></DetailTitle>
      </SubTitle>
      <Divider></Divider>
      <StudyIntro>
        <PeopleAltIcon />
        &nbsp;스터디 소개
      </StudyIntro>
      <p>{studyData.content}</p>
      <SubmitButton />
    </Container>
  );
};
const Container = styled.div`
  margin: 30px 100px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.span`
  margin-top: 10px;
  ${TitleText};
  color: ${colors.main_navy};
  font-size: 48px;
`;
export const Mystudy = styled.span`
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
