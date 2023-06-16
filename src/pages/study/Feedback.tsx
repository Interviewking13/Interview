import { useEffect, useState } from "react";
import styled from "styled-components";
import { StudyTaps } from "./common/StudyTap";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Mystudy } from "./Information";
import {
  getFeedbackDataByStudyId,
  postFeedback,
  deleteFeedbackByUserId,
} from "../../api/api-study-feedback";
import { colors } from "../../constants/colors";
import { useLocation } from "react-router-dom";
import { SubTextThin, TitleText } from "../../constants/fonts";

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

  const postFeedbackBtn = async () => {
    try {
      const postFeedbackResponse = await postFeedback(
        0,
        feedbackInput,
        lastPathSegment,
        String(localStorage.getItem("token"))
      );

      setFeedbackInput("");
      if (!postFeedbackResponse.data) {
        throw Error("댓글 작성 실패");
      }
      getFeedbackDataByStudyId(lastPathSegment)
        .then((response) => {
          console.log(response.data);
          setFeedbackData(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteFeedbackBtn = async () => {
    try {
      const deleteFeedback = await deleteFeedbackByUserId(
        lastPathSegment,
        String(localStorage.getItem("token"))
      );
      getFeedbackDataByStudyId(lastPathSegment)
        .then((response) => {
          console.log(response.data);
          setFeedbackData(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.log(error);
    }
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
          value={feedbackInput}
          placeholder="피드백을 입력해주세요"
          onChange={onChangeArea}
        ></InputArea>
        <FeedbackBtn onClick={postFeedbackBtn}>등록</FeedbackBtn>
      </FeedbackContainer>
      {feedbackData.map((post, index) => (
        <FeedbackContainer key={post._id} id={post.user_id}>
          <FeedbackContainerContent>
            <FeedbackUserContainer>
              <PeopleAltIcon />
              &nbsp;&nbsp;{post.user_name}
            </FeedbackUserContainer>
            <FeedbackContentContainer>{post.content}</FeedbackContentContainer>
          </FeedbackContainerContent>
          <FeedbackCancleBtn onClick={DeleteFeedbackBtn}>
            삭제
          </FeedbackCancleBtn>
        </FeedbackContainer>
      ))}
    </Container>
  );
};

const InputArea = styled.textarea`
  height: 100px;
  width: 85%;
  margin-left: 10px;
  font-size: 18px;
  border: 1px solid ${colors.main_navy};
  border-radius: 10px;
  padding: 20px;
  resize: none;
  font-weight: 300;
  box-sizing: border-box;

  &::placeholder {
    color: ${colors.gray_navy};
    font-weight: bold;
    font-size: 16px;
  }
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

const FeedbackCancleBtn = styled.button`
  border: none;
  background: none;
  ${SubTextThin}
  font-weight: 700;
  color: ${colors.main_red};
  border-radius: 20px;
  margin-right: 20px;
  border: 1px solid 2px;
  width: 90px;
  height: 70px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
`;
const FeedbackBtn = styled.button`
  border: none;
  background: none;
  ${SubTextThin}
  font-weight: 700;
  color: ${colors.main_navy};
  border-radius: 20px;
  margin-right: 20px;
  width: 90px;
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
  /* align-items: center; */
  background-color: ${colors.back_navy};
  align-items: center;
  padding: 8px;
  height: 100px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  width: 90%;
  margin-top: 15px;
`;

const FeedbackUserContainer = styled.div`
  display: flex;
  color: ${colors.main_navy};
  font-size: 16px;
  margin: 0px 30px;
`;

const FeedbackContentContainer = styled.div`
  display: flex;
  margin-left: 30px;
  color: ${colors.darkgray_navy};
  font-size: 18px;
`;
