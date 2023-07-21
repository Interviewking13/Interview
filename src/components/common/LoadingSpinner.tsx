import React from 'react';
import styled, { keyframes } from 'styled-components';
import InfoMessage from '../UI/InfoMessage';

/** 로딩 스피너(Loading Spinner) 컴포넌트 */
const LoadingSpinner: React.FC = () => {
    return (
        <StyledSpinnerContainer>
            <InfoMessage message="Loading..." />
            <StyledSpinner />
        </StyledSpinnerContainer>
    );
};

/*

로딩 스피너(Loading Spinner):
로딩 스피너는 웹 애플리케이션이 데이터를 불러오거나 
처리하는 동안 사용자에게 로딩 중임을 시각적으로 
표시하는 UI 요소입니다. 일반적으로 동그란 모양으로 
되어 있고 회전하는 애니메이션을 가지며, 사용자가 
기다리는 동안 화면에 표시됩니다. 데이터가 로딩되는 
동안 로딩 스피너를 보여줌으로써 사용자 경험을 향상시키고, 
사용자가 애플리케이션의 반응성을 인지할 수 있도록 도와줍니다.

*/

export default LoadingSpinner;

/** 회전 애니메이션 키프레임 */
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

/** 스피너 컨테이너 div */
const StyledSpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`;

/** 스피너 애니메이션 도는 UI부분 div */
const StyledSpinner = styled.div`
    margin: 20px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${rotateAnimation} 1s linear infinite;
`;
