import Box from "@mui/material/Box";
import styled from "styled-components";
import StudyApplyList from "./StudyApplyList";
import { Link } from "react-router-dom";
import { dateFomatting } from "../../utils/dateFomatting";
import { TitleText } from "../../constants/fonts";
import { colors } from "../../constants/colors";
import React, { useEffect } from "react";
const imageSrc = "/cancel-button.png";
type StudyApplyModalProps = {
  studyId: string;
  handleModalClose: () => void;
};
const UserInfoModal: React.FC<StudyApplyModalProps> = ({
  studyId,
  handleModalClose,
}) => {
  const handleCloseModal = () => {
    handleModalClose();
  };
  // 모달 내용 및 로직 구현
  const name = " 정채진";
  return (
    <StyledBox>
      <StyledContainer>
        <StyledTopContainer>
          <StyledContainerText>
            <StyledNameText>
              <StyledTitleText>{name} </StyledTitleText> 님의
            </StyledNameText>
          </StyledContainerText>
          <StyledCancelButton onClick={handleCloseModal}>
            <CancelButtonImage src={imageSrc} alt="Cancel Button" />
          </StyledCancelButton>
        </StyledTopContainer>
        <StyledContainerText>
          <StyledNameText>
            <StyledTitleText>자기소개서 </StyledTitleText>입니다.
          </StyledNameText>
        </StyledContainerText>

        <StyledInfoButton>첨부파일</StyledInfoButton>
      </StyledContainer>
    </StyledBox>
  );
};

export default UserInfoModal;

const StyledBox = styled(Box)`
  height: 218px;
  width: 1004px;
  background-color: #f1f4ff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  display: flex;
`;

const StyledTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledContainer = styled.div`
  margin: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const StyledContainerText = styled.div`
  display: flex;
  align-items: center;
`;
const StyledTitleText = styled.p`
  margin: 0px;
  ${TitleText}
  color: ${colors.main_mint}
`;
const StyledNameText = styled.p`
  margin: 0px;
  ${TitleText}
  color: ${colors.gray_navy};
  display: flex;
`;

const StyledInfoButton = styled.button`
  margin-top: 40px;
  ${TitleText}
  color: ${colors.main_mint}
`;

const StyledCancelButton = styled.button`
  width: 23px;
  height: 23px;
  background: none;
  border: none;
  padding: 0;
  margin-left: auto;
  cursor: pointer; /* 클릭 커서 스타일 추가 */
`;

const CancelButtonImage = styled.img`
  width: 100%;
  height: 100%;
`;
