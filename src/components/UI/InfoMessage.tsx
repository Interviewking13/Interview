import React from 'react';
import { SubTextThin } from '../../constants/fonts';
import { colors } from '../../constants/colors';
import styled from 'styled-components';

/** InfoMessage 데이터 타입 지정 */
type InfoMessageProps = {
    message: string;
};

/** 안내문구 보여주는 컴포넌트 props : (message) */
const InfoMessage: React.FC<InfoMessageProps> = ({ message }) => {
    return (
        <Container>
            <Message>{message}</Message>
        </Container>
    );
};

/** 레이아웃 컨테이너 div */
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
`;

/** 안내문구 text p */
const Message = styled.p`
    ${SubTextThin};
    color: ${colors.darkgray_navy};
`;

export default InfoMessage;
