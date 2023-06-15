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
  const [feedbackInput, setFeedbackInput] = useState("");
  const location = useLocation();
  const path = location.pathname;
  const lastPathSegment = path.substring(path.lastIndexOf("/") + 1);
  //스터디 id값을

  const [feedbackData, setFeedbackData] = useState<any[]>([]); // 게시글 데이터를 저장할 상태

  useEffect(() => {
    getFeedbackDataByStudyId(lastPathSegment)
      .then((response) => {
        console.log(response.data);
        setFeedbackData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const postFeedbackBtn = () => {
    postFeedback(0, feedbackInput, lastPathSegment).then((response) => {
      console.log(response.data);
    });
  };
  const DeleteFeedbackBtn = () => {
    postFeedback(0, feedbackInput, lastPathSegment).then((response) => {
      console.log(response.data);
    });
  };
  const onChangeArea = (e: any) => {
    setFeedbackInput(e.target.value);
  };
  return (
    <Container>
      <Mystudy>나의 스터디</Mystudy>
      <StudyTaps />
      <SubContainer></SubContainer>
      <FeedbackContainer>
        <InputArea
          placeholder="피드백을 입력해주세요"
          onChange={onChangeArea}
        ></InputArea>
        <FeedbackBtn onClick={postFeedbackBtn}>입력</FeedbackBtn>
        <FeedbackBtn onClick={DeleteFeedbackBtn}>삭제</FeedbackBtn>
      </FeedbackContainer>
      {feedbackData.map((post, index) => (
        <FeedbackContainer key={post._id} id={post.user_id}>
          <FeedbackContentContainer>{post.user_name}</FeedbackContentContainer>
          <FeedbackContentContainer>{post.content}</FeedbackContentContainer>
        </FeedbackContainer>
      ))}
    </Container>
  );
};

const InputArea = styled.textarea`
  height: 80px;
  width: 80%;
  margin-left: 20px;
  font-size: 20px;
`;
const FeedbackBtn = styled.button`
  background-color: yellow;
  border-radius: 20px;
  margin-right: 20px;
  border: 1px solid 2px;
  width: 70px;
  height: 70px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;
const SubContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 1270px;
  display: flex;
  flex-direction: column;
`;

//피드백 개별 박스
const FeedbackContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
