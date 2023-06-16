import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import { TitleText, SubTextThin, SubTextSmall } from "../../constants/fonts";
import { useLocation, useNavigate } from "react-router-dom";
import { putCommunity } from "../../api/api-community";
import { useRecoilState } from "recoil";
import { EditContent } from "../../utils/CommunitiEdit";

const CommunityEditPage: React.FC = ({}) => {
  const [data, setData] = useRecoilState(EditContent);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const lastPathSegment = path.substring(path.lastIndexOf("/") + 1);

  useEffect(() => {
    console.log(data);
  }, []);
  const onChangeTitleInput = (e: any) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const onChangeContentsInput = (e: any) => {
    console.log(e.target.value);
    setTitle(e.target.value);
  };

  const onClickEdit = () => {
    putCommunity(
      Number(lastPathSegment),
      title,
      content,
      String(localStorage.getItem("token"))
    );
    alert("수정 되었습니다");
    navigate(`/Community/communityDetailPage/${lastPathSegment}`);
  };

  return (
    <StyledCommonContainer>
      <StyledCreatePageContainer>
        <StyledTitleWrapper>
          <StyledTitleContainer>
            <StyledCreatePageTitle>커뮤니티 글 수정</StyledCreatePageTitle>
          </StyledTitleContainer>
          <StyledSubTitleContainer>
            <StyledCreatePageSubtitle>
              회원들과 정보를 공유해보세요.
            </StyledCreatePageSubtitle>
          </StyledSubTitleContainer>
        </StyledTitleWrapper>
        <StyledInputWrapper>
          <StyledTitle>제목</StyledTitle>
          <StyledInput placeholder={data.title} onChange={onChangeTitleInput} />
        </StyledInputWrapper>

        <StyledInputWrapper className="second-input-wrapper">
          <StyledTitle>내용</StyledTitle>
          <StyledTextarea
            placeholder={data.content}
            onChange={onChangeContentsInput}
          />
        </StyledInputWrapper>

        <StyledFileInputWrapper>
          <StyledFileInputContainer>
            <StyledTitle>파일 첨부</StyledTitle>
            <StyledSubtitle>파일을 첨부하세요.</StyledSubtitle>
            <FileInput type="file" id="fileInput" />
            {/* <FileUploader /> */}
            <StyledFileButton htmlFor="fileInput">파일찾기</StyledFileButton>
          </StyledFileInputContainer>
          <StyledAttachedFileListContainer>
            <StyledDelButton>삭제</StyledDelButton>
          </StyledAttachedFileListContainer>
        </StyledFileInputWrapper>
        <StyledFileButtonWrapper>
          <StyledCreateButton onClick={onClickEdit}>
            수정하기
          </StyledCreateButton>
        </StyledFileButtonWrapper>
      </StyledCreatePageContainer>
    </StyledCommonContainer>
  );
};

const StyledCommonContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
`;

const StyledCreatePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTitleWrapper = styled.div`
  margin: 60px 0 25px;
  width: 1270px;
  display: flex;
  align-items: flex-end; /* 폰트를 바닥에 같은 높이로 위치 */
`;

const StyledTitleContainer = styled.div`
  ${TitleText}
`;

const StyledCreatePageTitle = styled.p`
  color: ${colors.main_mint};
  margin: 0;
  margin-right: 40px;
`;

const StyledSubTitleContainer = styled.div`
  ${SubTextThin}
`;

const StyledCreatePageSubtitle = styled.p`
  margin: 0;
  color: ${colors.darkgray_navy};
`;

const StyledTitle = styled.div`
  color: ${colors.main_black};
  height: fit-content;
  font-size: 20px;
  font-weight: 600;
`;

const StyledInput = styled.input`
  width: 1107px;
  height: 45px;
  border: 1px solid ${colors.main_navy};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 300;
  box-sizing: border-box;
  line-height: 45px;
  padding-left: 20px;

  &::placeholder {
    color: ${colors.gray_navy};
    font-weight: bold;
    font-size: 15px;
  }
`;
const StyledTextarea = styled.textarea`
  width: 1107px;
  height: 400px;
  border: 1px solid ${colors.main_navy};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 300;
  box-sizing: border-box;
  padding: 20px;
  resize: none;
  &::placeholder {
    color: ${colors.gray_navy};
    font-weight: bold;
    font-size: 18px;
  }
  ::-webkit-scrollbar {
    width: 20px; /* 스크롤바 너비 */
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${colors.darkgray_navy}; /* 스크롤바 색상 */
    border-radius: 20px; /* 스크롤바 둥글게 */
    margin-right: 20px;
    border: solid 6px white;
  }
  ::-webkit-scrollbar-track {
    width: 14px;
    background-color: none; /* 스크롤바 트랙 색상 */
    border-radius: 4px; /* 스크롤바 트랙 둥글게 */
  }
`;

const StyledInputWrapper = styled.div`
  margin-bottom: 20px;
  width: 1270px;
  display: flex;
  justify-content: space-between;

  .second-input-wrapper {
    height: 400px;
    position: relative;

    ${StyledInput} {
      position: absolute;
      top: -20px;
      left: 0;
    }
  }
`;

const StyledFileInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const StyledFileInputWrapper = styled.div`
  width: 1270px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  ${StyledTitle} {
    margin-right: 77px;
    width: max-content;
    display: inline-block;
  }
`;

const StyledAttachedFileListContainer = styled.div`
  width: 1270px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 20px 0;
`;

const StyledSubtitle = styled.p`
  margin: 0;
  width: 960px;
  height: 45px;
  border: 1px solid ${colors.main_navy};
  border-radius: 10px;
  color: ${colors.darkgray_navy};
  font-size: 18px;
  font-weight: 300;
  box-sizing: border-box;
  line-height: 45px;
  padding-left: 20px;
`;

const FileInput = styled.input`
  display: none;
`;

const StyledFileButton = styled.label`
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

const FileList = styled.div`
  margin: 0;
  padding: 0;
  list-style: none;
  color: ${colors.darkgray_navy};
  ${SubTextSmall};
  width: 1060px;
`;

const FileListItem = styled.div``;

const FileAttachment = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
`;

const StyledFileButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 1270px;
`;
const StyledCreateButton = styled.button`
  padding: 10px 20px;
  background-color: ${colors.main_mint};
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  color: ${colors.main_navy};
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-bottom: 80px;
`;

const StyledDelButton = styled.button`
  color: ${colors.main_red};
  ${SubTextSmall};
  border: none;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-end;
  width: 45px;
`;

export default CommunityEditPage;
