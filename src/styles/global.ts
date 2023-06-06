import { createGlobalStyle } from "styled-components";
import EstablishRetrosans from "../fonts/establishRetrosans.ttf";
import PretendardLight from "../fonts/Pretendard-Light.ttf";
import PretendardSemiBold from "../fonts/Pretendard-SemiBold.ttf";

const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: "EstablishRetrosans";
    src: url("/fonts/EstablishRetrosans.ttf") format("truetype");
  }
  
  @font-face {
    font-family: "PretendardLight";
    src: url("/fonts/Pretendard-Light.ttf") format("truetype");
  }
  
  @font-face {
    font-family: "PretendardSemiBold";
    src: url("/fonts/Pretendard-SemiBold.ttf") format("truetype");
  }`;
