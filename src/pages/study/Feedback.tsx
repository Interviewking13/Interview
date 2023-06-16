import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { StudyTaps } from "./common/StudyTap";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Mystudy, Title } from "./Information";
import {
  getFeedbackDataByStudyId,
  postFeedback,
  deleteFeedbackByUserId,
} from "../../api/api-study-feedback";
import { colors } from "../../constants/colors";
import { useLocation } from "react-router-dom";
import { TitleText } from "../../constants/fonts";

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
    postFeedback(
      0,
      feedbackInput,
      lastPathSegment,
      String(localStorage.getItem("token"))
    ).then((response) => {
      console.log(response.data);
    });
    getFeedbackDataByStudyId(lastPathSegment)
      .then((response) => {
        console.log(response.data);
        setFeedbackData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const DeleteFeedbackBtn = () => {
    deleteFeedbackByUserId(
      lastPathSegment,
      String(localStorage.getItem("token"))
    );
  };

  // const handleSubmit = async (e: any) => {
  //   try {
  //     const postReplyResponse = await postReply(
  //       useId,
  //       text,
  //       Number(lastPathSegment)
  //     );
  //     if (!postReplyResponse.data) {
  //       throw Error("댓글 작성 실패");
  //     }
  //     getDataByCommunity(useId);
  //     setText("");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
        <FeedbackBtn onClick={postFeedbackBtn}>새 피드백 남기기</FeedbackBtn>
      </FeedbackContainer>
      {feedbackData.map((post, index) => (
        <FeedbackContainer key={post._id} id={post.user_id}>
          <FeedbackContainerContent>
            <FeedbackUserContainer>
              <PeopleAltIcon />
              {post.user_name}
            </FeedbackUserContainer>
            <FeedbackContentContainer>{post.content}</FeedbackContentContainer>
          </FeedbackContainerContent>
          <FeedbackBtn onClick={DeleteFeedbackBtn}>삭제</FeedbackBtn>
        </FeedbackContainer>
      ))}
    </Container>
  );
};

const InputArea = styled.textarea`
  height: 90px;
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
const FeedbackContainerContent = styled.div`
  display: flex;
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
  width: 90%;
  margin-top: 5px;
`;

const FeedbackUserContainer = styled.div`
  display: flex;
  color: ${colors.main_navy};
  font-size: 18px;
  margin: 0px 30px;
`;

const FeedbackContentContainer = styled.div`
  display: flex;
  margin-left: 30px;
  color: ${colors.darkgray_navy};
  font-size: 18px;
`;
