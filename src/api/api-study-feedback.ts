import axios from "axios";
// axios.defaults.withCredentials = true;

/* 인스턴스 네이밍 컨벤션 : 요청방식(ex get) + 해당 내용 + (by) + (파라미터/인자/쿼리) */

/** 1. 피드백, 댓글 작성  post */
export const postFeedback = async (content_type: number, content: string) => {
  const response = await axios.post(
    `http://34.22.79.51:5000/api/feedback/create`,
    { content_type, content }
  );
  return response;
};

/** 2. 피드백, 댓글 조회 (스터디별)  get */
export const getFeedbackDataByStudyId = async (study_id: string) => {
  const response = await axios.get(
    `http://34.22.79.51:5000/api/feedback/${study_id}`
  );
  return response;
};

/** 3. 피드백, 댓글 조회 (유저별)   get */
export const getFeedbackDataByUserId = async (user_id: string) => {
  const response = await axios.get(
    `http://34.22.79.51:5000/api/feedback/${user_id}`
  );
  return response;
};

/** 4. 피드백, 댓글 수정  put */
export const putFeedbackByUserId = async (
  user_id: string,
  data: { content_type: number; content: string }
) => {
  const response = await axios.put(
    `http://34.22.79.51:5000/api/feedback/${user_id}`,
    { content_type: data.content_type, content: data.content }
  );
  return response;
};

/** 5. 피드백, 댓글 삭제  delete */
export const deleteFeedbackByUserId = async (user_id: string) => {
  const response = await axios.delete(
    `http://34.22.79.51:5000/api/feedback/${user_id}`
  );
  return response;
};
