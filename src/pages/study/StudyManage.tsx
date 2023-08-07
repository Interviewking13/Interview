import React, { useState } from 'react';
import { Button, Typography, Grid, Box } from '@mui/material';
import { Create, Person, Checklist } from '@mui/icons-material'; //MUI icon import
import StudyModify from '../../components/study/manage/StudyModify';
import StudyMemberManagement from '../../components/study/manage/StudyMemberManagement';
import StudyApplicantList from '../../components/study/manage/StudyApplicantList';

import StudyManageMain from '../../components/study/manage/StudyManageMain';
import styled from 'styled-components';
import { colors } from '../../constants/colors';
import * as fonts from '../../constants/fonts';
import MenuTapBtn from '../../components/UI/MenuTapBtn';

/** 스터디 관리 페이지 컴포넌트 */
const StudyManage = () => {
    const path = location.pathname;
    const studyId = path.substring(path.lastIndexOf('/') + 1);
    //준영님 페이지에서도 url 넘겨야함 studyId
    const [activePage, setActivePage] = useState('modify');

    /** 스터디 관리 주 페이지 이동 핸들러 */
    const onClickStudyManageMain = () => {
        // setActivePage("manage-main");
        setActivePage('modify');
    };

    /** 스터디 수정 페이지 이동 핸들러 */
    const onClickStudyModify = () => {
        setActivePage('modify');
    };

    /** 스터디 맴버 관리 페이지 이동 핸들러 */
    const onClickMemberManagement = () => {
        setActivePage('member');
    };

    /** 스터디 맴버 신청인원 페이지 이동 핸들러 */
    const onClickApplicantList = () => {
        setActivePage('applicant');
    };

    /** 스터디 관리 페이지 탭 관련 프롭스 타입 지정 */
    type StudyManageMainProps = {
        activePage: string;
        onClickStudyModify: () => void;
        onClickMemberManagement: () => void;
        onClickApplicantList: () => void;
    };

    /** 스터디 관리 페이지 탭 관련 프롭스 */
    const studyManageMainProps: StudyManageMainProps = {
        activePage,
        onClickStudyModify,
        onClickMemberManagement,
        onClickApplicantList,
    };

    return (
        <div>
            <CommonContainer>
                <StyledManageTapArea>
                    <StyledTitleText onClick={onClickStudyManageMain}>스터디 관리</StyledTitleText>
                    <StyledSubTextThin>스터디 관리자 페이지입니다.</StyledSubTextThin>
                </StyledManageTapArea>
                {/* 버튼1, 버튼2, 버튼3 */}
                {activePage === 'manage-main' ? (
                    <StudyManageMain {...studyManageMainProps} />
                ) : (
                    <>
                        <GridContainer item xs={12} activePage={activePage}>
                            <Grid container spacing={1} justifyContent="flex-start">
                                <MenuTapBtn onClick={onClickStudyModify}>
                                    <Create />
                                    정보수정
                                </MenuTapBtn>
                                <MenuTapBtn onClick={onClickMemberManagement}>
                                    <Checklist />
                                    회원관리
                                </MenuTapBtn>
                                <MenuTapBtn onClick={onClickApplicantList}>
                                    <Person />
                                    신청목록
                                </MenuTapBtn>
                            </Grid>
                        </GridContainer>
                    </>
                )}
                {activePage === 'modify' && <StudyModify studyId={studyId} />}
                {activePage === 'member' && <StudyMemberManagement studyId={studyId} />}
                {activePage === 'applicant' && <StudyApplicantList studyId={studyId} />}
            </CommonContainer>
        </div>
    );
};

export default StudyManage;

/** 공통 전체 컨테이너 div */
const CommonContainer = styled.div`
    width: 1270px;
    margin: 0 auto;
    font-family: ${fonts.SubTextThinSmall};
    @media screen and (max-width: 768px) {
        width: 100%;
        margin: 10px;
    }
`;

/** 스터디 관리 탭 부분 div */
const StyledManageTapArea = styled.div`
    margin: 50px 0 0 0;
    display: flex;
    align-items: baseline;
    @media screen and (max-width: 768px) {
        margin: 10px 0 0 0;
        flex-direction: column;
        align-items: left;
    }
`;

/** Grid 컨테이너 */
const GridContainer = styled(Grid)<{ activePage: string }>`
    @media screen and (max-width: 768px) {
        justify-content: center;
        width: 100%;
        min-width: 370px;
    }
`;

/** 타이틀 p */
const StyledTitleText = styled.p`
    height: fit-content;
    cursor: pointer;
    ${fonts.TitleText}
    color: ${colors.main_mint};
    margin: 0 30px 10px 0;
    @media screen and (max-width: 768px) {
        margin: 0;
    }
`;

/** 서브 텍스트 p */
const StyledSubTextThin = styled.p`
    width: 439px;
    height: fit-content;
    font-size: 18px;
    font-weight: light;
    color: ${colors.main_gray};
    margin: 0;
    @media screen and (max-width: 768px) {
        width: 100%;
        text-align: left;
    }
`;
