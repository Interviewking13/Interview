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
        setAllPosts(data.data);
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
          // onClick={() => onItemClick(post.community_id)}
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
      <PageMoveBtn onClick={onClickPrevPage}>이전 페이지</PageMoveBtn>
      {Array.from({ length: lastPage }).map((_, index) => (
        <StyledPageBtn
          key={index + 1}
          isActive={index + 1 === startPage}
          onClick={() => onClickPageBtn(index + 1)}
        >
          {index + 1}
        </StyledPageBtn>
      ))}
      <PageMoveBtn onClick={onClickNextPage}>다음 페이지</PageMoveBtn>
    </StyledPostListItem>
  );
};

export default BoardListItem;

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

const StyledPostItems = styled.div`
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

const StyledLeftPostItem = styled.div``;

const StyledRightPostItem = styled.div`
  display: flex;
`;

const StyledPostTitle = styled.div`
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: 500;
  color: ${colors.main_black};
  margin: 0;
`;

const StyledPostItem = styled.div`
  color: ${colors.main_black};
  ${SubTextThinSmall};
  width: 100px;
  margin: 5px;
`;

const StyledPageBtn = styled.button<{ isActive: boolean }>`
  background-color: ${({ isActive }) => (isActive ? "#00e595" : "transparent")};
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  margin: 0 5px;
`;

// import React, { useEffect, useState } from "react";
// import styled, { css } from "styled-components";
// import axios from "axios";
// import { colors } from "../../../constants/colors";
// import { SubTextThinSmall } from "../../../constants/fonts";
// import { getAllCommunityData } from "../../../api/api-community";

// const BoardListItem: React.FC = () => {
//   const [startPage, setStartPage] = useState(1);
//   const [lastPage, setLastpage] = useState(1);
//   const [allposts, allsetPosts] = useState<any[]>([]); // 게시글 전체데이터를 저장할 상태
//   const [posts, setPosts] = useState<any[]>([]); // 게시글 데이터를 저장할 상태
//   let a = posts.slice(0, 10);
//   useEffect(() => {
//     // 페이지 로드 시 서버에서 게시글 데이터를 받아와 상태 업데이트
//     getAllCommunityData()
//       .then((response) => {
//         setLastpage(Math.ceil(response.data.data.length / 10));
//         console.log(response.data); // 응답 데이터 구조 확인
//         setPosts(response.data.data); // 받아온 데이터로 게시글 상태 업데이트
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const onClickPageBtn = (e: any) => {
//     console.log(e.target.id);
//     setPosts(allposts.slice((e.target.id - 1) * 10, e.target.id * 10));
//   };

//   const onItemClick = (e: any) => {
//     console.log(e.currentTarget.id);
//   };
//   return (
//     <StyledPostListItem>
//       {/* 글 목록 렌더링 */}
//       {posts.map((post) => (
//         <StyledPostItems
//           key={post.community_id}
//           id={post.community_id}
//           onClick={onItemClick}
//         >
//           <StyledLeftPostItem>
//             <StyledPostTitle>{post.title}</StyledPostTitle>
//           </StyledLeftPostItem>
//           <StyledRightPostItem>
//             <StyledPostItem>조회 수: {post.read_users.length}</StyledPostItem>
//             <StyledPostItem>{post.user_name}</StyledPostItem>
//             <StyledPostItem>{post.timestamps}</StyledPostItem>
//           </StyledRightPostItem>
//         </StyledPostItems>
//       ))}
//       <PageMoveBtn>이전페이지</PageMoveBtn>
//       {new Array(lastPage).fill(0).map((_, index) => (
//         <button
//           key={index}
//           id={String(index + startPage)}
//           onClick={onClickPageBtn}
//         >
//           {index + startPage}
//         </button>
//       ))}
//       <PageMoveBtn>다음페이지</PageMoveBtn>
//     </StyledPostListItem>
//   );
// };

// export default BoardListItem;

// const StyledPostListItem = styled.div`
//   margin: 0;
//   padding: 10px;
// `;
// const PageMoveBtn = styled.button`
//   width: 70px;
//   height: 50px;
// `;
// const StyledPostItems = styled.div`
//   cursor: pointer;
//   background: none;
//   border: none;
//   border-bottom: 2px solid ${colors.gray_stroke};
//   width: 100%;
//   padding: 10px 10px;
//   border-radius: 15px;
//   margin: 0;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   &:hover {
//     background-color: #00e595; /* 호버 시 변경할 색상 */
//   }
// `;

// const StyledLeftPostItem = styled.div``;

// const StyledRightPostItem = styled.div`
//   display: flex;
// `;

// const StyledPostTitle = styled.div`
//   text-overflow: ellipsis;
//   font-size: 18px;
//   font-weight: 500;
//   color: ${colors.main_black};
//   margin: 0;
// `;

// const StyledPostItem = styled.div`
//   color: ${colors.main_black};
//   ${SubTextThinSmall};

//   width: 100px;
//   margin: 5px;
// `;
