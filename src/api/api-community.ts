import { axiosInstance } from "./axiosInstance";

/* 인스턴스 네이밍 컨벤션 : 요청방식(ex get) + 해당 내용 + (by) + (파라미터/인자/쿼리) */
/* 커뮤니티 최신화 06-11 00:45am */

/** 1. 커뮤니티 목록 조회(전체)  get */
export const getAllCommunityData = async () => {
  const response = await axiosInstance.get(`community/list`);
  return response;
};

/** 2. 커뮤니티 게시글 등록  post */
export const postCommunity = async ({
  user_id,
  title,
  content,
  attach,
}: {
  user_id?: string;
  title: string;
  content: string;
  attach: string;
}) => {
  const response = await axiosInstance.post(`community/detl`, {
    user_id,
    title,
    content,
  });
  return response;
};

/** 3. 커뮤니티 게시글+댓글 조회(개별)  get */
export const getDataByCommunity_noAndUser_id = async (
  community_no: number,
  user_id: string
) => {
  const response = await axiosInstance.get(
    `community/detl?community_id=${community_no}&user_id=${user_id}`
  );
  return response;
};

/** 4. 커뮤니티 게시글 수정  put */
export const putCommunity = async (
  community_id: number,
  title: string,
  content: string,
  token: string
) => {
  const response = await axiosInstance.put(`community/detl`, {
    community_id,
    title,
    content,
  });
  return response;
};

/** 5. 커뮤니티 게시글 삭제  delete */
export const deleteCommunityByCommunity_no = async (
  community_id: number,
  token: string
) => {
  const response = await axiosInstance.delete("community/detl", {
    data: {
      community_id: community_id,
    },
  });
  return response;
};

/** 6. 커뮤니티 댓글 등록  post */
export const postReply = async (
  reply_user_id: string,
  reply_content: string,
  community_id: number
) => {
  const response = await axiosInstance.post(`community/reply`, {
    reply_user_id,
    reply_content,
    community_id,
  });
  return response;
};

/** 7. 커뮤니티 댓글 수정  put */
export const putReply = async (reply_id: number, reply_content: string) => {
  const response = await axiosInstance.put(`community/reply`, {
    reply_id,
    reply_content,
  });
  return response;
};

/** 8. 커뮤니티 댓글 삭제  delete */
export const deleteReply = async (reply_id: number, token: string) => {
  const response = await axiosInstance.delete(`community/reply`, {
    data: {
      reply_id: reply_id,
    },
  });
  return response;
};

