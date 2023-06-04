import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const FileInput = styled.input`
  margin-bottom: 10px;
`;

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
    <Container>
      <Title>커뮤니티 글쓰기</Title>
      <Subtitle>설명입니다</Subtitle>
      <Input type="text" placeholder="제목" value={title} onChange={handleTitleChange} />
      <Input type="text" placeholder="내용" value={content} onChange={handleContentChange} />
      <FileInput type="file" onChange={handleFileChange} />
      <Button onClick={handleSubmit}>글쓰기</Button>
      <Button onClick={handleDelete}>글삭제</Button>
    </Container>
  );
};

export default CommunityCreatePage;
