import React, { useState } from "react";
import StudyApplyModal from "./StudyApplyModal";

const TestPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const data = { studyId: 123213 };

  // 스터디 아이디 더미데이터 (스터디 아이디로 api 요청해야 해서)
  const { studyId } = data;

  return (
    <div>
      <p>TestPage!</p>
      <StudyApplyModal studyId={studyId} />

      {/* 신청하기 하드코딩 예시 */}
      {/* <button onClick={handleOpenModal}>신청하기</button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal">
            <StudyApplyForm onClose={handleCloseModal} />
          </div>
        </div>
      )} */}
    </div>
  );
};
export default TestPage;
