import React from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import { TitleText } from "../../constants/fonts";

const StyledFooterWrapper = styled.div`
  width: 100%;
  background-color: ${colors.back_navy};
  padding-bottom: 50px;
`
const Divider = styled.div`
  margin-bottom: 40px;
  border-bottom: 1px solid ${colors.gray_stroke};
`;

const StyledFooterContainer = styled.div`
  margin: 0 auto; /* 가운데 정렬을 위한 수정 */
  width: 1270px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledFooterLogoContainer = styled.div`
  ${TitleText}
`;

const StyledFooterLogo = styled.div`
  color: ${colors.gray_navy};
`;

const StyledFooterInfoContainer = styled.div`
  display: flex;
`;

const StyledFooterInfo = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #909090;
  margin-left: 125px;
`;

const StyledFooterCopyright = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #909090; 
  margin-left: 80px;
  text-align: right;
`;

const Footer = () => {
  return (
    <StyledFooterWrapper>
      <Divider></Divider>
      <StyledFooterContainer>
        <StyledFooterLogoContainer>
          <StyledFooterLogo>
            면접왕
          </StyledFooterLogo>
        </StyledFooterLogoContainer>
        <StyledFooterInfoContainer>
          <StyledFooterInfo>
            footerfooterfooterfooter<br />
            footerfooterfooterfooterfooterfooterfooter<br />
            footerfooterfooter
          </StyledFooterInfo>
          <StyledFooterInfo>
            footerfooterfooterfooter<br />
            footerfooterfooterfooterfooterfooterfooter<br />
            footerfooterfooter
          </StyledFooterInfo>
        </StyledFooterInfoContainer>
        <StyledFooterCopyright>
          footerfooterfooterfooter<br />
          footerfooterfooter<br /><br />
          Copyright © 2023 SW4.CARCAR All Rights Reserved.
        </StyledFooterCopyright>
      </StyledFooterContainer>
    </StyledFooterWrapper>
  );
};

export default Footer;
