import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { colors } from "../../../constants/colors";
import { SubTextThinSmall } from "../../../constants/fonts";
import { getAllCommunityData } from "../../../api/api-community";
import { useNavigate } from "react-router-dom";
import {
  StyledLeftPostItem,
  StyledPostItem,
  StyledPostItems,
} from "./BoardListItem";
import { SubText } from "../../../constants/fonts";

const BestBoardListItem: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]); // 게시글 데이터를 저장할 상태
  const [bestPosts, setBestPosts] = useState<any[]>([]); // 게시글 데이터를 저장할 상태

  const navigate = useNavigate(); // useNavigate 훅 사용
  useEffect(() => {
    getAllCommunityData()
      .then((response) => {
        const { data } = response;
        setBestPosts(
          data.data
            .sort((a: any, b: any) => b.read_users.length - a.read_users.length)
            .slice(0, 3)
        );
        // sortedArr
        //   .sort((a, b) => b.read_users.length - a.read_users.length)
        //   .slice(0, 3);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // const displayedPosts = posts
  // const displayedPosts = (posts ?? [])
  //   .sort((a, b) => b.viewCount - a.viewCount) // 조회수에 따라 정렬
  //   .slice(0, 3); // 상위 3개의 게시글 선택
  const onItemClick = (e: any) => {
    navigate(`/Community/communityDetailPage/${e.currentTarget.id}`);
    console.log(e.currentTarget.id);
  };

  return (
    <div>
      <StyledPostListItem>
        {bestPosts.map((post) => (
          <StyledPostItems
            onClick={onItemClick}
            key={post.community_id}
            id={post.community_id}
          >
            <StyledLeftPostItem>
              <StyledPostTitle>{post.title}</StyledPostTitle>
            </StyledLeftPostItem>
            <StyledRightPostItem>
              <StyledPostItem>댓글 수: </StyledPostItem>
              <StyledPostItem>조회 수: {post.read_users.length}</StyledPostItem>
              <StyledPostItem>{post.user_name}</StyledPostItem>
              <StyledPostItem>{post.timestamps}</StyledPostItem>
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
  padding: 0 20px;
  margin: 0             ;
`;

const StyledRightPostItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledPostTitle = styled.div`
  width: 430px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ${SubText};
  color: ${colors.main_navy};
  margin: 0;
`;