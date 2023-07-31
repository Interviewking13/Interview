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
import { SubTextThin } from "../../constants/fonts";
import { getUserData } from "../../api/api-user";
import { useQuery } from "react-query";

export const Feedback = () => {
  const location = useLocation();
  const path = location.pathname;
  const lastPathSegment = path.substring(path.lastIndexOf("/") + 1);
  const studyId = lastPathSegment;
  const [feedbackInput, setFeedbackInput] = useState("");
  const [feedbackData, setFeedbackData] = useState<any[]>([]); // 게시글 데이터를 저장할 상태

  const {
    data: userData,
    isLoading: userDataLoading,
    isError: userDataError,
    isFetching: userDataFetching,
  } = useQuery("userData", () =>
    getUserData(String(localStorage.getItem("token")))
  );
  console.log(userData);
  useEffect(() => {
    getFeedbackDataByStudyId(studyId)
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
      alert("삭제하시겠습니까?");
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
        <BtnContainer>
          <FeedbackBtn onClick={postFeedbackBtn}>등록</FeedbackBtn>
        </BtnContainer>
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
          <FeedbackBtnContainer>
            <FeedbackCancleBtn onClick={DeleteFeedbackBtn}>
              수정
            </FeedbackCancleBtn>
            <FeedbackCancleBtn onClick={DeleteFeedbackBtn}>
              삭제
            </FeedbackCancleBtn>
          </FeedbackBtnContainer>
        </FeedbackContainer>
      ))}
    </Container>
  );
};

const InputArea = styled.textarea`
  height: 120px;
  width: 1250px;
  margin: 5px 0;
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

  @media screen and (max-width: 768px) {
    width: 100%;

    font-size: 12px;
  }
`;
const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const FeedbackBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FeedbackCancleBtn = styled.button`
  border: none;
  background: none;
  ${SubTextThin}
  font-weight: 700;
  color: ${colors.main_red};
  border-radius: 20px;
  border: 1px solid 2px;
  width: 50;
  height: 30px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;
const FeedbackBtn = styled.button`
  border: none;
  background: none;
  ${SubTextThin}
  font-weight: 700;
  color: ${colors.main_navy};
  border-radius: 20px;
  margin-right: 10px;
  width: 50px;
  height: 30px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
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
  @media screen and (max-width: 768px) {
    width: 100vw;
    padding: 10px;
  }
`;
const FeedbackContainerContent = styled.div`
  margin: 10px 0;
  height: 120px;
  display: flex;
`;
//피드백 개별 박스
const FeedbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.back_navy};

  padding: 8px;
  height: 140px;
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  width: 1270px;
  margin-top: 15px;
  @media screen and (max-width: 768px) {
    width: 95%;
  }
`;

const FeedbackUserContainer = styled.div`
  display: flex;
  color: ${colors.main_navy};
  font-size: 16px;
  margin: 0px 20px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
    margin: 0px 5px;
  }
`;

const FeedbackContentContainer = styled.div`
  display: flex;
  margin-left: 30px;
  color: ${colors.darkgray_navy};
  font-size: 18px;
  @media screen and (max-width: 768px) {
    font-size: 12px;
    margin-left: 5px;
  }
`;
