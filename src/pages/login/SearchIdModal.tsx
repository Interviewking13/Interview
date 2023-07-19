import React, { useState } from 'react';
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import { TitleText, SubTextThin, SubTextThinSmall } from "../../constants/fonts";

const SearchIdModal = ({ closeModal }: { closeModal: () => void }) => {
  const [visible, setVisible] = useState(false);
  // 취소버튼 이미지 링크
  const imageSrc = "/cancel-button.png";

  const openModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
    closeModal(); // 모달을 닫을 때, 부모 컴포넌트에서 전달받은 closeModal 함수를 호출하여 부모 컴포넌트에서 모달을 닫을 수 있도록 합니다.
  };

  return (
    <Container>
      {/* 모달 열기 버튼을 삭제하고, 아이디 찾기를 클릭했을 때 모달이 열리도록 수정 */}
      <ModalContent>
        <StyledTopContainer>
          <ModalTitle>아이디 찾기</ModalTitle>
          <StyledCancelButton onClick={handleCloseModal}>
            <CancelButtonImage src={imageSrc} alt="Cancel Button" />
          </StyledCancelButton>
        </StyledTopContainer>
        <ModalText>가입하신 정보를 입력해주세요.</ModalText>
        <ModalInputContainer>
          <ModalInput placeholder='가입하신 이름을 입력해주세요.'></ModalInput>
          <ModalInput placeholder='가입하신 전화번호를 입력해주세요.'></ModalInput>
        </ModalInputContainer>
        <ButtonContainer>
          <SubmitButton onClick={handleCloseModal}>아이디 찾기</SubmitButton>
        </ButtonContainer>
      </ModalContent>
    </Container>
  );
};

export default SearchIdModal;

// Styled Components
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  width: 923px;
  padding: 40px;
  background-color: ${colors.back_navy};
  border-radius: 5px;
`;

/** 상단 컨테이너 div */
const StyledTopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/** 취소 버튼 button */
const StyledCancelButton = styled.button`
  width: 23px;
  height: 23px;
  background: none;
  border: none;
  padding: 0;
  margin-left: auto;
  cursor: pointer; /* 클릭 커서 스타일 추가 */
`;

/** 취소 버튼 img */
const CancelButtonImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ModalTitle = styled.p`
  ${TitleText}
  color: ${colors.main_navy};
  margin: 0;
`;

const ModalText = styled.p`
  margin: 20px 0;
  color: ${colors.main_black};
  ${SubTextThin}
`;

const ModalInputContainer = styled.div`
  margin: 0 0 40px 0;
`;

const ModalInput = styled.input`
  box-sizing: border-box;
  width: 923px;
  height: 45px;
  color: ${colors.main_black};
  border: 1px solid ${colors.gray_navy};
  border-radius: 10px;
  padding: 0;
  padding-left: 18px;
  font-weight: 300;
  font-size: 18px;
  &:last-of-type {
    margin-top: 15px;
  }
  &::placeholder {
    color: ${colors.gray_navy};
  }
  &:focus {
    outline: none;
    border: 1px solid ${colors.gray_navy};
    box-shadow: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const SubmitButton = styled.button`
  width: 132px;
  height: 45px;
  border-radius: 10px;
  color: ${colors.back_navy};
  ${SubTextThinSmall};
  background-color: ${colors.dark_navy};
  border: 1px solid ${colors.dark_navy};
  &:hover {
    background-color: ${colors.dark_navy};
  }
  cursor: pointer;
`;
