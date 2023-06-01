import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import styled from "styled-components";
import ApplyList from "./Applylist";
import { Link } from "react-router-dom";

export default function NestedModal() {
  const studyData = {
    title: "SAFFY 면접 스터디",
    period: "2023-05-30~2023-06-08",
  };

  //취소버튼 이미지 링크
  const imageSrc = "./cancel-button.png";
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <StyledBox>
          <StyledContainer>
            <StyledTopContainer>
              <StyledH2>스터디 신청하기</StyledH2>
              <StyledCancleImg src={imageSrc} alt="Cancel Button" />
            </StyledTopContainer>
            <StyledTitle>SAFFY 면접 스터디</StyledTitle>
            <ApplyList />
            <TextInput placeholder="한 줄 소개를 입력하시오. (60자 이내)" />
            <StyledBottom>
              <BottomContainer>
                <StyledP>스터디장의 승인 후 가입이 가능합니다.</StyledP>
                <InfoContainer>
                  <StyledP>
                    신청 시 입력한 한 줄 소개와 등록된 자기소개서가 스터디장에게
                    발송됩니다.
                  </StyledP>
                  <StyledA to="/mypage-modify">
                    자기소개서 등록을 안 하셨나요?
                  </StyledA>
                </InfoContainer>
              </BottomContainer>
              <StyledApplyButton>신청하기</StyledApplyButton>
            </StyledBottom>
          </StyledContainer>
        </StyledBox>
      </Modal>
    </div>
  );
}

const StyledBox = styled(Box)`
  height: 594px;
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

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledContainer = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: column;
`;

const StyledH2 = styled.h2`
  font-size: 24px;
  margin: 0px;
  margin-bottom: 30px;
  color: #00e595;
`;

const StyledTitle = styled.h2`
  font-size: 24px;
  margin: 0px;
  margin-bottom: 30px;
  color: #00057d;
`;

const TextInput = styled.input`
  width: 923px;
  height: 172px;
  border-radius: 10px;
  text-align: center;
`;

const StyledP = styled.p`
  font-size: 12px;
  margin: 0;
  margin-right: 10px;
`;

const StyledA = styled(Link)`
  font-size: 12px;
  text-decoration: none;
  color: #000;
  text-decoration: underline;
`;

const StyledApplyButton = styled.button`
  margin-left: auto;
  background-color: #00e595;
  border-radius: 10px;
  width: 132px;
  height: 45px;
`;

const StyledCancleImg = styled.img`
  width: 23px;
  height: 23px;
`;

const BottomContainer = styled.div``;
const StyledBottom = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
`;
