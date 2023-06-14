import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../../constants/colors";
import { SubTextThinSmall } from "../../../constants/fonts";
import { getAllCommunityData } from "../../../api/api-community";
import { useNavigate } from "react-router-dom";

const BoardListItem: React.FC = () => {
  const [startPage, setStartPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    getAllCommunityData()
      .then((response) => {
        const { data } = response;
        setAllPosts(data.data.reverse());
        setLastPage(Math.ceil(data.data.length / 10));
        setPosts(data.data.slice(0, 10));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onClickPageBtn = (selectedPage: number) => {
    const startIdx = (selectedPage - 1) * 10;
    const endIdx = selectedPage * 10;
    setPosts(allPosts.slice(startIdx, endIdx));
    setStartPage(selectedPage);
  };

  const onClickPrevPage = () => {
    if (startPage > 1) {
      const prevPage = startPage - 1;
      onClickPageBtn(prevPage);
    }
  };

  const onClickNextPage = () => {
    if (startPage < lastPage) {
      const nextPage = startPage + 1;
      onClickPageBtn(nextPage);
    }
  };

  const onItemClick = (e: any) => {
    navigate(`/Community/communityDetailPage/${e.currentTarget.id}`);
    console.log(e.currentTarget.id);
  };

  return (
    <StyledPostListItem>
      {posts.map((post) => (
        <StyledPostItems
          onClick={onItemClick}
          key={post.community_id}
          id={post.community_id}
        >
          <StyledLeftPostItem>
            <StyledPostTitle>{post.title}</StyledPostTitle>
          </StyledLeftPostItem>
          <StyledRightPostItem>
            <StyledPostItem>조회 수: {post.read_users.length}</StyledPostItem>
            <StyledPostItem>{post.user_name}</StyledPostItem>
            <StyledPostItem>{post.timestamps}</StyledPostItem>
          </StyledRightPostItem>
        </StyledPostItems>
      ))}
      <PageNation>
        <PageMoveBtn onClick={onClickPrevPage}>이전</PageMoveBtn>
        {Array.from({ length: lastPage }).map((_, index) => (
          <StyledPageBtn
            key={index + 1}
            isActive={index + 1 === startPage}
            onClick={() => onClickPageBtn(index + 1)}
          >
            {index + 1}
          </StyledPageBtn>
        ))}
        <PageMoveBtn onClick={onClickNextPage}>다음</PageMoveBtn>
      </PageNation>
    </StyledPostListItem>
  );
};

export default BoardListItem;

const PageNation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const StyledPostListItem = styled.div`
  margin: 0;
  padding: 10px;
`;

const PageMoveBtn = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const StyledPostItems = styled.div`
  cursor: pointer;
  background: none;
  border: none;
  border-bottom: 2px solid ${colors.gray_stroke};
  width: 100%;
  padding: 10px 10px;
  border-radius: 15px;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #00e595;
  }
`;

export const StyledLeftPostItem = styled.div``;

const StyledRightPostItem = styled.div`
  display: flex;
`;

export const StyledPostTitle = styled.div`
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.main_black};
  margin: 0;
`;

export const StyledPostItem = styled.div`
  color: ${colors.main_black};
  ${SubTextThinSmall};
  width: 100px;
  margin: 5px;
`;

const StyledPageBtn = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? "yellow" : "transparent")};
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  margin: 0 5px;
`;
