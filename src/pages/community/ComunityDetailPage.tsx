import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { colors } from "../../constants/colors";
import {
  deleteCommunityByCommunity_no,
  deleteReply,
  getDataByCommunity_noAndUser_id,
} from "../../api/api-community";
import { useEffect, useState } from "react";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import { dateSplice } from "../../utils/dateFomatting";
import * as fonts from "../../constants/fonts";
import { postReply } from "../../api/api-community";
import { getUserData } from "../../api/api-user";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import { useRecoilState } from "recoil";
import { EditContent } from "../../utils/CommunitiEdit";

export const CommunityDetailPage: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const location = useLocation();
  const path = location.pathname;
  const lastPathSegment = path.substring(path.lastIndexOf("/") + 1); //주소창 끝단어
  const [a, setA] = useState({
    content: "",
    title: "",
    user_name: "",
    updatedAt: "",
    read_users: [],
    file_name: "",
  });
  const [data, setData] = useRecoilState(EditContent);
  const [b, setB] = useState<any[]>([]);
  const [text, setText] = useState("");
  const [useId, setUserId] = useState("1");
  const [writerId, setWriterId] = useState("2");

  /** 나의정보를 불러와서 댓글을쓸때 아이디를 바로 반영하기위한 함수 */
  useEffect(() => {
    getUserData(String(localStorage.getItem("token"))).then((response) => {
      setUserId(response.data.user_id);
      getDataByCommunity(response.data.user_id);
    });
  }, []);

  /** 커뮤니티상세  내용컨테이너 */
  const getDataByCommunity = async (user_id: string) => {
    try {
      const getDataByCommunityResponse = await getDataByCommunity_noAndUser_id(
        Number(lastPathSegment),
        user_id
      );
      setA(getDataByCommunityResponse.data.data.updateContent);
      setWriterId(getDataByCommunityResponse.data.data.updateContent.user_id);
      setB(getDataByCommunityResponse.data.data.findReply);

      setData((a) => ({
        ...a,
        title: getDataByCommunityResponse.data.data.updateContent.title,
        content: getDataByCommunityResponse.data.data.updateContent.content,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  /** 커뮤니티 댓글입력  */
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  //마찬가지로 async await 사용하면 가독성이 더 좋아질 듯 -> 바꿀거임

  /** 댓글 등록 함수 */
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

  /** 커뮤니티 댓글 삭제 함수 */
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

  /** 커뮤니티 글 삭제 함수 */
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
              {a.updatedAt ? dateSplice(a.updatedAt) : ""}
            </StyledCommunitySunInfo>
            <StyledCommunitySunInfo>
              조회 : {a.read_users.length}
            </StyledCommunitySunInfo>
          </StyledCommunityInfoContainer>
          {/* 현재 나의 id와 글쓴이id가 같으면 수정 / 삭제 버튼이 생김 */}
          {useId === writerId ? (
            <FixButtonContainer>
              <FixButton
                onClick={() =>
                  navigate(`/Community/CommunityEditPage/${lastPathSegment}`)
                }
              >
                수정 <ChangeHistoryIcon></ChangeHistoryIcon>
              </FixButton>
              <DeleteButton onClick={writeHandleDelete}>
                삭제 <ClearIcon></ClearIcon>
              </DeleteButton>
            </FixButtonContainer>
          ) : (
            <div></div>
          )}
        </StyledCommunityInfo>
        <Divider />
        <StyledContent>{a.content}</StyledContent>

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

/** 커뮤니티상세 전체 박스 */
const StyledCommonContainer = styled.div`
  width: 1270px;
  margin: 0px auto;
`;

/** 커뮤니티상세 전체 박스 */
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FixButtonContainer = styled.div`
  display: flex;
`;

/** 커뮤니티상세 상단바 컨테이너 */
const StyledTitleTextContainer = styled.div`
  margin: 60px 0 25px;
  display: flex;
  align-items: center;
`;

/** 커뮤니티상세 전체 박스 */
const DeleteButton = styled.div`
  ${fonts.TitleText};
  margin: 0px 20px;
  color: ${colors.main_red};
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  width: 80px;
  height: 20px;
  font-size: 25px;
  cursor: pointer;
`;

/** 커뮤니티상세 수정버튼 */
const FixButton = styled.div`
  margin: 0px 20px;
  ${fonts.TitleText};
  color: ${colors.main_yellow};
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  width: 80px;
  height: 20px;
  font-size: 25px;
  cursor: pointer;
`;

/** 커뮤니티상세 컨테이너 */
const StyledCommunityInfoContainer = styled.div`
  display: flex;
`;

/** 커뮤니티상세 타이틀 */
const StyledTitle = styled.div`
  ${fonts.TitleText};
  color: ${colors.main_navy};
  margin-right: 20px;
`;

/** 커뮤니티상세 내용 */
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

/** 커뮤니티상세 수정버튼 */
const StyledCommunityTitle = styled.div`
  color: ${colors.main_navy};
  ${fonts.SubTextBig};
  margin: 15px 0 10px;
`;

/** 커뮤니티상세 정보 */
const StyledCommunityInfo = styled.div`
  display: flex;
  justify-content: space-between;
  ${fonts.SubTextThinSmall};
  color: ${colors.darkgray_navy};
  margin-bottom: 15px;
`;

/** 커뮤니티상세 내용 */
const StyledCommunitySunInfo = styled.div`
  margin-right: 15px;
  padding-right: 15px;
  border-right: 1px solid ${colors.darkgray_navy};

  &:last-child {
    border-right: none;
  }
`;

/** 커뮤니티상세 수정버튼 */
const StyledContent = styled.div`
  margin: 25px 0 40px;
  width: 1270px;
  overflow-wrap: break-word;
`;

/** 커뮤니티상세 댓글 내용 컨테이너 */
const StyledReplyInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 30px 0 10px;
`;

/** 커뮤니티상세 댓글 내용 */
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

/** 커뮤니티상세 댓글 등록버튼 */
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

/** 커뮤니티상세 댓글 컨테이너 Wrapper */
const StyledReplyContainerWrapper = styled.div`
  margin-bottom: 90px;
`;

/** 커뮤니티상세 댓글 컨테이너 */
const StyledReplyContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px 0;
`;

/** 커뮤니티상세 댓글 유저네임 */
const StyledReplyUserName = styled.div`
  color: ${colors.main_navy};
  ${fonts.SubTextSmall};
  margin-right: 40px;
`;

/** 커뮤니티상세 댓글 텍스트 */
const StyledReplyText = styled.div`
  color: ${colors.main_black};
  ${fonts.SubTextThinSmall};
`;

/** 커뮤니티 상세 댓글삭제버튼 */
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
