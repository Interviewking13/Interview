import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import { TitleText, SubTextThin, SubTextSmall } from "../../constants/fonts";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../api/api-user";
import { useAuth } from "../../hooks/useAuth";

// 커뮤니티 글 작성을 위한 API 호출
const postCommunity = async (data: {
  title: string;
  content: string;
  attach: string;
  user_id: string;
  community_id: number;
}) => {
  try {
    console.log("Posted Data:", data);
    const response = await axiosInstance.post("/community/detl", data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// CommunityCreatePage 컴포넌트 선언
const CommunityCreatePage: React.FC = () => {
  // 제목 상태 추가
  const [title, setTitle] = useState("");
  // 내용 상태 추가
  const [content, setContent] = useState("");
  // 파일첨부 상태 추가
  const [file, setFile] = useState<File | null>(null);
  // 사용자 아이디 상태 추가
  const [useId, setUserId] = useState("");
  // queryClient 사용 (쿼리 데이터 관리를 위한 객체)
  const queryClient = useQueryClient();
  // navigate 훅 사용 (라우터 이동을 위한 함수)
  const navigate = useNavigate();

  // 로컬 스토리지에서 토큰 가져와서 사용자 데이터 요청하기
  // const [file, setFile] = useState(null);
  useAuth();
  useEffect(() => {
    getUserData(String(localStorage.getItem("token"))).then((response) => {
      setUserId(response.data.user_id);
      console.log(response.data.user_id);
      console.log(response.data);
    });
  });

  // 입력 필드에 대한 이벤트 핸들러
  /** 제목 입력 값 변경 시 동작 */
  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };

  /** 내용 입력 값 변경 시 동작 */
  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContent(e.target.value);
  };

  /** 첨부파일 버튼 클릭 시 동작 */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0];
      setFile(selectedFile);
    }
  };

  // postCommunity api service함수 가져와서 사용
  // useMutation의 반환값인 postCommunityMutate을 호출하면 해당 api가 호출됨
  const { mutate: postCommunityMutate } = useMutation(postCommunity, {
    // 에러가 나면 실행되는 함수
    onError: (error) => {
      console.error("Error:", error);
    },
    // 성공하면 실행되는 함수
    onSuccess: (data) => {
      console.log("성공: ", data);
      // 성공 시 커뮤니티 작성한 글 상세페이지로 이동
      navigate(`/Community/communityDetailPage/${data.data.community_id}`);
    },
  });

  /** 글쓰기 버튼 클릭 시 동작 */
  const handleSubmit = () => {
    // postCommunityMutate 함수를 호출하여 글 작성을 서버로 전송
    postCommunityMutate({
      title: title,
      content: content,
      attach: "",
      user_id: useId,
      community_id: 0,
    });
  };

  /** 삭제 버튼 클릭 시 동작 */
  const handleDelete = () => {
    setFile(null);
  };

  return (
    <StyledCommonContainer>
      <StyledCreatePageContainer>
        <StyledPageTitleWrapper>
          <StyledCreatePageTitle>커뮤니티 글 쓰기</StyledCreatePageTitle>
          <StyledCreatePageSubtitle>회원들과 정보를 공유해보세요.</StyledCreatePageSubtitle>
        </StyledPageTitleWrapper>
        <StyledCommonWrapper>
          <StyledTitle>제목</StyledTitle>
          <StyledInput
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력하세요."
          />
        </StyledCommonWrapper>
        <StyledCommonWrapper className="second-input-wrapper">
          <StyledTitle>내용</StyledTitle>
          <StyledTextarea
            value={content}
            onChange={handleContentChange}
            placeholder="내용을 입력하세요."
          />
        </StyledCommonWrapper>

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
                <FileAttachment href={URL.createObjectURL(file)} download>
                  {file.name}
                </FileAttachment>
              </FileList>
            )}
            {file && (
              <StyledDelButton onClick={handleDelete}>삭제</StyledDelButton>
            )}
          </StyledAttachedFileListContainer>
        </StyledFileInputWrapper>
        <StyledCreateButtonWrapper>
          <StyledCreateButton onClick={handleSubmit}>글쓰기</StyledCreateButton>
        </StyledCreateButtonWrapper>
      </StyledCreatePageContainer>
    </StyledCommonContainer>
  );
};

// 스타일드 컴포넌트로 컴포넌트 스타일 정의
/** 공통 컨테이너 div (가운데 정렬 및 레이아웃 크기 지정) */
const StyledCommonContainer = styled.div`
  width: 100%;
  max-width: 1270px;
  margin: 0 auto;
`;

/** 글쓰기 페이지 컨테이너 div */
const StyledCreatePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

/** 페이지 타이틀과 서브타이틀 감싸는 div */
const StyledPageTitleWrapper = styled.div`
  margin: 60px 0 25px;
  width: 1270px;
  display: flex;
  align-items: flex-end; /* 폰트를 바닥에 같은 높이로 위치 */
`;

/** 페이지 타이틀 p */
const StyledCreatePageTitle = styled.p`
  ${TitleText}
  color: ${colors.main_mint};
  margin: 0;
  margin-right: 40px;
`;

/** 페이지 서브타이틀 p */
const StyledCreatePageSubtitle = styled.p`
  margin: 0;
  color: ${colors.darkgray_navy};
  ${SubTextThin}
`;

/** 왼쪽 타이틀 div */
const StyledTitle = styled.div`
  color: ${colors.main_black};
  height: fit-content;
  font-size: 20px;
  font-weight: 600;
`;

/** 오른쪽 인풋 레이아웃 input */
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

/** 게시글 작성 textarea */
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

/** 좌/우 공통 레이아웃 div */
const StyledCommonWrapper = styled.div`
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

/** 파일첨부 전체를 감싸는 div */
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

/** 파일첨부 타이틀, 서브타이틀, 버튼 컨테이너 div */
const StyledFileInputContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

/** 오른쪽 서브타이틀 p */
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

/** 글쓰기 버튼 컨테이너 div */
const StyledCreateButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 1270px;
`;

/** 글쓰기 버튼 button */
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

/** 파일첨부 리스트 컨테이너 div */
const StyledAttachedFileListContainer = styled.div`
  width: 1105px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 20px 0;
`;

/** 파일첨부 input */
const FileInput = styled.input`
  display: none;
`;

/** 파일첨부 버튼 label */
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

/** 파일첨부 리스트 div */
const FileList = styled.div`
  margin: 0;
  padding: 0;
  list-style: none;
  color: ${colors.darkgray_navy};
  ${SubTextSmall};
  width: 1060px;
`;

/** 파일첨부 다운로드 링크 a */
const FileAttachment = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
`;

/** 파일첨부 삭제 버튼 button */
const StyledDelButton = styled.button`
  color: #FF4F4F;
  font-size: 16px;
  font-weight: 300;
  border: none;
  background-color: #ffffff;
  display: flex;
  justify-content: flex-end;
  width: 1270px;
`

export default CommunityCreatePage;
