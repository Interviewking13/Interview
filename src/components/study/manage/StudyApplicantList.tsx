import { HTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "../../../constants/colors";
import * as fonts from "../../../constants/fonts";
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import UserInfoModal from "../../modal/UserInfoModal";
import { useQuery } from "react-query";
import { getStudyAccept } from "../../../api/api-study";

type StudyApplicantListProps = {
  studyId: string;
};

const members = [
  { name: "고병욱", description: "힘내자 힘", userId: "1232" },
  { name: "이예준", description: "열심히 하자", userId: "1234" },
  { name: "박지원", description: "화이팅!", userId: "1235" },
];

const onDelete = () => {};
const accept = 0;
const StudyApplicantList = ({ studyId }: StudyApplicantListProps) => {
  const response = getStudyAccept(
    String(localStorage.getItem("token")),
    studyId,
    accept
  );
  console.log(studyId);

  // const {
  //   data: studyAcceptData,
  //   isLoading,
  //   isError,
  // } = useQuery(["studyAcceptData"], () =>
  //   getStudyAccept(String(localStorage.getItem("token")), studyId, 0).then(
  //     (response) => response.data
  //   )
  // );
  // if (isLoading) {
  //   // 로딩 상태를 표시
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   // 에러 상태를 표시
  //   return <div>Error occurred while fetching data</div>;
  // }

  // console.log(`studyAcceptData:`, studyAcceptData);
  // const { title, status } = studyAcceptData;
  const [userInfoModalOpen, setUserInfoModalOpen] = React.useState(false);

  const handleOpenUserInfoModal = () => {
    setUserInfoModalOpen(true);
  };

  const handleCloseUserInfoModal = () => {
    setUserInfoModalOpen(false);
  };
  return (
    <>
      {members.map((member, index) => (
        <CardContainer key={index}>
          <CardContent>
            <StyledName onClick={handleOpenUserInfoModal}>
              {member.name}
            </StyledName>
            <Modal open={userInfoModalOpen} onClose={handleCloseUserInfoModal}>
              <UserInfoModal
                userId={member.userId}
                handleModalClose={handleCloseUserInfoModal}
              />
            </Modal>
            <StyledDescription>{member.description}</StyledDescription>
          </CardContent>
          <StyledCommonButton
            backgroundColor={colors.main_mint}
            onClick={onDelete}
          >
            신청 수락
          </StyledCommonButton>
          <StyledCommonButton
            backgroundColor={colors.main_red}
            onClick={onDelete}
          >
            회원 거절
          </StyledCommonButton>
        </CardContainer>
      ))}
    </>
  );
};
export default StudyApplicantList;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  color: ${colors.main_navy};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  background-color: ${colors.back_navy}; /* 수정된 부분 */
  border-radius: 10px; /* 수정된 부분 */
`;

const StyledName = styled.p`
  font-weight: bold;
  margin-right: 10px;
  margin-left: 20px;
  cursor: pointer;
`;

const StyledDescription = styled.p`
  flex-grow: 1;
  margin-right: 10px;
  margin-left: 100px;
`;
interface StyledCommonButtonProps extends HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
}
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
