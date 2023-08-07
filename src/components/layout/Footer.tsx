import React from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import { TitleText } from "../../constants/fonts";

const StyledFooterWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${colors.back_navy};
  padding-bottom: 40px;
`;

const Divider = styled.div`
  margin-bottom: 40px;
  border-bottom: 1px solid ${colors.gray_stroke};
`;

const StyledFooterContainer = styled.div`
  margin: 0 auto; /* 가운데 정렬을 위한 수정 */
  width: 100%;
  max-width: 1270px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledFooterLogoContainer = styled.div`
  ${TitleText}
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const StyledFooterLogo = styled.div`
  color: ${colors.gray_navy};
`;

const StyledFooterInfoContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledFooterInfo = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #909090;
  margin-left: 125px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 300;
`;

const StyledFooterCopyright = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #909090;
  margin-left: 80px;
  text-align: right;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledCopyright = styled.div`
  display: none;
  font-size: 14px;
  font-weight: 300;
  color: #909090;
  text-align: center;
  margin: 10px 20px 0 20px;

  @media (max-width: 768px) {
    display: block;
    font-size: 14px;
  }
`

const Footer = () => {
  return (
    <StyledFooterWrapper>
      <Divider></Divider>
      <StyledFooterContainer>
        <StyledFooterLogoContainer>
          <StyledFooterLogo>면접왕</StyledFooterLogo>
        </StyledFooterLogoContainer>
        <StyledFooterInfoContainer>
          <StyledFooterInfo>
            COMPANY: Interview King
            <br />
            ADRESS: 서울특별시 강남구 선릉로 433
            <br />
            OWNER: 엘리스 SW 트랙 4기 13팀
          </StyledFooterInfo>
          <StyledFooterInfo>
            BUSINESS LICENSE: 1234-5678-13team
            <br />
            MAIL: contact@EliceSwTeam13.io
            <br />
            Elice SW 4th Gen, Engineer Track Team 13
          </StyledFooterInfo>
        </StyledFooterInfoContainer>
        <StyledFooterCopyright>
          CUSTOMER CENTER : 1234-5678
          <br />
          MONDAY-FRIDAY 10:00 - 17:00
          <br />
          <br />
          Copyright ⓒ 2023 EliceSw4Team13 Inc. All Rights Reserved.
        </StyledFooterCopyright>
        <StyledCopyright>Copyright ⓒ 2023 EliceSw4Team13 Inc. All Rights Reserved.</StyledCopyright>
      </StyledFooterContainer>
    </StyledFooterWrapper>
  );
};

export default Footer;
