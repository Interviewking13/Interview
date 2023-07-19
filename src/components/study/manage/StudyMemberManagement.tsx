<<<<<<< HEAD
import { HTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "../../../constants/colors";
import * as fonts from "../../../constants/fonts";
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import UserInfoModal from "../../modal/UserInfoModal";
import { useQuery } from "react-query";
import { deleteStudyMember, getStudyAccept } from "../../../api/api-study";
import { useQueryClient } from "react-query";

/** 스터디 맴버 관리 컴포넌트 타입지정 */
type StudyMemberManagementProps = {
  studyId: string;
=======
import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { colors } from '../../../constants/colors';
import * as fonts from '../../../constants/fonts';
import React, { useEffect, useState } from 'react';
import { Modal } from '@mui/material';
import UserInfoModal from '../../modal/UserInfoModal';
import { useQuery } from 'react-query';
import { deleteStudyMember, getStudyAccept } from '../../../api/api-study';
import { useQueryClient } from 'react-query';
import InfoMessage from '../../UI/InfoMessage';

/** 스터디 맴버 관리 컴포넌트 타입지정 */
type StudyMemberManagementProps = {
    studyId: string;
>>>>>>> c9398ff93cbb1400dd5b7530b24d44a0a751a160
};

/** 스터디 신청 데이터 타입지정 */
type StudyAcceptData = {
<<<<<<< HEAD
  _id: string;
  study_id: string;
  user_id: string;
  user_name: string;
  is_leader: boolean;
  goal: string;
  accept: number;
=======
    _id: string;
    study_id: string;
    user_id: string;
    user_name: string;
    is_leader: boolean;
    goal: string;
    accept: number;
>>>>>>> c9398ff93cbb1400dd5b7530b24d44a0a751a160
};

/** 스터디 맴버 관리 컴포넌트 props : (studyId) */
const StudyMemberManagement = ({ studyId }: StudyMemberManagementProps) => {
<<<<<<< HEAD

  const queryClient = useQueryClient();
  // 신청 기본 상태
  const apply = 0;
  // 신청 수락
  const accept = 1;
  // 신청 거절
  const unAccept = 2;

  // 리액트 쿼리를 통해 studyAcceptData에 수락인원 데이터 저장
  const {
    data: studyAcceptData,
    isLoading,
    isError,
    refetch,
  } = useQuery(["studyAcceptData"], () =>
    getStudyAccept(studyId, accept).then((response) => response.data)
  );

  const members = studyAcceptData;

  // 자기소개서 모달 open 상태관리
  const [userInfoModalOpen, setUserInfoModalOpen] = React.useState<{
    open: boolean;
    userId: string;
  }>({ open: false, userId: "" });

  /** 자기소개서 모달 open 핸들러 */
  const handleOpenUserInfoModal = (userId: string) => {
    setUserInfoModalOpen({ open: true, userId });
  };

  /** 자기소개서 모달 Close 핸들러 */
  const handleCloseUserInfoModal = () => {
    setUserInfoModalOpen({ open: false, userId: "" });
  };

  /** 스터디원 삭제 버튼 핸들러 */
  const onDeleteMember = async (index: number) => {
    // studyAcceptData의 해당 index의 유저아이디를 userId에 저장.
    const userId = studyAcceptData[index].user_id;
    // 스터디원 삭제 api 요청 
    deleteStudyMember(
      String(localStorage.getItem("token")),
      studyId,
      userId
    ).then(() => {
      // studyData 키값으로 캐시 무효화
      queryClient.invalidateQueries(["studyAcceptData"]);
      // 데이터 새로고침
      refetch();
      });;
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
            <StyledName onClick={() => handleOpenUserInfoModal(member.user_id)}>
              {member.user_name}
            </StyledName>
            <Modal open={userInfoModalOpen.open} onClose={handleCloseUserInfoModal}>
              <UserInfoModal
               userId={userInfoModalOpen.userId}
               handleModalClose={handleCloseUserInfoModal}
              />
            </Modal>
            <StyledDescription>{member.goal}</StyledDescription>
          </CardContent>
          <StyledCommonButton
            backgroundColor={colors.main_red}
            onClick={() => onDeleteMember(index)}
          >
            회원 삭제
          </StyledCommonButton>
        </CardContainer>
      ))}
    </>
  );
=======
    const queryClient = useQueryClient();
    // 신청 기본 상태
    const apply = 0;
    // 신청 수락
    const accept = 1;
    // 신청 거절
    const unAccept = 2;

    // 리액트 쿼리를 통해 studyAcceptData에 수락인원 데이터 저장
    const {
        data: studyAcceptData,
        isLoading,
        isError,
        refetch,
    } = useQuery(['studyAcceptData'], () => getStudyAccept(studyId, accept).then((response) => response.data));

    const members = studyAcceptData;

    // 자기소개서 모달 open 상태관리
    const [userInfoModalOpen, setUserInfoModalOpen] = React.useState<{
        open: boolean;
        userId: string;
    }>({ open: false, userId: '' });

    /** 자기소개서 모달 open 핸들러 */
    const handleOpenUserInfoModal = (userId: string) => {
        setUserInfoModalOpen({ open: true, userId });
    };

    /** 자기소개서 모달 Close 핸들러 */
    const handleCloseUserInfoModal = () => {
        setUserInfoModalOpen({ open: false, userId: '' });
    };

    /** 스터디원 삭제 버튼 핸들러 */
    const onDeleteMember = async (index: number) => {
        // studyAcceptData의 해당 index의 유저아이디를 userId에 저장.
        const userId = studyAcceptData[index].user_id;
        // 스터디원 삭제 api 요청
        deleteStudyMember(String(localStorage.getItem('token')), studyId, userId).then(() => {
            // studyData 키값으로 캐시 무효화
            queryClient.invalidateQueries(['studyAcceptData']);
            // 데이터 새로고침
            refetch();
        });
    };

    if (isLoading) {
        // 로딩 상태를 표시
        return <InfoMessage message="Loading..." />;
    }

    if (isError) {
        // 에러 상태를 표시
        return <InfoMessage message="Error occurred while fetching data" />;
    }

    // 스터디 인원이 없을 시 안내문구
    if (members.length === 0) {
        return <InfoMessage message="스터디 인원이 없습니다." />;
    }

    return (
        <>
            {/* members(studyAcceptData)를 index로 뿌림 */}
            {members.map((member: StudyAcceptData, index: number) => (
                <CardContainer key={index}>
                    <CardContent>
                        <StyledName onClick={() => handleOpenUserInfoModal(member.user_id)}>
                            {member.user_name}
                        </StyledName>
                        <Modal open={userInfoModalOpen.open} onClose={handleCloseUserInfoModal}>
                            <UserInfoModal
                                userId={userInfoModalOpen.userId}
                                handleModalClose={handleCloseUserInfoModal}
                            />
                        </Modal>
                        <StyledDescription>{member.goal}</StyledDescription>
                    </CardContent>
                    <StyledCommonButton backgroundColor={colors.main_red} onClick={() => onDeleteMember(index)}>
                        회원 삭제
                    </StyledCommonButton>
                </CardContainer>
            ))}
        </>
    );
>>>>>>> c9398ff93cbb1400dd5b7530b24d44a0a751a160
};
export default StudyMemberManagement;

/** 전체 컨테이너 div */
const CardContainer = styled.div`
<<<<<<< HEAD
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  color: ${colors.main_navy};
=======
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    color: ${colors.main_navy};
>>>>>>> c9398ff93cbb1400dd5b7530b24d44a0a751a160
`;

/** 내용 div */
const CardContent = styled.div`
<<<<<<< HEAD
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  background-color: ${colors.back_navy}; /* 수정된 부분 */
  border-radius: 10px; /* 수정된 부분 */
=======
    display: flex;
    flex-direction: row;
    flex-grow: 1;
    background-color: ${colors.back_navy}; /* 수정된 부분 */
    border-radius: 10px; /* 수정된 부분 */
>>>>>>> c9398ff93cbb1400dd5b7530b24d44a0a751a160
`;

/** Name p */
const StyledName = styled.p`
<<<<<<< HEAD
  font-weight: bold;
  width: 150px;
  margin-right: 20px;
  margin-left: 20px;
  cursor: pointer;
=======
    font-weight: bold;
    width: 150px;
    margin-right: 20px;
    margin-left: 20px;
    cursor: pointer;
>>>>>>> c9398ff93cbb1400dd5b7530b24d44a0a751a160
`;

/** 한줄소개 p */
const StyledDescription = styled.p`
<<<<<<< HEAD
  flex-grow: 1;
  margin-right: 10px;
  margin-left: 100px;
=======
    flex-grow: 1;
    margin-right: 10px;
    margin-left: 100px;
>>>>>>> c9398ff93cbb1400dd5b7530b24d44a0a751a160
`;

/** StyledCommonButton 타입지정 */
interface StyledCommonButtonProps extends HTMLAttributes<HTMLDivElement> {
<<<<<<< HEAD
  backgroundColor?: string;
=======
    backgroundColor?: string;
>>>>>>> c9398ff93cbb1400dd5b7530b24d44a0a751a160
}

/** 신청 수락 및 거절 버튼 div */
const StyledCommonButton = styled.div<StyledCommonButtonProps>`
<<<<<<< HEAD
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
=======
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
>>>>>>> c9398ff93cbb1400dd5b7530b24d44a0a751a160
`;
