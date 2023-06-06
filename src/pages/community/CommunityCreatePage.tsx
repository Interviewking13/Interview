import React, { useState } from 'react';
import styled from 'styled-components';

const CommunityCreatePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // 글쓰기 버튼 클릭 시 처리 로직
    // API 호출 또는 상태 업데이트 등
    console.log('Submit');
  };

  const handleDelete = () => {
    // 글삭제 버튼 클릭 시 처리 로직
    // API 호출 또는 상태 업데이트 등
    console.log('Delete');
  };

  return (
    <StyledCreatePageContainer>
      <StyledCreatePageTitle>커뮤니티 글 쓰기</StyledCreatePageTitle>
      <StyledCreatePageSubtitle>회원들과 정보를 공유해보세요.</StyledCreatePageSubtitle>
      <StyledTitleInputWrapper>
        <StyledTitle>제목</StyledTitle>
        <Input type="text" placeholder="스터디 이름을 입력하세요." value={title} onChange={handleTitleChange} />

      </StyledTitleInputWrapper>

      <StyledTextInputWrapper>
        <StyledTitle>내용</StyledTitle>
        <Input type="text" value={content} onChange={handleContentChange} placeholder="스터디 설명을 입력하세요." />

      </StyledTextInputWrapper>

      <StyledFileInputWrapper>
        <StyledTitle>파일 첨부</StyledTitle>
        <FileInput type="file" onChange={handleFileChange} placeholder="파일을 첨부하세요." />
      </StyledFileInputWrapper>
      <StyledDelButton onClick={handleDelete}>삭제</StyledDelButton>
      <StyledCreateButton onClick={handleSubmit}>글쓰기</StyledCreateButton>

    </StyledCreatePageContainer>
  );
};

const StyledCreatePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 요소들을 가운데 정렬합니다 */
  align-items: center;
`;

const StyledCreatePageTitle = styled.h2`
  height: fit-content;
  font-family: 'establish Retrosans';
  color: #00E595;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StyledCreatePageSubtitle = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`;

const StyledTitle = styled.div`
  
`;

const StyledFileInputWrapper = styled.div`
`;
const StyledTextInputWrapper = styled.div`
`;

const StyledTitleInputWrapper = styled.div`
    
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const StyledCreateButton = styled.button`
  padding: 10px 20px;
  background-color: #00E595 ;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  color: #00057D;
  border: none;
  cursor: pointer;
`;

const StyledDelButton = styled.button`
  color: #FF4F4F;
  font-size: 16px;
  font-weight: 300;
  border: none;
  background-color: #ffffff;
  
`

const FileInput = styled.input`
  margin-bottom: 10px;
`;


export default CommunityCreatePage;
