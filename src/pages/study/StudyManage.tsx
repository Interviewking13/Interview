import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudyModify from "../../components/study/manage/StudyModify";
import StudyMemberManagement from "../../components/study/manage/StudyMemberManagement";
import StudyApplicantList from "../../components/study/manage/StudyApplicantList";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import { Link } from "react-router-dom";
const StudyManage = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("");

  const onClickStudyModify = () => {
    setActivePage("modify");
  };

  const onClickMemberManagement = () => {
    setActivePage("member");
  };

  const onClickApplicantList = () => {
    setActivePage("applicant");
  };

  const renderActivePage = () => {
    switch (activePage) {
      case "modify":
        return <StudyModify />;
      case "member":
        return <StudyMemberManagement />;
      case "applicant":
        return <StudyApplicantList />;
      default:
        return <StudyManage />;
    }
  };

  return (
    <div>
      <CommonContainer>
        <h1>Study Management</h1>
        <button onClick={onClickStudyModify}>Go to Study Modify</button>
        <button onClick={onClickMemberManagement}>
          Go to Member Management
        </button>
        <button onClick={onClickApplicantList}>Go to Applicant List</button>

        {/* {renderActivePage()} */}
      </CommonContainer>
    </div>
  );
};

export default StudyManage;

const CommonContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
  font-family: ${fonts.SubTextThinSmall};
`;
