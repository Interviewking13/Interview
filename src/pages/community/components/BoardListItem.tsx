import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { colors } from "../../../constants/colors";
import { SubTextThinSmall } from "../../../constants/fonts";

const BoardListItem: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]); // 게시글 데이터를 저장할 상태

  useEffect(() => {
    // 페이지 로드 시 서버에서 게시글 데이터를 받아와 상태 업데이트
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get("http://34.22.79.51:5000/api/community/list")
      .then((response) => {
        console.log(response.data); // 응답 데이터 구조 확인
        console.log(response.data.data.length); // 응답 데이터 구조 확인
        setPosts(response.data.data); // 받아온 데이터로 게시글 상태 업데이트
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <StyledPostListItem>
      {/* 글 목록 렌더링 */}
      {posts.map((post) => (
        <StyledPostItems key={post._id}>
          <StyledLeftPostItem>
            <StyledPostTitle>타이틀: {post.title}</StyledPostTitle>
          </StyledLeftPostItem>
          <StyledRightPostItem>
            <StyledPostItem>댓글 수: {post.count}</StyledPostItem>
            <StyledPostItem>조회 수: {post.viewCount}</StyledPostItem>
            <StyledPostItem>
              작성자: {post.author && post.author[0] && post.author[0]._id}
            </StyledPostItem>
            <StyledPostItem>게시일: {post.timestamps}</StyledPostItem>
          </StyledRightPostItem>
        </StyledPostItems>
      ))}
      <span>이전페이지</span>
      <span>다음페이지</span>
    </StyledPostListItem>
  );
};

export default BoardListItem;

const StyledPostListItem = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 10px;
`;

const StyledPostItems = styled.button`
  border-bottom: 1px solid ${colors.gray_stroke};
  width: 100%;
  padding: 10px 0;
  margin: 0;
  display: flex;
  justify-items: center;
  align-items: flex-start;

  &:last-child {
    border-bottom: none;
  }
`;

const StyledLeftPostItem = styled.div`
  flex: 1; /* 수정: 오른쪽으로 붙도록 flex 속성 추가 */
`;

const StyledRightPostItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledPostTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.main_black};
  margin: 0;
`;

const StyledPostItem = styled.p`
  color: ${colors.main_black};
  ${SubTextThinSmall};
  flex-grow: 0;
  flex-shrink: 0;
  width: 60px;
  margin: 0;
  padding-left: 45px;
`;
