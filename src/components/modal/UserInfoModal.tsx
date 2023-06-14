import Box from "@mui/material/Box";
import styled from "styled-components";
import { HTMLAttributes } from "react";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const downImageSrc = "/download.png";
const cancelImageSrc = "/cancel-button.png";
interface StyledCommonButtonProps extends HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
}
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
  const introName = "첨부파일.word";
  return (
    <StyledBox>
      <StyledContainer>
        <StyledTopContainer>
          <StyledContainerText>
            <StyledTitleText color={colors.darkgray_navy}>
              <StyledTitleText color={colors.main_mint}>{name}</StyledTitleText>
              님의
            </StyledTitleText>
          </StyledContainerText>
          <StyledCancelButton onClick={handleCloseModal}>
            <CancelButtonImage src={cancelImageSrc} alt="Cancel Button" />
          </StyledCancelButton>
        </StyledTopContainer>
        <StyledContainerText>
          <StyledTitleText color={colors.darkgray_navy}>
            <StyledTitleText color={colors.main_navy}>
              자기소개서
            </StyledTitleText>
            입니다.
          </StyledTitleText>
        </StyledContainerText>
        <SubButtonContainer>
          <StyledCommonButton backgroundColor={colors.main_mint}>
            <StyledIntroTextField>{introName}</StyledIntroTextField>
            <StyledDownloadImg src={downImageSrc} alt="Cancel Button" />
          </StyledCommonButton>
        </SubButtonContainer>
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
  ${fonts.TitleText}
  color: ${(props) => props.color};
  display: inline-block;
  padding-right: 10px;
`;

const StyledInfoButton = styled.button`
  margin-top: 30px;
  ${fonts.SubTextThin}
  font-size: 16px;
  color: ${colors.main_mint};
  background-color: ${colors.dark_navy};
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
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.main_black};
  display: flex;
  align-items: center;
`;

const StyledCommonButton = styled.div<StyledCommonButtonProps>`
  cursor: pointer;
  height: 45px;
  background-color: ${(props) =>
    props.backgroundColor}; /* props로 전달받은 배경색을 사용 */
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  &:hover {
    background-color: ${colors.main_navy};
    color: white;
  }
  ${fonts.SubText}
`;

const StyledIntroTextField = styled.p`
  color: ${colors.back_navy};
  ${fonts.SubTextThin}
  font-size: 16px;

  margin: 20px;
`;

const SubButtonContainer = styled.div`
  display: flex;
  margin-top: 30px;
  color: ${colors.main_mint};
`;

const StyledDownloadImg = styled.img`
  width: 16px;
  height: 16px;
  margin: 20px;
`;
