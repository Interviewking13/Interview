import { useState } from "react";
import styled from "@emotion/styled";
import { StudyTaps } from "./common/StudyTap";
import { Mystudy, Title } from "./Information";

export const Feedback = () => {
  const [studyTapsCount, setStudyTapsCount] = useState(1);

  // const onClickButton = () => {
  //   setStudyTapsCount((pre) => pre + 1);
  // };
  // <button onClick={onClickButton}>클릭</button>
  //     <div>
  //       {[...Array(studyTapsCount)].map((_, index) => (
  //         <StudyTaps key={index} />
  //       ))}
  //     </div>

  return (
    <Container>
      <Mystudy>나의 스터디</Mystudy>
      <StudyTaps />

      <Title>신입 개발자를 위한 스터디</Title>
    </Container>
  );
};

const Container = styled.div`
  margin: 30px 100px;
  display: flex;
  flex-direction: column;
`;
