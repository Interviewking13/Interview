import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: #f1f4ff;
  height: 150px;
`;
const Footer = () => {
  return (
    <Container>
      <div>이곳은 푸터입니다!</div>
    </Container>
  );
};

export default Footer;
