import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  background-color: #f1f4ff;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
display: block;
`;
const Footer = () => {
  return (
    <Container>
      <div>이곳은 푸터입니다!</div>
    </Container>
  );
};

export default Footer;
