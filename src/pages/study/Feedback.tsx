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

export const Feedback = () => {
  const [FeedbackInput, setFeedbackInput] = useState("");
  const [studyTapsCount, setStudyTapsCount] = useState(0);
  const [studyData, setStudyData] = useState({
    title: "",
    study_name: "",
    status: 0,
    content: 0,
    start: "",
    end: "",
    chat_link: "",
  });

  useEffect(() => {
    getInfoStudyData("6481c6cf73e7175d6c31e18d")
      .then((response) => {
        console.log(response.data);
        setStudyData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    getFeedbackDataByStudyId("6481c6cf73e7175d6c31e18d")
      .then((response) => {
        console.log(response.data);
        // setStudyData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const onClickButton = () => {
    postFeedback(0, "ㅁㄴㅇ").then((response) => {
      console.log(response.data);
    });
    setStudyTapsCount((pre) => pre + 1);
  };

  const FeedbackCotent = (e: any) => {
    setFeedbackInput(e.target.value);
  };
  const onClickFeedbackBtn = (event: any) => {
    if (event.target.innerText === "등록") {
      postFeedback(0, "asd");
      console.log("등록할게");
    } else if (event.target.innerText === "수정") {
      // getFeedbackDataByStudyId("user_id",{content_type:1, content:"s"});
      console.log("수정입니다");
    } else if (event.target.innerText === "삭제") {
      deleteFeedbackByUserId("user_id");
      console.log("삭제합니다");
    }
  };
  return (
    <Container>
      <Mystudy>{studyData.status !== 0 ? "스터디정보" : "나의 스터디"}</Mystudy>
      <StudyTaps />
      <Title>{studyData.title}</Title>
      <SubContainer>
        <FeedbackBtn onClick={onClickButton}>새 피드백 남기기</FeedbackBtn>
      </SubContainer>
      <div>피드백 목록 불러와서 MAP으로 넣기 현재 API연결 오류</div>
      <FeedbackContainer>
        <FeedbackUser>이용섭</FeedbackUser>
        <FeedbackContentContainer>
          <FeedbackContent2 onChange={FeedbackCotent}></FeedbackContent2>
          <FeedbackBtnContainer>
            <InputBtn onClick={onClickFeedbackBtn}>수정</InputBtn>
            <InputBtn onClick={onClickFeedbackBtn}>삭제</InputBtn>
          </FeedbackBtnContainer>
        </FeedbackContentContainer>
      </FeedbackContainer>
      <FeedbackContainer>
        <FeedbackUser>이용섭</FeedbackUser>
        <FeedbackContentContainer>
          <FeedbackContent2 onChange={FeedbackCotent}></FeedbackContent2>
          <FeedbackBtnContainer>
            <InputBtn onClick={onClickFeedbackBtn}>수정</InputBtn>
            <InputBtn onClick={onClickFeedbackBtn}>삭제</InputBtn>
          </FeedbackBtnContainer>
        </FeedbackContentContainer>
      </FeedbackContainer>
      {[...Array(studyTapsCount)].map((_, index) => (
        <FeedbackContainer key={index}>
          <FeedbackUser>이용섭</FeedbackUser>
          <FeedbackContentContainer>
            <FeedbackContent1 onChange={FeedbackCotent}></FeedbackContent1>

            <FeedbackBtnContainer>
              <InputBtn onClick={onClickFeedbackBtn}>등록</InputBtn>
            </FeedbackBtnContainer>
          </FeedbackContentContainer>
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

const FeedbackContainer = styled.div`
  background-color: ${colors.back_navy};
  padding: 10px;
  height: 100px;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  width: 100%;
  margin-top: 5px;
`;

const FeedbackUser = styled.div`
  width: 50px;
`;
const FeedbackContent1 = styled.textarea`
  width: 1100px;
  height: 80px;
`;

const FeedbackContent2 = styled.div`
  width: 1100px;
  height: 80px;
`;
const FeedbackContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const FeedbackBtnContainer = styled.div`
  display: flex;

  justify-content: flex-end;
`;

const InputBtn = styled.button`
  cursor: pointer;
  background: none;
  margin: auto;
`;
