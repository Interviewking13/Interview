import { HTMLAttributes } from 'react';
import styled from 'styled-components';
import { colors } from '../../../constants/colors';
import * as fonts from '../../../constants/fonts';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { deleteStudy, getInfoStudyData, putInfoStudy } from '../../../api/api-study';
import { useQuery } from 'react-query';
import React, { useState, useEffect } from 'react';
import { dateFomatting, dateFomattingLine } from '../../../utils/dateFomatting';
import { useQueryClient } from 'react-query';
import { getCurrentDate } from '../../../utils/getCurrentDate';
import InfoMessage from '../../UI/InfoMessage';

/** 스터디 수정 컴포넌트 타입지정 */
type StudyModifyProps = {
    studyId: string;
};

/** 스터디 수정 컴포넌트 props : (studyId) */
const StudyModify: React.FC<StudyModifyProps> = ({ studyId }) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const lastPathSegment = path.substring(path.lastIndexOf('/') + 1);

    // 리액트 쿼리로 유저 데이터를 불러옴
    const {
        data: studyData,
        isLoading,
        isError,
    } = useQuery(['studyData'], () => getInfoStudyData(studyId).then((response) => response.data));

    // 에러 메시지 상태 추가
    const [error, setError] = useState('');
    // 신청 인원 수 상태 추가
    const [acceptcount, setAcceptcount] = useState(0);
    // 스터디 이름 상태 추가
    const [studyName, setStudyName] = useState('');
    // 스터디 설명 상태 추가
    const [studyDescription, setStudyDescription] = useState('');
    // 회의 링크 상태 추가
    const [meetingLink, setMeetingLink] = useState('');
    // 시작 날짜 상태 추가
    const [startDate, setStartDate] = useState('');
    // 종료 날짜 상태 추가
    const [endDate, setEndDate] = useState('');
    // 모집 마감일 상태 추가
    const [recruitmentDeadline, setRecruitmentDeadline] = useState('');
    // 모집 인원 상태 추가
    const [recruitmentCount, setRecruitmentCount] = useState(0);

    // studyData에서 불러온 값들을 상태관리 set함수로 넣어 줌.
    useEffect(() => {
        if (studyData) {
            // studyData 분해구조 할당
            const { title, content, chat_link, start, end, deadline, headcount, acceptcount } = studyData;
            setAcceptcount(acceptcount);
            setStudyName(title);
            setStudyDescription(content);
            setMeetingLink(chat_link);
            setStartDate(dateFomattingLine(start));
            setEndDate(dateFomattingLine(end));
            setRecruitmentDeadline(dateFomattingLine(deadline));
            setRecruitmentCount(headcount);
        }
    }, [studyData]);

    /** 스터디 수정버튼 핸들러 */
    const handleModifyClick: React.MouseEventHandler<HTMLDivElement> = () => {
        //스터디 수정 내용 유효성 검사
        if (studyName.length < 2 || studyDescription.length < 10) {
            setError('스터디 이름은 최소 2글자, 스터디 소개는 최소 10글자 이상이어야 합니다.');
            return;
        }

        if (!/^https?:\/\//i.test(meetingLink)) {
            setError("회의 링크는 'https://' 형식 이여야 합니다.");
            return;
        }

        // 현재 날짜 불러오기
        const currentDate = getCurrentDate();

        if (startDate < currentDate) {
            setError(`시작일은 ${currentDate}일 이후로 지정해 주세요.`);
            return;
        }

        if (endDate <= startDate) {
            setError(`종료일은 ${startDate}일 이후로 지정해 주세요.`);
            return;
        }

        if (recruitmentDeadline < currentDate) {
            setError(`모집 마감일은 ${currentDate}일 이후로 지정해 주세요.`);
            return;
        }

        // 모집인원이 현재 스터디 인원보다 적을 경우
        if (recruitmentCount === 0 || acceptcount > recruitmentCount) {
            setError('모집인원을 올바르게 설정해 주세요.');
            return;
        }

        // 수정된 스터디 내용을 updatedStudy객체로 저장.
        const updatedStudy = {
            study_name: studyName,
            title: studyName,
            content: studyDescription,
            deadline: recruitmentDeadline,
            start: startDate,
            end: endDate,
            headcount: recruitmentCount,
            chat_link: meetingLink,
            status: 0, // 예시로 status 값을 0으로 설정
            token: String(localStorage.getItem('token')), // 인증 토큰 전달
        };
        // 스터디 수정 api 요청.
        putInfoStudy(String(localStorage.getItem('token')), studyId, updatedStudy).then(() => {
            // studyData 키값으로 캐시 무효화
            queryClient.invalidateQueries(['studyData']);
            // 데이터 새로고침
            // refetch();
        });
        // 링크 이동
        navigate(`/study/${studyId}`);
    };

    /** 스터디 삭제 핸들러 */
    const handleDeleteClick: React.MouseEventHandler<HTMLDivElement> = () => {
        // 스터디 삭제 api 요청
        deleteStudy(String(localStorage.getItem('token')), studyId).then((res) => {
            // 메인페이지로 이동
            navigate('/');
        });
    };

    if (isLoading) {
        // 로딩 상태를 표시
        return <InfoMessage message="Loading..." />;
    }

    if (isError) {
        // 에러 상태를 표시
        return <InfoMessage message="Error occurred while fetching data" />;
    }

    return (
        <>
            <StyledStudyCreateArea>
                <StyledStudyCreateInputArea>
                    <StyledStudyCreateText>스터디 이름</StyledStudyCreateText>
                    <StyledStudyInput
                        type="text"
                        placeholder="스터디 이름을 입력하세요."
                        value={studyName}
                        onChange={(e) => setStudyName(e.target.value)}
                    />
                </StyledStudyCreateInputArea>
                <StyledStudyCreateInputAreaBig>
                    <StyledStudyCreateText>스터디 소개</StyledStudyCreateText>
                    <StyledStudyInputBig
                        placeholder="스터디 설명을 입력하세요."
                        value={studyDescription}
                        onChange={(e) => setStudyDescription(e.target.value)}
                    />
                </StyledStudyCreateInputAreaBig>
                <StyledStudyCreateInputArea>
                    <StyledStudyCreateText>회의 링크</StyledStudyCreateText>
                    <StyledStudyInput
                        type="url"
                        placeholder="화상 회의 주소를 입력하세요."
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                    />
                </StyledStudyCreateInputArea>
                <StyledStudyCreateInputArea>
                    <StyledStudyCreateText>진행 기간</StyledStudyCreateText>
                    <StyledDateArea>
                        <StyledStudyDate type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <StyledStudyDateText>~</StyledStudyDateText>
                        <StyledStudyDate type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </StyledDateArea>
                </StyledStudyCreateInputArea>
                <StyledStudyCreateInputArea>
                    <StyledStudyCreateText>모집 마감일</StyledStudyCreateText>
                    <StyledStudyDate
                        type="date"
                        value={recruitmentDeadline}
                        onChange={(e) => setRecruitmentDeadline(e.target.value)}
                    />
                </StyledStudyCreateInputArea>
                <StyledStudyCreateInputArea>
                    <StyledStudyCreateText>모집 인원</StyledStudyCreateText>
                    <StyledStudyInputNumber
                        type="number"
                        min="1"
                        placeholder="모집 인원을 입력하세요."
                        value={recruitmentCount}
                        onChange={(e) => setRecruitmentCount(Number(e.target.value))}
                    />
                </StyledStudyCreateInputArea>
                <StyledStudyCreateBtnArea>
                    <StyledBtnContainer>
                        <SubButtonContainer>
                            <StyledCommonButton
                                backgroundColor={colors.main_mint}
                                onClick={handleModifyClick} // onClick 이벤트 핸들러 추가
                            >
                                <StyledButtonTextDelete>수정하기</StyledButtonTextDelete>
                            </StyledCommonButton>
                        </SubButtonContainer>
                    </StyledBtnContainer>
                    <StyledBtnContainer>
                        <SubButtonContainer>
                            <StyledCommonButton backgroundColor={colors.main_red} onClick={handleDeleteClick}>
                                <StyledButtonTextDelete>스터디 삭제</StyledButtonTextDelete>
                            </StyledCommonButton>
                        </SubButtonContainer>
                    </StyledBtnContainer>
                    {error && <StyledErrorMessage>{error}</StyledErrorMessage>}
                </StyledStudyCreateBtnArea>
            </StyledStudyCreateArea>
        </>
    );
};

export default StudyModify;

/** 스터디 수정 컨테이너 div */
const StyledStudyCreateArea = styled.div`
    margin: 20px 0 20px 0;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    gap: 20px;
    @media screen and (max-width: 768px) {
        width: 100%;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        gap: 5px;
        margin: 0px;
    }
`;

/** 스터디 수정 input 컨테이너 div */
const StyledStudyCreateInputArea = styled.div`
    height: 45px;
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        width: calc(100% - 20px);
        height: 90px;
    }
`;

/** 스터디 소개, 설명 컨테이너 div */
const StyledStudyCreateInputAreaBig = styled.div`
    height: 400px;
    display: flex;
    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        width: calc(100% - 20px);
    }
`;

/** 스터디 모집마감, 인원 p */
const StyledStudyCreateText = styled.p`
    width: 163px;
    margin: 0;
    font-family: ${fonts.SubText};
    padding: 10px 0;
    color: ${colors.main_gray};
`;

/** 스터디 이름, 회의주소 input */
const StyledStudyInput = styled.input`
    width: 1080px;
    height: 45px;
    border: solid 1px ${colors.main_navy};
    border-radius: 10px;
    margin: 0;
    padding-left: 20px;
    font-family: ${fonts.SubTextThinSmall};
    @media screen and (max-width: 768px) {
        width: calc(100% - 20px);

        height: 45px;
    }
`;

/** 스터디 모집인원 input */
const StyledStudyInputNumber = styled.input`
    width: 447px;
    height: 45px;
    border: solid 1px ${colors.main_navy};
    border-radius: 10px;
    margin: 0;
    padding: 0 20px 0 20px;
    font-family: sans-serif;
    font-size: 16px;
    @media screen and (max-width: 768px) {
        width: calc(100% - 40px);
    }
`;

/** 스터디 기간 div */
const StyledDateArea = styled.div`
    width: 1103px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

/** 스터디 기간 ~표시 p */
const StyledStudyDateText = styled.p`
    margin: 0;
    font-family: ${fonts.SubText};
    color: ${colors.main_gray};
`;

/** 스터디 날짜 input */
const StyledStudyDate = styled.input`
    width: 447px;
    height: 45px;
    border: solid 1px ${colors.main_navy};
    border-radius: 10px;
    margin: 0;
    padding: 0 20px 0 20px;
    font-family: sans-serif;
    font-size: 16px;
    @media screen and (max-width: 768px) {
        width: calc(100% - 40px);
    }
`;

/** 스터디 설명을 입력 컨테이너 textarea */
const StyledStudyInputBig = styled.textarea`
    width: 1082px;
    height: 380px;
    border: solid 1px ${colors.main_navy};
    border-radius: 10px;
    margin: 0;
    padding: 20px 0 0 20px;
    font-family: sans-serif;
    font-size: 16px;
    resize: none;

    ::-webkit-scrollbar {
        width: 20px; /* 스크롤바 너비 */
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${colors.darkgray_navy}; /* 스크롤바 색상 */
        border-radius: 20px; /* 스크롤바 둥글게 */
        margin-right: 20px;
        border: solid 6px white;
    }

    ::-webkit-scrollbar-track {
        width: 14px;
        background-color: none; /* 스크롤바 트랙 색상 */
        border-radius: 4px; /* 스크롤바 트랙 둥글게 */
    }
    @media screen and (max-width: 768px) {
        width: calc(100% - 20px);
    }
`;

/** 스터디 버튼 전체 컨테이너 div */
const StyledStudyCreateBtnArea = styled.div`
    width: 1270px;
    display: flex;
    flex-direction: row-reverse;
    gap: 20px;
    @media screen and (max-width: 768px) {
        width: 100%;
        justify-content: center;
        gap: 5px;
    }
`;

/** 스터디 버튼 컨테이너 div */
const StyledBtnContainer = styled.div`
    text-decoration: none;
    color: ${colors.main_black};
    display: flex;
    align-items: center;
    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

/** 스터디 버튼 타입지정 */
interface StyledCommonButtonProps extends HTMLAttributes<HTMLDivElement> {
    backgroundColor?: string;
}

/** 스터디 수정 버튼 div*/
const StyledCommonButton = styled.div<StyledCommonButtonProps>`
    cursor: pointer;
    width: 132px;
    height: 45px;
    background-color: ${(props) => props.backgroundColor}; /* props로 전달받은 배경색을 사용 */
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 10px;
    &:hover {
        background-color: ${colors.main_navy};
        color: white;
    }
    ${fonts.SubText}
`;

/** 스터디 취소 버튼 p*/
const StyledButtonTextDelete = styled.p`
    font-family: ${fonts.SubTextBig};
    color: ${colors.back_navy};
`;

/** 스터디 버튼 서브 컨테이너 div*/
const SubButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    @media screen and (max-width: 768px) {
        display: flex;
        justify-content: flex-end;
    }
`;

/** 에러 메세지 p */
const StyledErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    margin: 0 15px 0 0;
    @media screen and (max-width: 768px) {
        margin: 10px 0;
    }
`;
