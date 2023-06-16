import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../../constants/colors";
import {
  deleteCommunityByCommunity_no,
  deleteReply,
  getDataByCommunity_noAndUser_id,
} from "../../api/api-community";
import { useEffect, useState } from "react";
import { dateSplice } from "../../utils/dateFomatting";
import * as fonts from "../../constants/fonts";
import { MdOutlineFileDownload } from "react-icons/md";
import { postReply } from "../../api/api-community";
import { getUserData } from "../../api/api-user";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import { useRecoilState } from "recoil";
import { EditContent } from "../../utils/CommunitiEdit";
export const CommunityDetailPage: React.FC = () => {
  const [a, setA] = useState({
    content: "",
    title: "",
    user_name: "",
    updatedAt: "",
    read_users: [],
    file_name: "",
  });

  const navigate = useNavigate(); // useNavigate 훅 사용
  const [data, setData] = useRecoilState(EditContent);
  const [b, setB] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [useId, setUserId] = useState("1");
  const [writerId, setWriterId] = useState("2");
  const location = useLocation();
  const path = location.pathname;
  const lastPathSegment = path.substring(path.lastIndexOf("/") + 1);
  useEffect(() => {
    getUserData(String(localStorage.getItem("token"))).then((response) => {
      setUserId(response.data.user_id);
      console.log(response.data.user_id);
      getDataByCommunity(response.data.user_id);
    });
  }, []);

  const getDataByCommunity = async (user_id: string) => {
    try {
      const getDataByCommunityResponse = await getDataByCommunity_noAndUser_id(
        Number(lastPathSegment),
        user_id
      );
      setA(getDataByCommunityResponse.data.data.updateContent);
      setWriterId(getDataByCommunityResponse.data.data.updateContent.user_id);
      setB(getDataByCommunityResponse.data.data.findReply);
      console.log(getDataByCommunityResponse.data.data.updateContent.title);
      console.log(getDataByCommunityResponse.data.data.updateContent.content);
      console.log(getDataByCommunityResponse.data.data.findReply);

      setData((a) => ({
        ...a,
        title: getDataByCommunityResponse.data.data.updateContent.title,
        content: getDataByCommunityResponse.data.data.updateContent.content,
      }));
    } catch (e) {
      console.log(e);
    }
  };
  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };
  //마찬가지로 async await 사용하면 가독성이 더 좋아질 듯
  const handleSubmit = async (e: any) => {
    try {
      const postReplyResponse = await postReply(
        useId,
        text,
        Number(lastPathSegment)
      );
      if (!postReplyResponse.data) {
        throw Error("댓글 작성 실패");
      }
      getDataByCommunity(useId);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (targetId: number) => {
    try {
      const deleteMyReply = await deleteReply(
        targetId,
        String(localStorage.getItem("token"))
      );
      getDataByCommunity(useId);
    } catch (error) {
      console.log(error);
    }
  };

  const writeHandleDelete = async () => {
    try {
      const deleteMyReply = await deleteCommunityByCommunity_no(
        Number(lastPathSegment),
        String(localStorage.getItem("token"))
      );
      alert("삭제 되었습니다");

      navigate(`/community/communityPage`);
    } catch (error) {
      console.log(error);
    }
  };

  const writeHandleEdit = async () => {
    try {
      navigate(`/Community/CommunityEditPage/${lastPathSegment}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <StyledCommonContainer>
      <StyledContainer>
        <StyledTitleTextContainer>
          <StyledTitle>커뮤니티</StyledTitle>
          <StyledText>회원들과 정보를 공유해보세요.</StyledText>
        </StyledTitleTextContainer>
        <DividerNavy />
        <StyledCommunityTitle>{a.title}</StyledCommunityTitle>
        <StyledCommunityInfo>
          <StyledCommunityInfoContainer>
            <StyledCommunitySunInfo>{a.user_name}</StyledCommunitySunInfo>
            <StyledCommunitySunInfo>
              {dateSplice(a.updatedAt)}
            </StyledCommunitySunInfo>
            <StyledCommunitySunInfo>
              조회 : {a.read_users.length}
            </StyledCommunitySunInfo>
          </StyledCommunityInfoContainer>
          {useId === writerId ? (
            <FixButtonContainer>
              <FixButton
                onClick={() =>
                  navigate(`/Community/CommunityEditPage/${lastPathSegment}`)
                }
              >
                수정 <ClearIcon></ClearIcon>
              </FixButton>
              <FixButton onClick={writeHandleDelete}>
                삭제 <ClearIcon></ClearIcon>
              </FixButton>
            </FixButtonContainer>
          ) : (
            <div></div>
          )}
        </StyledCommunityInfo>
        <Divider />
        <StyledContent>{a.content}</StyledContent>
        <StyledFileDownloadBtn>
          첨부파일1.docx{a.file_name}
          <MdOutlineFileDownload size={16} />
        </StyledFileDownloadBtn>
        <StyledReplyInputContainer>
          <StyledReplyInput
            value={text}
            onChange={handleTextChange}
            placeholder="댓글을 입력하세요."
          ></StyledReplyInput>
          <StyledReplyAddButton onClick={handleSubmit}>
            댓글 쓰기
          </StyledReplyAddButton>
        </StyledReplyInputContainer>
        <StyledReplyContainerWrapper>
          {b.map((b) => (
            <div key={b.reply_id} id={b.reply_user_id}>
              <StyledReplyContainer>
                <StyledReplyUserName>{b.reply_user_name}</StyledReplyUserName>
                <StyledReplyText>{b.reply_content}</StyledReplyText>
                {b.reply_user_id === useId ? (
                  <StyledDelButton onClick={() => handleDelete(b.reply_id)}>
                    삭제
                  </StyledDelButton>
                ) : (
                  <div></div>
                )}
              </StyledReplyContainer>
              <Divider />
            </div>
          ))}
        </StyledReplyContainerWrapper>
      </StyledContainer>
    </StyledCommonContainer>
  );
};

const FixButtonContainer = styled.div`
  display: flex;
`;
const FixButton = styled.div`
  margin: 0px 20px;
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  width: 80px;
  height: 20px;
  font-size: 20px;
  cursor: pointer;
`;
const StyledCommunityInfoContainer = styled.div`
  display: flex;
`;
const StyledCommonContainer = styled.div`
  width: 1270px;
  margin: 0px auto;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTitleTextContainer = styled.div`
  margin: 60px 0 25px;
  display: flex;
  align-items: center;
`;

const StyledTitle = styled.div`
  ${fonts.TitleText};
  color: ${colors.main_navy};
  margin-right: 20px;
`;

const StyledText = styled.div`
  ${fonts.SubTextThin};
  color: ${colors.darkgray_navy};
`;

const DividerNavy = styled.div`
  border: 1px solid ${colors.gray_navy};
`;

const Divider = styled.div`
  border: 1px solid ${colors.gray_stroke};
`;

const StyledCommunityTitle = styled.div`
  color: ${colors.main_navy};
  ${fonts.SubTextBig};
  margin: 15px 0 10px;
`;

const StyledCommunityInfo = styled.div`
  display: flex;
  justify-content: space-between;
  ${fonts.SubTextThinSmall};
  color: ${colors.darkgray_navy};
  margin-bottom: 15px;
`;

const StyledCommunitySunInfo = styled.div`
  margin-right: 15px;
  padding-right: 15px;
  border-right: 1px solid ${colors.darkgray_navy};

  &:last-child {
    border-right: none;
  }
`;

const StyledContent = styled.div`
  margin: 25px 0 40px;
  width: 1270px;
  overflow-wrap: break-word;
`;

const StyledFileDownloadBtn = styled.button`
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
  /* width: 200px;
  height: 45px; */
  width: fit-content;
  ${fonts.SubTextThinSmall};
  color: ${colors.darkgray_navy};
  background-color: ${colors.back_navy};
  border: none;
  border-radius: 10px;
`;
const StyledReplyInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 30px 0 10px;
`;

const StyledReplyInput = styled.input`
  margin: 0;
  width: 1123px;
  height: 45px;
  border: 1px solid ${colors.darkgray_navy};
  border-radius: 10px;
  color: ${colors.darkgray_navy};
  font-size: 18px;
  font-weight: 300;
  box-sizing: border-box;
  line-height: 45px;
  padding-left: 20px;
  &::placeholder {
    color: ${colors.gray_navy};
  }
`;

const StyledReplyAddButton = styled.label`
  width: 132px;
  height: 45px;
  font-size: 18px;
  font-weight: 600;
  background-color: ${colors.dark_navy};
  border-radius: 10px;
  text-align: center;
  line-height: 45px;
  color: #fff;
  cursor: pointer;
  margin-left: 15px;
`;

const StyledReplyContainerWrapper = styled.div`
  margin-bottom: 90px;
`;

const StyledReplyContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px 0;
`;

const StyledReplyUserName = styled.div`
  color: ${colors.main_navy};
  ${fonts.SubTextSmall};
  margin-right: 40px;
`;

const StyledReplyText = styled.div`
  color: ${colors.main_black};
  ${fonts.SubTextThinSmall};
`;

const StyledDelButton = styled.button`
  cursor: pointer;
  color: ${colors.darkgray_navy};
  ${fonts.SubTextThinSmall};
  border: none;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-end;
  width: 45px;
  margin-left: auto;
`;

// import styled from "styled-components";
// import { useLocation } from "react-router-dom";
// import { colors } from "../../constants/colors";
// import {
//   deleteReply,
//   getDataByCommunity_noAndUser_id,
// } from "../../api/api-community";
// import { useEffect, useState } from "react";
// import { dateSplice } from "../../utils/dateFomatting";
// import * as fonts from "../../constants/fonts";
// import { MdOutlineFileDownload } from "react-icons/md";
// import { postReply } from "../../api/api-community";

// export const CommunityDetailPage: React.FC = () => {
//   const [a, setA] = useState({
//     content: "",
//     title: "",
//     user_name: "",
//     updatedAt: "",
//     read_users: [],
//     file_name: "",
//   });
//   const [b, setB] = useState<any[]>([]);

//   const location = useLocation();
//   const path = location.pathname;
//   const lastPathSegment = path.substring(path.lastIndexOf("/") + 1);

//   useEffect(() => {
//     getDataByCommunity_noAndUser_id(
//       Number(lastPathSegment),
//       "6487ea3c2188ede075315499"
//     )
//       .then((response) => {
//         setA(response.data.data.updateContent);
//         setB(response.data.data.findReply);
//         console.log(response.data.data.updateContent);
//         console.log(response.data.data.findReply);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const [text, setText] = useState("");

//   const handleTextChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setText(e.target.value);
//   };

//   const handleSubmit = (e: any) => {
//     postReply("6487ea3c2188ede075315499", text, Number(lastPathSegment))
//       .then((response) => {
//         console.log(response.data);
//         getDataByCommunity_noAndUser_id(
//           Number(lastPathSegment),
//           "6487ea3c2188ede075315499"
//         )
//           .then((response) => {
//             setB(response.data.data.findReply);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       })
//       .catch((error) => {
//         console.error(error);
//       });

//     setText("");
//   };
//   const handleDelete = (e: any) => {
//     console.log(Number(e.target.id));
//     deleteReply(Number(e.target.id))
//       .then((response) => {
//         console.log(response.data);
//         getDataByCommunity_noAndUser_id(
//           Number(lastPathSegment),
//           "6487ea3c2188ede075315499"
//         )
//           .then((response) => {
//             setB(response.data.data.findReply);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <StyledCommonContainer>
//       <StyledContainer>
//         <StyledTitleTextContainer>
//           <StyledTitle>커뮤니티</StyledTitle>
//           <StyledText>회원들과 정보를 공유해보세요.</StyledText>
//         </StyledTitleTextContainer>
//         <DividerNavy />
//         <StyledCommunityTitle>{a.title}</StyledCommunityTitle>
//         <StyledCommunityInfo>
//           <StyledCommunitySunInfo>{a.user_name}</StyledCommunitySunInfo>
//           <StyledCommunitySunInfo>
//             {dateSplice(a.updatedAt)}
//           </StyledCommunitySunInfo>
//           <StyledCommunitySunInfo>
//             조회 : {a.read_users.length}
//           </StyledCommunitySunInfo>
//         </StyledCommunityInfo>
//         <Divider />
//         <StyledContent>{a.content}</StyledContent>
//         <StyledFileDownloadBtn>
//           첨부파일1.docx{a.file_name}
//           <MdOutlineFileDownload size={16} />
//         </StyledFileDownloadBtn>
//         <StyledReplyInputContainer>
//           <StyledReplyInput
//             value={text}
//             onChange={handleTextChange}
//             placeholder="댓글을 입력하세요."
//           ></StyledReplyInput>
//           <StyledReplyAddButton onClick={handleSubmit}>
//             댓글 쓰기
//           </StyledReplyAddButton>
//         </StyledReplyInputContainer>
//         <StyledReplyContainerWrapper>
//           {b.map((b) => (
//             <div key={b.reply_id} id={b.reply_user_id}>
//               <StyledReplyContainer>
//                 <StyledReplyUserName>{b.reply_user_name}</StyledReplyUserName>
//                 <StyledReplyText>{b.reply_content}</StyledReplyText>
//                 {b.reply_user_id === "6487ea3c2188ede075315499" ? (
//                   <StyledDelButton id={b.reply_id} onClick={handleDelete}>
//                     삭제
//                   </StyledDelButton>
//                 ) : (
//                   <div></div>
//                 )}
//               </StyledReplyContainer>
//               <Divider />
//             </div>
//           ))}
//         </StyledReplyContainerWrapper>
//       </StyledContainer>
//     </StyledCommonContainer>
//   );
// };

// const StyledCommonContainer = styled.div`
//   width: 1270px;
//   margin: 0px auto;
// `;

// const StyledContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const StyledTitleTextContainer = styled.div`
//   margin: 60px 0 25px;
//   display: flex;
//   align-items: center;
// `;

// const StyledTitle = styled.div`
//   ${fonts.TitleText};
//   color: ${colors.main_navy};
//   margin-right: 20px;
// `;

// const StyledText = styled.div`
//   ${fonts.SubTextThin};
//   color: ${colors.darkgray_navy};
// `;

// const DividerNavy = styled.div`
//   border: 1px solid ${colors.gray_navy};
// `;

// const Divider = styled.div`
//   border: 1px solid ${colors.gray_stroke};
// `;

// const StyledCommunityTitle = styled.div`
//   color: ${colors.main_navy};
//   ${fonts.SubTextBig};
//   margin: 15px 0 10px;
// `;

// const StyledCommunityInfo = styled.div`
//   display: flex;
//   ${fonts.SubTextThinSmall};
//   color: ${colors.darkgray_navy};
//   margin-bottom: 15px;
// `;

// const StyledCommunitySunInfo = styled.div`
//   margin-right: 15px;
//   padding-right: 15px;
//   border-right: 1px solid ${colors.darkgray_navy};

//   &:last-child {
//     border-right: none;
//   }
// `;

// const StyledContent = styled.div`
//   margin: 25px 0 40px;
//   width: 1270px;
//   overflow-wrap: break-word;
// `;

// const StyledFileDownloadBtn = styled.button`
//   padding: 15px 20px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   gap: 40px;
//   /* width: 200px;
//   height: 45px; */
//   width: fit-content;
//   ${fonts.SubTextThinSmall};
//   color: ${colors.darkgray_navy};
//   background-color: ${colors.back_navy};
//   border: none;
//   border-radius: 10px;
// `;
// const StyledReplyInputContainer = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   margin: 30px 0 10px;
// `;

// const StyledReplyInput = styled.input`
//   margin: 0;
//   width: 1123px;
//   height: 45px;
//   border: 1px solid ${colors.darkgray_navy};
//   border-radius: 10px;
//   color: ${colors.darkgray_navy};
//   font-size: 18px;
//   font-weight: 300;
//   box-sizing: border-box;
//   line-height: 45px;
//   padding-left: 20px;
//   &::placeholder {
//     color: ${colors.gray_navy};
//   }
// `;

// const StyledReplyAddButton = styled.label`
//   width: 132px;
//   height: 45px;
//   font-size: 18px;
//   font-weight: 600;
//   background-color: ${colors.dark_navy};
//   border-radius: 10px;
//   text-align: center;
//   line-height: 45px;
//   color: #fff;
//   cursor: pointer;
//   margin-left: 15px;
// `;

// const StyledReplyContainerWrapper = styled.div`
//   margin-bottom: 90px;
// `;

// const StyledReplyContainer = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   margin: 20px 0;
// `;

// const StyledReplyUserName = styled.div`
//   color: ${colors.main_navy};
//   ${fonts.SubTextSmall};
//   margin-right: 40px;
// `;

// const StyledReplyText = styled.div`
//   color: ${colors.main_black};
//   ${fonts.SubTextThinSmall};
// `;

// const StyledDelButton = styled.button`
//   cursor: pointer;
//   color: ${colors.darkgray_navy};
//   ${fonts.SubTextThinSmall};
//   border: none;
//   background-color: #ffffff;
//   display: flex;
//   justify-content: flex-end;
//   width: 45px;
//   margin-left: auto;
// `;
