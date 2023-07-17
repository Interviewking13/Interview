import styled from "styled-components";
import { TitleText } from "../../constants/fonts";
import { colors } from "../../constants/colors";
import { useNavigate } from "react-router-dom";

// LeftSignContainer 컴포넌트 선언
const LeftSignContainer: React.FC = () => {
  // navigate 훅 사용 (라우터 이동을 위한 함수)
  const navigate = useNavigate();

  // 홈으로 이동하는 클릭 이벤트 핸들러
  const onClickNavigateHome = () => {
    navigate("/");
  };

  return (
    <div>
      <StyledTitleContainer onClick={onClickNavigateHome}>
        <StyledSubText>면접을 면접답게</StyledSubText>
        <StyledSubText>면접왕</StyledSubText>
        <StyledSubText>면접왕에서 스터디 찾고, 동료들과 함께 자신있는 면접을 준비하세요</StyledSubText>
      </StyledTitleContainer>
    </div>
  );
};

export default LeftSignContainer;

/** 왼쪽 타이틀 컨테이너 a */
const StyledTitleContainer = styled.a`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

/** 서브 텍스트 div */
const StyledSubText = styled.div`
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