import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { colors } from "../../../constants/colors";
import { SubTextThinSmall } from "../../../constants/fonts";
import { getAllCommunityData } from "../../../api/api-community";

const BoardListItem: React.FC = () => {
  const [startPage, setStartPage] = useState(1);

  const [posts, setPosts] = useState<any[]>([]); // 게시글 데이터를 저장할 상태
  const a = posts.slice(0, 5);
  useEffect(() => {
    // 페이지 로드 시 서버에서 게시글 데이터를 받아와 상태 업데이트
    getAllCommunityData()
      .then((response) => {
        const lastPage = Math.ceil(response.data.data.length / 10);
        console.log(response.data); // 응답 데이터 구조 확인
        console.log(lastPage); // 응답 데이터 구조 확인
        setPosts(response.data.data); // 받아온 데이터로 게시글 상태 업데이트
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <StyledPostListItem>
      {/* 글 목록 렌더링 */}
      {a.map((post) => (
        <StyledPostItems key={post._id}>
          <StyledLeftPostItem>
            <StyledPostTitle>{post.title}</StyledPostTitle>
          </StyledLeftPostItem>
          <StyledRightPostItem>
            <StyledPostItem>댓글 수: {post.count}</StyledPostItem>
            <StyledPostItem>조회 수: {post.read_users.length}</StyledPostItem>
            <StyledPostItem>
              작성자: {post.author && post.author[0] && post.author[0]._id}
            </StyledPostItem>
            <StyledPostItem>{post.timestamps}</StyledPostItem>
          </StyledRightPostItem>
        </StyledPostItems>
      ))}
      <PageMoveBtn>이전페이지</PageMoveBtn>
      {new Array(5).fill(0).map((_, index) => (
        <button key={index + startPage} id={String(index + startPage)}>
          {index + startPage}
        </button>
      ))}
      <PageMoveBtn>다음페이지</PageMoveBtn>
    </StyledPostListItem>
  );
};

export default BoardListItem;

const StyledPostListItem = styled.div`
  margin: 0;
  padding: 10px;
`;
const PageMoveBtn = styled.button`
  width: 100px;
  height: 50px;
`;
const StyledPostItems = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  border-bottom: 1px solid ${colors.gray_stroke};
  width: 100%;
  padding: 10px 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLeftPostItem = styled.div``;

const StyledRightPostItem = styled.div`
  display: flex;
`;

const StyledPostTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.main_black};
  margin: 0;
`;

const StyledPostItem = styled.div`
  color: ${colors.main_black};
  ${SubTextThinSmall};

  width: 80px;
  margin: 5px;
`;
