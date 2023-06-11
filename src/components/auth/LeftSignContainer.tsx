

import styled from "styled-components";
import { TitleText } from "../../constants/fonts";
import { colors } from "../../constants/colors";

const LeftSignContainer: React.FC = () => {

  return (
    <div>
      <StyledLoginTitleContainer>
        <StyledLoginText>면접을 면접답게</StyledLoginText>
        <StyledLoginText>면접왕</StyledLoginText>
        <StyledLoginText>면접왕에서 스터디 찾고, 동료들과 함께 자신있는 면접을 준비하세요</StyledLoginText>
      </StyledLoginTitleContainer>
    </div>
  );
};
export default LeftSignContainer;


const StyledLoginTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledLoginText = styled.div`
  height: fit-content;
  ${TitleText}
  color: ${colors.main_navy};
  font-size: 64px; 
  font-weight:400;
  
  &:nth-of-type(2) {
    color: ${colors.main_mint};
    margin-top: 20px;
  }

  &:nth-of-type(3) {
    font-family: none;
    color: ${colors.darkgray_navy};
    font-size: 18px;
    font-weight:300;
    margin-top: 50px;
  }
`;