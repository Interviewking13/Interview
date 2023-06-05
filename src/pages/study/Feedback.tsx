import { useState } from "react";
import styled from "@emotion/styled";
import { StudyTaps } from "./common/StudyTap";

export const Feedback = () => {
  const [studyTapsCount, setStudyTapsCount] = useState(1);

  const onClickButton = () => {
    setStudyTapsCount((pre) => pre + 1);
  };

  return (
    <Container>
      <button onClick={onClickButton}>클릭</button>
      <div>
        {[...Array(studyTapsCount)].map((_, index) => (
          <StudyTaps key={index} />
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 30px 100px;
  display: flex;
  flex-direction: column;
`;
