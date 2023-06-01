import React, { useState } from "react";
import StudyApplyForm from "./StudyApplyForm";
import NestedModal from "./NestedModal";

const TestPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <p>TestPage!</p>
      <NestedModal />

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
