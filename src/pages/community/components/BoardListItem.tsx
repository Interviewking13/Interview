import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../../constants/colors";
import {
  SubTextThin,
  SubTextThinSmall,
  SubText,
} from "../../../constants/fonts";
import { getAllCommunityData } from "../../../api/api-community";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../../api/api-user";
import { dateSplice } from "../../../utils/dateFomatting";

interface BoardListItemProps {
  tap: number;
}

const BoardListItem: React.FC<BoardListItemProps> = ({ tap }) => {
  const [startPage, setStartPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [useId, setUserId] = useState("");
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const navigate = useNavigate(); // useNavigate 훅 사용
  useEffect(() => {
    getUserData(String(localStorage.getItem("token"))).then((response) => {
      setUserId(response.data.user_id);
      console.log(response.data.user_id);
      console.log(response.data);
    });
  });
  useEffect(() => {
    getAllCommunityData()
      .then((response) => {
        const { data } = response;
        setAllPosts(data.data);
        console.log(data.data.reverse());
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
      {tap == 1 ? (
        <StyledPostListItemBox>
          {posts.map((post, index) => (
            <StyledPostItems
              onClick={onItemClick}
              key={index}
              id={post.community_id}
            >
              <StyledLeftPostItem>
                <StyledPostTitle>{post.title}</StyledPostTitle>
              </StyledLeftPostItem>
              <StyledRightPostItem>
                <StyledPostItem>댓글 수 : {post.reply_count}</StyledPostItem>
                <StyledPostItem>
                  조회 수 : {post.read_users.length}
                </StyledPostItem>
                <StyledPostItem>{post.user_name}</StyledPostItem>
                <StyledPostItem>{dateSplice(post.updatedAt)}</StyledPostItem>
              </StyledRightPostItem>
            </StyledPostItems>
          ))}
          <PageNation>
            <PageMoveBtn onClick={onClickPrevPage}>&lt;</PageMoveBtn>
            {Array.from({ length: lastPage }).map((_, index) => (
              <StyledPageBtn
                key={index + 1}
                isActive={index + 1 === startPage}
                onClick={() => onClickPageBtn(index + 1)}
              >
                {index + 1}
              </StyledPageBtn>
            ))}
            <PageMoveBtn onClick={onClickNextPage}>&gt;</PageMoveBtn>
          </PageNation>
        </StyledPostListItemBox>
      ) : (
        <StyledPostListItemBox>
          {posts
            .filter((post) => post.user_id === useId)
            .map((filteredPost, index) => (
              <StyledPostItems
                onClick={onItemClick}
                id={filteredPost.community_id}
                key={index}
              >
                <StyledLeftPostItem>
                  <StyledPostTitle>{filteredPost.title}</StyledPostTitle>
                </StyledLeftPostItem>
                <StyledRightPostItem>
                  <StyledPostItem>
                    댓글 수 : {filteredPost.reply_count}
                  </StyledPostItem>
                  <StyledPostItem>
                    조회 수 : {filteredPost.read_users.length}
                  </StyledPostItem>
                  <StyledPostItem>{filteredPost.user_name}</StyledPostItem>
                  <StyledPostItem>
                    {dateSplice(filteredPost.updatedAt)}
                  </StyledPostItem>
                </StyledRightPostItem>
              </StyledPostItems>
            ))}
        </StyledPostListItemBox>
      )}
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
  border-bottom: 1px solid ${colors.gray_stroke};
  padding: 10px 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledLeftPostItem = styled.div``;

const StyledRightPostItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StyledPostTitle = styled.div`
  width: 430px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ${SubText};
  color: ${colors.main_black};
  margin: 0;
`;

const StyledPostListItemBox = styled.div`
  border: 1px solid ${colors.darkgray_navy};
  border-radius: 10px;
  padding: 0 20px;
`;

export const StyledPostItem = styled.div`
  margin-left: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${colors.main_black};
  ${SubTextThinSmall};
  width: 100px;
`;

const StyledPageBtn = styled.button<{ isActive: boolean }>`
  color: ${({ isActive }) =>
    isActive ? `${colors.main_black}` : `${colors.main_gray}`};
  background-color: #fff;
  ${SubTextThin};
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  margin: 0 5px;
`;
