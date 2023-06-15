import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { TitleText, SubTextThin, SubTextSmall } from '../../constants/fonts';
import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';


interface CommunityPost {
  id: string;
  title: string;
  content: string;
  attach: string;
  user_id: string;
}

interface CommunityEditPageProps {
  post?: CommunityPost;
}

const getCommunityPost = async (postId: string) => {
  try {
    const response = await axiosInstance.get(`/community/detl/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const putCommunity = async (data: { community_no: number, title: string, content: string }) => {
  try {
    const response = await axiosInstance.put('/community/detl', data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const CommunityEditPage: React.FC<CommunityEditPageProps> = ({ post }) => {
  const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post) {
      setPostId(post.id);
      getPostDataMutate(post.id);
    }
  }, [post]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;

  };


  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: getPostDataMutate } = useMutation(getCommunityPost, {
    onSuccess: (data) => {
      setTitle(data.title);
      setContent(data.content);
    },
  });

  const { mutate: putCommunityMutate } = useMutation(putCommunity, {
    onError: (error) => {
      console.error('Error:', error);
    },
    onSuccess: (data) => {
      console.log('성공: ', data);
      // queryClient.invalidateQueries('communityList');
      navigate(`/Community/communityDetailPage/${data.data.community_id}`);
    },
  });

  const handleGetPostData = () => {
    getPostDataMutate(postId);
  };

  const handleSubmit = () => {
    putCommunityMutate({ community_no: parseInt(postId), title, content });
  };

  const handleDelete = () => {
    // 삭제 로직 구현
  };


  return (
    <StyledCommonContainer>

      <StyledCreatePageContainer>
        <StyledTitleWrapper>
          <StyledTitleContainer>
            <StyledCreatePageTitle>커뮤니티 글 수정</StyledCreatePageTitle>
          </StyledTitleContainer>
          <StyledSubTitleContainer>
            <StyledCreatePageSubtitle>회원들과 정보를 공유해보세요.</StyledCreatePageSubtitle>
          </StyledSubTitleContainer>
        </StyledTitleWrapper>
        <StyledInputWrapper>
          <StyledTitle>제목</StyledTitle>
          <StyledInput value={title || post?.title || ''} onChange={handleTitleChange} placeholder="" />
        </StyledInputWrapper>

        <StyledInputWrapper className="second-input-wrapper">
          <StyledTitle>내용</StyledTitle>
          <StyledTextarea value={content || post?.content || ''} onChange={handleContentChange} placeholder="" />
        </StyledInputWrapper>

        <StyledFileInputWrapper>
          <StyledFileInputContainer>
            <StyledTitle>파일 첨부</StyledTitle>
            <StyledSubtitle>파일을 첨부하세요.</StyledSubtitle>
            <FileInput type="file" id="fileInput" onChange={handleFileChange} />
            {/* <FileUploader /> */}
            <StyledFileButton htmlFor="fileInput">파일찾기</StyledFileButton>
          </StyledFileInputContainer>
          <StyledAttachedFileListContainer>
            <StyledDelButton onClick={handleDelete}>삭제</StyledDelButton>
          </StyledAttachedFileListContainer>
        </StyledFileInputWrapper>
        <StyledFileButtonWrapper>
          <StyledCreateButton onClick={handleSubmit}>수정하기</StyledCreateButton>
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

const FileListItem = styled.div`
`;

const FileAttachment = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
`;

const StyledFileButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 1270px;
`
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
`

export default CommunityEditPage;
