import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';

import StyledIcon from '../layout/Img';
import PeopleIconSrc from '../../img/people_navy.svg';
import { colors } from '../../constants/colors';
import * as fonts from '../../constants/fonts';
import { getCurrentDate } from '../../utils/getCurrentDate';
import { dateSplice } from '../../utils/dateFomatting';

type StudyListProps = {
    id: string;
    title: string;
    currentParticipants: number;
    maxParticipants: number;
    startDate: string;
    endDate: string;
    recruitDeadline: string;
    master: string;
};

/** 스터디 간소 UI 컴포넌트 props:{
    id,
    title,
    currentParticipants,
    maxParticipants,
    startDate,
    endDate,
    recruitDeadline,
    master,
}  */
const StudyListItem: React.FC<StudyListProps> = ({
    id,
    title,
    currentParticipants,
    maxParticipants,
    startDate,
    endDate,
    recruitDeadline,
    master,
}) => {
    const [recruitmentStatus, setRecruitmentStatus] = useState('모집 중');
    const currentDate = getCurrentDate();
    // 같은 형식으로 포멧팅
    const formattedRecruitDeadline = `20${recruitDeadline}`.replaceAll('.', '-');
    const formattedRecruitEndDate = `20${endDate}`.replaceAll('.', '-');

    useEffect(() => {
        // 현재 스터디가 종료된 경우
        if (formattedRecruitEndDate < currentDate) {
            setRecruitmentStatus('종료');
        } else if (formattedRecruitDeadline < currentDate) {
            // 모집이 마감된 경우
            setRecruitmentStatus('모집 마감');
        } else {
            setRecruitmentStatus('모집 중');
        }
    }, [formattedRecruitEndDate, formattedRecruitDeadline, currentDate]);

    const isRecruitmentClosed = recruitmentStatus === '모집 마감';
    const isStudyClosed = recruitmentStatus === '종료';
    return (
        <StyledStudyListContainer key={id}>
            <StyledStudyListNavyArea>
                <StyledStudyTagArea>
                    <StyledStudyRecruitTag status={recruitmentStatus}>{recruitmentStatus}</StyledStudyRecruitTag>
                </StyledStudyTagArea>
                <StyledStudyName>{title}</StyledStudyName>
            </StyledStudyListNavyArea>

            <StyledStudyListWhiteText>
                <StyledStudyPeopleArea>
                    <StyledIcon src={PeopleIconSrc} />
                    <StyledStudyListPeopleText>
                        {currentParticipants} / {maxParticipants} 명
                    </StyledStudyListPeopleText>
                </StyledStudyPeopleArea>

                <StyledStudyDateArea>
                    <StyledStudyListDateText>
                        진행 기간 | {startDate} ~ {endDate}
                    </StyledStudyListDateText>
                    <StyledStudyListDateText>모집 마감 | {recruitDeadline}</StyledStudyListDateText>
                </StyledStudyDateArea>

                <StyledStudyMaster>{master}</StyledStudyMaster>
            </StyledStudyListWhiteText>
        </StyledStudyListContainer>
    );
};

export default StudyListItem;

const StyledStudyListContainer = styled.div`
    width: 295px;
    height: 295px;
    border: solid 1px #dadada;
    border-radius: 15px;
    background-color: #fff;
    margin: 0;
`;
const StyledStudyListNavyArea = styled.div`
    width: 295px;
    height: 124px;
    border: solid 1px #2e3057;
    border-radius: 15px 15px 0 0;
    background-color: #2e3057;
`;
const StyledStudyTagArea = styled.div`
    width: fit-content;
    height: 20px;
    font-size: 12px;
    margin: 35px 0 0 35px;
`;
/** 모집 상태에 따른 색상 props 로 전달   */
const StyledStudyRecruitTag = styled.div<{ status: string }>`
    width: fit-content;
    height: fit-content;
    display: inline;
    color: #fff;
    border-radius: 15px;
    padding: 1px 10px;
    margin-right: 8px;

    ${(props) =>
        props.status === '종료' &&
        css`
            color: ${colors.main_red};
            border: solid 1px ${colors.main_red};
        `};

    ${(props) =>
        props.status === '모집 마감' &&
        css`
            color: ${colors.main_yellow};
            border: solid 1px ${colors.main_yellow};
        `};

    ${(props) =>
        props.status === '모집 중' &&
        css`
            color: ${colors.main_mint};
            border: solid 1px ${colors.main_mint};
        `};
`;
const StyledStudyName = styled.p`
    width: 225px;
    height: fit-content;
    font-size: 24px;
    font-weight: semibold;
    color: #fff;
    margin-left: 35px;
    margin: 13px 0 0 35px;
    overflow: hidden;
    white-space: nowrap;
`;
const StyledStudyListWhiteText = styled.div`
    width: 225px;
    height: fit-content;
    margin: 20px 0 0 35px;
`;
const StyledStudyPeopleArea = styled.div`
    display: flex;
    font-size: 24px;
    font-weight: semibold;
`;
const StyledStudyDateArea = styled.div`
    height: 44px;
    font-size: 24px;
    font-weight: semibold;
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
`;
const StyledStudyListPeopleText = styled.p`
    font-size: 14px;
    font-weight: medium;
    color: black;
    margin: 0 0 0 8px;
`;
const StyledStudyListDateText = styled.p`
    font-size: 14px;
    font-weight: medium;
    color: black;
    margin: 0;
`;
const StyledStudyMaster = styled.p`
    font-size: 14px;
    font-weight: medium;
    color: black;
    margin: 20px 0 0 0;
`;
