import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { StudyTaps } from "./common/StudyTap";
import { Mystudy, Title } from "./Information";
import { getInfoStudyData } from "../../api/api-study";
import {
  getFeedbackDataByStudyId,
  postFeedback,
  deleteFeedbackByUserId,
} from "../../api/api-study-feedback";
import { colors } from "../../constants/colors";
import { useLocation } from "react-router-dom";

export const Feedback = () => {
  const location = useLocation();
  const path = location.pathname;
  const lastPathSegment = path.substring(path.lastIndexOf("/") + 1);
  //스터디 id값을

  const [feedbackData, setFeedbackData] = useState<any[]>([]); // 게시글 데이터를 저장할 상태
  // title: "",
  // study_name: "",
  // content: "",
  // user_name: "",
  useEffect(() => {
    getFeedbackDataByStudyId("6488114c4bef8842f98828ca")
      .then((response) => {
        console.log(response.data);
        setFeedbackData(response.data);
        console.log(feedbackData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <Container>
      <Mystudy>나의 스터디</Mystudy>
      <StudyTaps />
      <Title>ㄴㅁㄴ</Title>
      <SubContainer>
        <FeedbackBtn>새 피드백 남기기</FeedbackBtn>
      </SubContainer>
      {feedbackData.map((post) => (
        <FeedbackContainer>
          <FeedbackContentContainer>{post.user_name}</FeedbackContentContainer>
          <FeedbackContentContainer>{post.content}</FeedbackContentContainer>
        </FeedbackContainer>
      ))}
    </Container>
  );
};
const SubContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;
const FeedbackBtn = styled.button`
  cursor: pointer;
  background: none;
  border: none;
`;
const Container = styled.div`
  margin: 30px 100px;
  display: flex;
  flex-direction: column;
`;

//피드백 개별 박스
const FeedbackContainer = styled.div`
  background-color: ${colors.back_navy};
  padding: 10px;
  height: 100px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  width: 100%;
  margin-top: 5px;
`;

const FeedbackContentContainer = styled.div`
  display: flex;

  margin-right: 100px;
`;
const FeedbackBtnContainer = styled.div`
  width: 70px;
`;

const InputBtn = styled.button`
  cursor: pointer;
  background: none;
  margin: auto;
`;
