import Box from "@mui/material/Box";
import styled from "styled-components";
import { HTMLAttributes } from "react";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// 다운로드 이미지 링크
const downImageSrc = "/download.png";
// 취소 이미지 링크
const cancelImageSrc = "/cancel-button.png";

/** 자기소개서 모달 타입지정 */
type UserInfoModalProps = {
  userId: string;
  handleModalClose: () => void;
};

/** 자기소개서 모달 컴포넌트 props : (userId, handleModalClose) */
const UserInfoModal: React.FC<UserInfoModalProps> = ({
  userId,
  handleModalClose,
}) => {

  // 더미 데이터
  const name = " 정채진";
  const introName = "첨부파일.word";

  /** 모달 닫기 핸들러 */
  const handleCloseModal = () => {
    handleModalClose();
  };

  // getUserData(userId) 해서
  // 더미데이터 변경
  // 파일 다운로드 구현
  
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
            <StyledDownloadImg src={downImageSrc} alt="downImage" />
          </StyledCommonButton>
        </SubButtonContainer>
      </StyledContainer>
    </StyledBox>
  );
};

export default UserInfoModal;

/** 최상단 Box */
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

/** 전체 컨테이너 div */
const StyledContainer = styled.div`
  margin: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

/** 상단 컨테이너 div */
const StyledTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

/** Text 컨테이너 div */
const StyledContainerText = styled.div`
  display: flex;
  align-items: center;
`;

/** 설명 및 내용 Text p */
const StyledTitleText = styled.p`
  margin: 0px;
  ${fonts.TitleText}
  color: ${(props) => props.color};
  display: inline-block;
  padding-right: 10px;
`;

/** 취소버튼 button */
const StyledCancelButton = styled.button`
  width: 23px;
  height: 23px;
  background: none;
  border: none;
  padding: 0;
  margin-left: auto;
  cursor: pointer; /* 클릭 커서 스타일 추가 */
`;

/** 취소버튼 img */
const CancelButtonImage = styled.img`
  width: 100%;
  height: 100%;
`;

/** StyledCommonButton 타입지정 */
interface StyledCommonButtonProps extends HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
}

/** 자기소개서 다운 버튼 div */
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

/** 자기소개서 text p */
const StyledIntroTextField = styled.p`
  color: ${colors.back_navy};
  ${fonts.SubTextThin}
  font-size: 16px;

  margin: 20px;
`;

/** 자기소개서 버튼 컨테이너 div */
const SubButtonContainer = styled.div`
  display: flex;
  margin-top: 30px;
  color: ${colors.main_mint};
`;

/** 자기소개서 버튼 컨테이너 div */
const StyledDownloadImg = styled.img`
  width: 16px;
  height: 16px;
  margin: 20px;
`;
