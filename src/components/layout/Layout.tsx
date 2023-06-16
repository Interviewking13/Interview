import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { colors } from "../../constants/colors";

type LayoutProps = {
  children: ReactNode;
};

const blaklist = ["/login", "/login/signup"];

const Layout = (props: LayoutProps) => {
  const { pathname } = useLocation();
  const isShow = !blaklist.some((path) => pathname.includes(path));

  return (
    <StyledBody>
      <Wrap isShow={isShow}>
        {isShow && <Header />}
        <div>{props.children}</div>
        {isShow && <Footer />}
      </Wrap>
    </StyledBody>
  );
};

export default Layout;

const StyledBody = styled.div`
  height: 100vh;
`;

const Wrap = styled.div<{ isShow: boolean }>`
  position: relative;
  min-height: 100%;
  padding-bottom: 165px;

  ${({ isShow }) =>
    !isShow &&
    css`
      padding-bottom: 0px;
      background-color: ${colors.back_navy};
  `}
`;
