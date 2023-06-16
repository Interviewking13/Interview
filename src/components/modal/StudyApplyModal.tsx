import Box from "@mui/material/Box";
import styled from "styled-components";
import StudyApplyList from "./StudyApplyList";
import { Link } from "react-router-dom";
import { dateFomatting, dateSplice } from "../../utils/dateFomatting";
import { TitleText } from "../../constants/fonts";
import { colors } from "../../constants/colors";
import React, { ChangeEvent, useState } from "react";
import { HTMLAttributes } from "react";
import * as fonts from "../../constants/fonts";
import { getInfoStudyData, postApplyStudy } from "../../api/api-study";
import { useQuery } from "react-query";

type StudyApplyModalProps = {
  studyId: string;
  handleModalClose: () => void;
};

const StudyApplyModal: React.FC<StudyApplyModalProps> = ({
  studyId,
  handleModalClose,
}) => {
  const [goal, setGoal] = useState("");
  const handleGoalChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setGoal(event.target.value);
  };
  const {
    data: studyData,
    isLoading,
    isError,
  } = useQuery("studyData", () =>
    getInfoStudyData(studyId).then((response) => response.data)
  );

  //받아온 스터디의 데이터 분해구조 할당
  const {
    title,
    start,
    end,
    deadline,
    headcount,
    acceptcount,
    study_id,
    leader_name,
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
  const onApplyButtonHandler = () => {
    postApplyStudy(String(localStorage.getItem("token")), studyId, goal);
    alert("스터디가 신청되었습니다!");
    handleModalClose();

    //information에서 정보 재랜더링 해야함 쿼리로.
  };

  if (isLoading) {
    // 로딩 상태를 표시
    return <div>Loading...</div>;
  }

  if (isError) {
    // 에러 상태를 표시
    return <div>Error occurred while fetching data</div>;
  }
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
            period={`${dateSplice(start)} ~ ${dateSplice(end)}`}
            deadline={dateFomatting(deadline)}
            currentCount={acceptcount}
            headCount={headcount}
            studyLeader={leader_name}
          />
          <TextInput
            placeholder="한 줄 소개를 입력해 주세요. (60자 이내)"
            value={goal}
            onChange={handleGoalChange}
          />
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
            <StyledCommonButton
              backgroundColor={colors.main_mint}
              onClick={onApplyButtonHandler}
            >
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
  padding: 10px 0 0 10px;
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
interface StyledCommonButtonProps extends HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
}
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
