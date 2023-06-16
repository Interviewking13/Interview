import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import { TitleText, SubTextThin, SubTextSmall } from "../../constants/fonts";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { getUserData } from "../../api/api-user";

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

const CommunityCreatePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [useId, setUserId] = useState("");
  // const [file, setFile] = useState(null);

  useEffect(() => {
    getUserData(String(localStorage.getItem("token"))).then((response) => {
      setUserId(response.data.user_id);
      console.log(response.data.user_id);
      console.log(response.data);
    });
  });

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContent(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const selectedFile = selectedFiles[0];
      setFile(selectedFile);
    }
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
    // 성공하면 실행되는 함수
    // 글을 생성하는 post니까 성공했을 땐 여기서 queryClient.invalidates([{postListAPI의 키값}])같은 코드를 넣어주면 글쓰기가 성공했을 때 자동으로 업데이트되겠죠?
    onSuccess: (data) => {
      console.log("성공: ", data);
      queryClient.invalidateQueries("communityList");
      navigate(`/Community/communityDetailPage/${data.data.community_id}`);
    },
  });

  const handleSubmit = () => {
    // 호출

    postCommunityMutate({
      title: title,
      content: content,
      attach: "",
      user_id: useId,
      community_id: 0,
    });
  };

  return (
    <StyledCommonContainer>
      <StyledCreatePageContainer>
        <StyledTitleWrapper>
          <StyledTitleContainer>
            <StyledCreatePageTitle>커뮤니티 글 쓰기</StyledCreatePageTitle>
          </StyledTitleContainer>
          <StyledSubTitleContainer>
            <StyledCreatePageSubtitle>
              회원들과 정보를 공유해보세요.
            </StyledCreatePageSubtitle>
          </StyledSubTitleContainer>
        </StyledTitleWrapper>
        <StyledInputWrapper>
          <StyledTitle>제목</StyledTitle>
          <StyledInput
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력하세요."
          />
        </StyledInputWrapper>

        <StyledInputWrapper className="second-input-wrapper">
          <StyledTitle>내용</StyledTitle>
          <StyledTextarea
            value={content}
            onChange={handleContentChange}
            placeholder="내용을 입력하세요."
          />
        </StyledInputWrapper>

        <StyledFileInputWrapper>
          <StyledFileInputContainer></StyledFileInputContainer>
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

export default CommunityCreatePage;
