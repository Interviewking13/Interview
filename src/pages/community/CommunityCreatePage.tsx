import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import { TitleText, SubTextThin, SubTextSmall } from '../../constants/fonts';
import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
// import FileUploader from "../../components/UI/FileUploader";

const postCommunity = async (data: { title: string, content: string, attach: string }) => {
  try {
    console.log('Posted Data:', data);
    const response = await axiosInstance.post('/community/detl', data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const CommunityCreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  // const [file, setFile] = useState(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    // const selectedFiles = e.target.files;
    // if (selectedFiles && selectedFiles.length > 0) {
    //   const selectedFile = selectedFiles[0];
    //   setFile(selectedFile);
    // }
  };

  // 미리 선언해둔 postCommunity api service함수를 가져와서 사용했습니다.
  // useMutation의 반환값인 postCommunityMutate을 호출하면 해당 api가 호출됩니다.
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: postCommunityMutate } = useMutation(postCommunity, {
    // useQuery와 동일합니다 에러가 나면 실행되는 함수입니다.
    onError: (error) => {
      console.error("Error:", error);
    },
    // 말그대로 성공하면 실행되는 함수입니다.
    // 글을 생성하는 post니까 성공했을 땐 여기서 queryClient.invalidates([{postListAPI의 키값}])같은 코드를 넣어주면 글쓰기가 성공했을 때 자동으로 업데이트되겠죠?
    onSuccess: (data) => {
      console.log("성공: ", data);
      queryClient.invalidateQueries('communityList');
      navigate('/community/list');
    },
  });

  const handleSubmit = () => {
    // 이런식으로 호출하시면됩니다.
    postCommunityMutate({ title: title, content: content, attach: "" });
  };
  //   const formData = new FormData();
  //   formData.append('title', title);
  //   formData.append('content', content);
  //   formData.append('attach', "");
  //   if (file) {
  //     formData.append('file', file);
  //   }

  //   postCommunityMutate(formData);
  // };

  const handleDelete = () => {
    setFile(null);
  };


  return (
    <StyledCommonContainer>

      <StyledCreatePageContainer>
        <StyledTitleWrapper>
          <StyledTitleContainer>
            <StyledCreatePageTitle>커뮤니티 글 쓰기</StyledCreatePageTitle>
          </StyledTitleContainer>
          <StyledSubTitleContainer>
            <StyledCreatePageSubtitle>회원들과 정보를 공유해보세요.</StyledCreatePageSubtitle>
          </StyledSubTitleContainer>
        </StyledTitleWrapper>
        <StyledInputWrapper>
          <StyledTitle>제목</StyledTitle>
          <StyledInput value={title} onChange={handleTitleChange} placeholder="스터디 이름을 입력하세요." />
        </StyledInputWrapper>

        <StyledInputWrapper className="second-input-wrapper">
          <StyledTitle>내용</StyledTitle>
          <StyledTextarea value={content} onChange={handleContentChange} placeholder="스터디 설명을 입력하세요." />
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
            {file && (
              <FileList>
                <FileListItem>
                  <FileAttachment href={URL.createObjectURL(file)} download>
                    {file.name}
                  </FileAttachment>
                </FileListItem>
              </FileList>
            )}
            <StyledDelButton onClick={handleDelete}>삭제</StyledDelButton>
          </StyledAttachedFileListContainer>
        </StyledFileInputWrapper>
        <StyledFileButtonWrapper>
          <StyledCreateButton onClick={handleSubmit}>글쓰기</StyledCreateButton>
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
`;

const StyledInputWrapper = styled.div`
  margin-bottom: 20px;
  width: 1270px;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
  /* margin-bottom: 15px; */
  /* align-self: flex-end; */
`

export default CommunityCreatePage;
