import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { colors } from "../../constants/colors";
import { getDataByCommunity_noAndUser_id } from "../../api/api-community";
import { response } from "express";
import { useEffect, useState } from "react";
import { dateSplice } from "../../utils/dateFomatting";
import { style } from "@mui/system";
import * as fonts from "../../constants/fonts";
import { MdOutlineFileDownload } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const CommunityDetailPage: React.FC = () => {
  const [a, setA] = useState({
    content: "",
    title: "",
    user_name: "",
    updatedAt: "",
    read_users: [],
    file_name: "",
    reply_user_name: "",
    reply_content: "",
  });
  const [user_name, setUser_name] = useState("");
  const location = useLocation();
  const path = location.pathname;
  const lastPathSegment = path.substring(path.lastIndexOf("/") + 1);

  useEffect(() => {
    getDataByCommunity_noAndUser_id(Number(lastPathSegment), "asd")
      .then((response) => {
        console.log(response.data.data.updateContent);
        setA(response.data.data.updateContent);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  // getDataByCommunity_noAndUser_id(Number(lastPathSegment), "asd").then(
  //   (response) => {
  //     console.log(response.data);
  //   }
  // );
  const [text, setText] = useState('');
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
  };
  const handleDelete = () => {
    // setReply(null);
  };

  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate('/community/CommunityEditPage', { state: { post: a } });
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
          <StyledCommunitySunInfo>{a.user_name}</StyledCommunitySunInfo>
          <StyledCommunitySunInfo>
            {dateSplice(a.updatedAt)}
          </StyledCommunitySunInfo>
          <StyledCommunitySunInfo>
            조회 : {a.read_users.length}
          </StyledCommunitySunInfo>
        </StyledCommunityInfo>
        <Divider />
        <StyledContent>{a.content}</StyledContent>
        <StyledFileDownloadBtn>첨부파일1.docx{a.file_name}
          <MdOutlineFileDownload size={16} />
        </StyledFileDownloadBtn>
        <StyledReplyInputContainer>
          <StyledReplyInput value={text} onChange={handleTextChange} placeholder="댓글을 입력하세요." ></StyledReplyInput>
          <StyledReplyAddButton onClick={handleSubmit}>댓글 쓰기</StyledReplyAddButton>
        </StyledReplyInputContainer>
        <StyledReplyContainerWrapper>
          <StyledReplyContainer>
            <StyledReplyUserName>이름{a.reply_user_name}</StyledReplyUserName>
            <StyledReplyText>댓글내용 {a.reply_content}</StyledReplyText>
            <StyledDelButton onClick={handleDelete}>삭제</StyledDelButton>
          </StyledReplyContainer>
          <Divider />
          <StyledReplyContainer>
            <StyledReplyUserName>이름{a.reply_user_name}</StyledReplyUserName>
            <StyledReplyText>댓글내용 {a.reply_content}</StyledReplyText>
          </StyledReplyContainer>
          <Divider />
          {/* {user_name === a.user_name && ( */}
          <StyledEditButton onClick={handleEditClick}>수정하기</StyledEditButton>
          {/* )} */}
        </StyledReplyContainerWrapper>
      </StyledContainer>
    </StyledCommonContainer>
  );
};


const StyledCommonContainer = styled.div`
  width: 1270px;
  margin: 0px auto;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledTitleTextContainer = styled.div`
  margin: 60px 0 25px;
  display: flex;
  align-items: center;
`

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
  gap:40px;
  /* width: 200px;
  height: 45px; */
  width: fit-content;
  ${fonts.SubTextThinSmall};
  color: ${colors.darkgray_navy};
  background-color: ${colors.back_navy};
  border: none;
  border-radius: 10px;

`
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
`

const StyledReplyUserName = styled.div`
  color: ${colors.main_navy};
  ${fonts.SubTextSmall};
  margin-right: 40px;
`

const StyledReplyText = styled.div`
  color: ${colors.main_black};
  ${fonts.SubTextThinSmall};
`

const StyledDelButton = styled.button`
  color: ${colors.darkgray_navy};
  ${fonts.SubTextThinSmall};
  border: none;
  background-color: #ffffff;
  display: flex;  
  justify-content: flex-end;
  width: 45px;
  margin-left: auto;
`

const StyledEditButton = styled.button`
  padding: 10px 20px;
  background-color: ${colors.main_mint};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.main_navy};
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50px;
  right: 0;
`