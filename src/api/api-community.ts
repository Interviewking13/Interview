import axios from "axios";

/* 인스턴스 네이밍 컨벤션 : 요청방식(ex get) + 해당 내용 + (by) + (파라미터/인자/쿼리) */

/** 1. 커뮤니티 목록 조회(전체)  get */
export const getAllCommunityData = async () => {
  const response = await axios.get(
    `http://34.22.79.51:5000/api/community/list`
  );
  return response;
};

/** 2. 커뮤니티 게시글 등록  post */
export const postCommunity = async (
  user_id: string,
  title: string,
  content: string,
  attach: string
) => {
  const response = await axios.post(
    `http://34.22.79.51:5000/api/community/detl`,
    {
      user_id,
      title,
      content,
      attach,
    }
  );
  return response;
};

/** 3. 커뮤니티 게시글+댓글 조회(개별)  get */
export const getDataByCommunity_noAndUser_id = async (
  community_no: number,
  user_id: string
) => {
  const response = await axios.get(
    `http://34.22.79.51:5000/api/community/detl/${community_no}/${user_id}`
  );
  return response;
};

/** 4. 커뮤니티 게시글 수정  put */
export const putCommunity = async (
  community_no: number,
  title: string,
  content: string,
  attach: string
) => {
  const response = await axios.put(
    `http://34.22.79.51:5000/api/community/detl`,
    {
      community_no,
      title,
      content,
      attach,
    }
  );
  return response;
};

/** 5. 커뮤니티 게시글 삭제  delete */
export const deleteCommunityByCommunity_no = async (community_no: number) => {
  const response = await axios.delete(
    `http://34.22.79.51:5000/api/community/detl/${community_no}`
  );
  return response;
};

/** 6. 커뮤니티 댓글 등록  post */
export const postReply = async (
  community_no: number,
  user_id: string,
  reply_content: string
) => {
  const response = await axios.post(
    `http://34.22.79.51:5000/api/community/reply`,
    {
      community_no,
      user_id,
      reply_content,
    }
  );
  return response;
};

/** 7. 커뮤니티 댓글 수정  put */
export const putReply = async (
  community_no: number,
  reply_no: number,
  reply_content: string
) => {
  const response = await axios.put(
    `http://34.22.79.51:5000/api/community/reply`,
    {
      community_no,
      reply_no,
      reply_content,
    }
  );
  return response;
};

/** 8. 커뮤니티 댓글 삭제  delete */
export const deleteReply = async (community_no: number, reply_no: number) => {
  const response = await axios.delete(
    `http://34.22.79.51:5000/api/community/reply`,
    {
      data: { community_no, reply_no },
    }
  );
  return response;
};
