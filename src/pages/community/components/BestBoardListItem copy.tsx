import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { colors } from '../../../constants/colors';
import { SubTextThinSmall } from '../../../constants/fonts';
import { getAllCommunityData } from '../../../api/api-community';

const BestBoardListItem: React.FC = () => {
  // const [posts, setPosts] = useState<any[]>([]); // 게시글 데이터를 저장할 상태

  // useEffect(() => {
  //   // 페이지 로드 시 서버에서 게시글 데이터를 받아와 상태 업데이트
  //   fetchPosts();
  // }, []);

  // const fetchPosts = () => {
  //   axios
  //     .get('http://34.22.79.51:5000/api/community/list')
  //     .then((response) => {
  //       console.log(response.data); // 응답 데이터 구조 확인
  //       setPosts(response.data.data); // 받아온 데이터로 게시글 상태 업데이트
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // const displayedPosts = posts
  // const displayedPosts = (posts ?? [])
  //   .sort((a, b) => b.viewCount - a.viewCount) // 조회수에 따라 정렬
  //   .slice(0, 3); // 상위 3개의 게시글 선택

  const queryClient = new QueryClient();

  const { data: postList } = useQuery<
    AxiosResponse<{ data: any[] }>,
    AxiosError,
    any[]
  >(["getAllCommunityData"], getAllCommunityData, {

    select: (response) => {
      return response.data.data;
    },
    onError: (error) => {
      alert("에러가 발생했습니다.");
    },
  });

  const displayedPosts = (postList ?? [])
    .sort((a, b) => b.viewCount - a.viewCount) // 조회수에 따라 정렬
    .slice(0, 3); // 상위 3개의 게시글 선택

  return (
    <div>
      <StyledPostListItem>
        {/* 글 목록 렌더링 */}
        {displayedPosts.map((post, index) => (
          <StyledPostItems key={post._id}>
            <StyledLeftPostItem>
              <StyledPostTitle>타이틀: {post.title}</StyledPostTitle>
            </StyledLeftPostItem>
            <StyledRightPostItem>
              <StyledPostItem>댓글 수: {post.count}</StyledPostItem>
              <StyledPostItem>조회 수: {post.viewCount}</StyledPostItem>
              <StyledPostItem>작성자: {post.author && post.author[0] && post.author[0]._id}</StyledPostItem>
              <StyledPostItem>게시일: {post.timestamps}</StyledPostItem>
            </StyledRightPostItem>
          </StyledPostItems>
        ))}
      </StyledPostListItem>
    </div>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BestBoardListItem />
    </QueryClientProvider>
  );
};

export default App;

// export default BestBoardListItem;

const StyledPostListItem = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledPostItems = styled.li`
  border-bottom: 1px solid ${colors.gray_stroke};
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
  color: ${colors.main_navy};
  margin: 0;
`;

const StyledPostItem = styled.p`
  color: ${colors.main_navy};
  ${SubTextThinSmall};
  flex-grow: 0;
  flex-shrink: 0;
  width: 60px;
  margin: 0;
  padding-left: 45px;
`;
