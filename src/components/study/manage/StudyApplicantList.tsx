import { HTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "../../../constants/colors";
import * as fonts from "../../../constants/fonts";
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import UserInfoModal from "../../modal/UserInfoModal";
import { useQuery } from "react-query";
import { getStudyAccept, putAcceptStudy } from "../../../api/api-study";
import { useQueryClient } from "react-query";

/** 스터디 신청 리스트 타입 */
type StudyApplicantListProps = {
  studyId: string;
};

/** 스터디 데이터 타입 지정 */
type StudyAcceptData = {
  _id: string;
  study_id: string;
  user_id: string;
  user_name: string;
  is_leader: boolean;
  goal: string;
  accept: number;
}

/** 스터디 신청 리스트 컴포넌트 props: (studyId) */
const StudyApplicantList = ({ studyId }: StudyApplicantListProps) => {
  
  const queryClient = useQueryClient();

  // 신청한 상태 (기본)
  const apply = 0;
  // 신청 수락
  const accept = 1;
  // 신청 거절
  const unAccept = 2;

  /** 신청 수락 버튼 핸들러 */
  const onAcceptButton = async (index: number) => {
    // studyAcceptData의 해당 index의 유저아이디를 userId에 저장.
    const userId = studyAcceptData[index].user_id;
    // 스터디 신청 api 요청 
    await putAcceptStudy(
      String(localStorage.getItem("token")),
      studyId,
      userId,
      accept
    );
    // studyAcceptData 키를 통해 초기화, 랜더링
    queryClient.invalidateQueries(["studyAcceptData"]);
  };

  /** 신청 거절 버튼 핸들러 */
  const onDeleteButton = async (index: number) => {
    // studyAcceptData의 해당 index의 유저아이디를 userId에 저장.
    const userId = studyAcceptData[index].user_id;
    // 스터디 거절 api 요청 
    await putAcceptStudy(
      String(localStorage.getItem("token")),
      studyId,
      userId,
      unAccept
    );
    queryClient.invalidateQueries(["studyAcceptData"]);
  };

  // 리액트 쿼리를 통해 studyAcceptData에 신청인원 데이터 저장
  const {
    data: studyAcceptData,
    isLoading,
    isError,
  } = useQuery(["studyAcceptData"], () =>
    getStudyAccept(studyId, apply).then((response) => response.data)
  );

  const members = studyAcceptData;

  // 자기소개서 모달 open 상태관리
  const [userInfoModalOpen, setUserInfoModalOpen] = React.useState(false);

  /** 자기소개서 모달 open 핸들러 */
  const handleOpenUserInfoModal = () => {
    setUserInfoModalOpen(true);
  };

  /** 자기소개서 모달 Close 핸들러 */
  const handleCloseUserInfoModal = () => {
    setUserInfoModalOpen(false);
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
    <>
    {/* members(studyAcceptData)를 index로 뿌림 */}
      {members.map((member: StudyAcceptData, index: number) => (
        <CardContainer key={index}>
          <CardContent>
            <StyledName onClick={handleOpenUserInfoModal}>
              {member.user_name}
            </StyledName>
            <Modal open={userInfoModalOpen} onClose={handleCloseUserInfoModal}>
              <UserInfoModal
                userId={member.user_id}
                handleModalClose={handleCloseUserInfoModal}
              />
            </Modal>
            <StyledDescription>{member.goal}</StyledDescription>
          </CardContent>
          <StyledCommonButton
            backgroundColor={colors.main_mint}
            onClick={() => onAcceptButton(index)}
          >
            신청 수락
          </StyledCommonButton>
          <StyledCommonButton
            backgroundColor={colors.main_red}
            onClick={() => onDeleteButton(index)}
          >
            회원 거절
          </StyledCommonButton>
        </CardContainer>
      ))}
    </>
  );
};
export default StudyApplicantList;

/** 전체 컨테이너 div */
const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  color: ${colors.main_navy};
`;

/** 내용 div */
const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  background-color: ${colors.back_navy}; 
  border-radius: 10px; 
`;

/** Name p */
const StyledName = styled.p`
  font-weight: bold;
  margin-right: 10px;
  margin-left: 20px;
  cursor: pointer;
`;

/** 한줄소개 p */
const StyledDescription = styled.p`
  flex-grow: 1;
  margin-right: 10px;
  margin-left: 100px;
`;

/** StyledCommonButton 타입지정 */
interface StyledCommonButtonProps extends HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
}

/** 신청 수락 및 거절 버튼 div */
const StyledCommonButton = styled.div<StyledCommonButtonProps>`
  cursor: pointer;
  margin-left: 20px;
  width: 132px;
  height: 45px;
  background-color: ${(props) => props.backgroundColor};
  color: white;
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
