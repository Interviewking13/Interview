import Box from "@mui/material/Box";
import styled from "styled-components";
import StudyApplyList from "./StudyApplyList";
import { Link } from "react-router-dom";
import { dateFomatting } from "../../utils/dateFomatting";
import { TitleText } from "../../constants/fonts";
import { colors } from "../../constants/colors";
import React, { useEffect } from "react";
import { HTMLAttributes } from "react";
import * as fonts from "../../constants/fonts";
interface StyledCommonButtonProps extends HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
}
type StudyApplyModalProps = {
  studyId: string;
  handleModalClose: () => void;
};

const StudyApplyModal: React.FC<StudyApplyModalProps> = ({
  studyId,
  handleModalClose,
}) => {
  const studyData = {
    title: "SAFFY 면접 스터디",
    period: "2023-05-30 ~ 2023-06-08",
    deadline: "2023-06-09",
    headcount: 4,
    study_id: "123123",
    study_name: "interview king",
    content: "우리 스터디는 ~~을 목표로 하고, ...을 규칙으로 함",
    chat_link:
      "https://us05web.zoom.us/j/83754399005?pwd=QWRMY0I4VjhkWkhtdHdydkhTM0dLUT09",
    status: 1,
    currentCount: 2,
    studyLeader: "채진짱",
  };

  //받아온 스터디의 데이터 분해구조 할당
  const {
    title,
    period,
    deadline,
    headcount,
    currentCount,
    study_id,
    studyLeader,
    study_name,
    content,
    chat_link,
    status,
  } = studyData;

  //취소버튼 이미지 링크
  const imageSrc = "/cancel-button.png";
  const handleCloseModal = () => {
    handleModalClose();
  };
  return (
    <div>
      <StyledBox>
        <StyledContainer>
          <StyledTopContainer>
            <StyledTitleText>스터디 신청하기</StyledTitleText>
            <StyledCancelButton onClick={handleCloseModal}>
              <CancelButtonImage src={imageSrc} alt="Cancel Button" />
            </StyledCancelButton>
          </StyledTopContainer>
          <StyledTitleTextNavy>{title}</StyledTitleTextNavy>
          <StudyApplyList
            period={dateFomatting(period)}
            deadline={dateFomatting(deadline)}
            currentCount={currentCount}
            headCount={headcount}
            studyLeader={studyLeader}
          />
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
            <StyledCommonButton backgroundColor={colors.main_mint}>
              <StyledButtonTextField>신청하기</StyledButtonTextField>
            </StyledCommonButton>
          </StyledBottom>
        </StyledContainer>
      </StyledBox>
    </div>
  );
};

export default StudyApplyModal;

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

const StyledTitleText = styled.p`
  margin: 0px;
  margin-bottom: 22px;
  ${TitleText}
  color: ${colors.main_mint}
`;

const StyledTitleTextNavy = styled.p`
  margin: 0px;
  margin-bottom: 22px;
  ${TitleText}
  color: ${colors.main_navy}
`;

const TextInput = styled.textarea`
  width: 923px;
  height: 172px;
  border-radius: 10px;
  font-size: 18px;
`;

const StyledP = styled.p`
  font-size: 14px;
  margin: 0;
  margin-right: 10px;
`;

const StyledA = styled(Link)`
  font-size: 14px;
  text-decoration: none;
  color: #000;
  text-decoration: underline;
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

const BottomContainer = styled.div``;
const StyledBottom = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  font-family: ${fonts.SubTextThinSmall};
`;

const StyledCommonButton = styled.div<StyledCommonButtonProps>`
  margin-left: auto;
  cursor: pointer;
  width: 132px;
  height: 45px;
  color: ${colors.main_black};
  background-color: ${(props) =>
    props.backgroundColor}; /* props로 전달받은 배경색을 사용 */
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  &:hover {
    background-color: ${colors.main_navy};
    color: ${colors.main_white};
  }
  ${fonts.SubText}
`;

const StyledButtonTextField = styled.p`
  font-family: ${fonts.SubTextBig};
`;
