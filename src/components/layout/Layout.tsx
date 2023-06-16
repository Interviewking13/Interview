import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

type LayoutProps = {
  children: ReactNode;
};

const blaklist = ["/login", "/login/signup"];

const Layout = (props: LayoutProps) => {
  const { pathname } = useLocation();
  const isShow = !blaklist.some((path) => pathname.includes(path));

  return (
    <StyledBody>
      <Wrap>
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

const Wrap = styled.div`
  position: relative;
  min-height: 100%;
  padding-bottom: 165px;
`;
