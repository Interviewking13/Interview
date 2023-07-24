import React from 'react';
import styled, { keyframes } from 'styled-components';
import InfoMessage from '../UI/InfoMessage';

type SpinnerProps = {
    message: string;
};

const Spinner: React.FC<SpinnerProps> = ({ message }) => {
    return (
        <StyledSpinnerContainer>
            <InfoMessage message={message} />
            <StyledSpinner />
        </StyledSpinnerContainer>
    );
};

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

export default Spinner;
