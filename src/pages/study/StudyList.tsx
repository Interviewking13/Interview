import styled from 'styled-components';
import React from 'react';
import StudyListItem from '../../components/study/StudyListItem';
import { useQuery } from 'react-query'; // React Query에서 useQuery 임포트

import { colors } from '../../constants/colors';
import * as fonts from '../../constants/fonts';
import SearchIconSrc from '../../img/search_navy.svg';
import { getInfoAllStudyData } from '../../api/api-study';
import { dateSplice } from '../../utils/dateFomatting';
import { Link } from 'react-router-dom';
import { FetchingSpinner, LoadingSpinner } from '../../components/common/Spinners';

const StudyList = (): JSX.Element => {
    type StudyData = {
        _id: string;
        title: string;
        acceptcount: number;
        headcount: number;
        start: string;
        end: string;
        deadline: string;
        leader_name: string;
    };

    const [searchQuery, setSearchQuery] = React.useState(''); // 검색하기

    // useQuery를 사용하여 데이터 가져오기
    const { data: studyData, isLoading, isFetching, error } = useQuery<StudyData[]>('studyData', getInfoAllStudyData);

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 12;

    // 에러 처리
    if (error) {
        console.error('Error:', error);
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isFetching) {
        return <FetchingSpinner />;
    }

    const getDisplayedStudyData = () => {
        if (!studyData) return []; // studyData가 로드되지 않았을 경우 빈 배열 반환

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // studyData를 reverse하여 복사한 뒤 필터를 적용합니다.
        const reversedData = [...studyData].reverse();

        // 검색어(searchQuery)가 비어있지 않다면 필터를 적용합니다.
        const filteredData = searchQuery
            ? reversedData.filter((study) => study.title.toLowerCase().includes(searchQuery.toLowerCase()))
            : reversedData;

        return filteredData.slice(startIndex, endIndex);
    };

    // optional chaining 연산자를 사용하여 length에 안전하게 접근
    const totalPages = Math.ceil((studyData?.length || 0) / itemsPerPage);

    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const generatePaginationNumbers = () => {
        const paginationNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            paginationNumbers.push(
                <PaginationNumber key={i} onClick={() => goToPage(i)} active={i === currentPage}>
                    {i}
                </PaginationNumber>
            );
        }
        return paginationNumbers;
    };

    return (
        <CommonContainer>
            <StudyListTopArea>
                <StyledTitleText>스터디 찾기</StyledTitleText>
                <StyledSubTextThin>원하는 스터디를 찾고 가입해보세요.</StyledSubTextThin>

                <StudyListInputArea>
                    <StyledInput
                        type="text"
                        name="search"
                        id=""
                        placeholder="검색하기"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <StyledInputBtn>
                        <StyledIcon src={SearchIconSrc} />
                    </StyledInputBtn>
                    <StyledLink to={`/study/create`}>
                        <CommonButton>
                            <ButtonText>스터디 만들기</ButtonText>
                        </CommonButton>
                    </StyledLink>
                </StudyListInputArea>
            </StudyListTopArea>
            {studyData && studyData.length > 0 ? (
                <StudyListItemArea>
                    {getDisplayedStudyData().map((study) => (
                        <StyledLink to={`/study/${study._id}`} key={study._id}>
                            <StudyListItem
                                id={study._id}
                                title={study.title}
                                currentParticipants={study.acceptcount}
                                maxParticipants={study.headcount}
                                startDate={dateSplice(study.start)}
                                endDate={dateSplice(study.end)}
                                recruitDeadline={dateSplice(study.deadline)}
                                master={study.leader_name}
                            />
                        </StyledLink>
                    ))}
                </StudyListItemArea>
            ) : (
                <p>스터디 데이터가 없습니다.</p>
            )}

            <PaginationArea>
                <PaginationButton disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>
                    &lt;
                </PaginationButton>
                {generatePaginationNumbers()}
                <PaginationButton disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>
                    &gt;
                </PaginationButton>
            </PaginationArea>
        </CommonContainer>
    );
};

export default StudyList;

const CommonContainer = styled.div`
    width: 1270px;
    margin: 0 auto;
    @media screen and (max-width: 768px) {
        width: 100%; /* 모바일 화면에 딱 맞게 크기 설정 */
        margin: 0 auto;
    }
`;

const StudyListTopArea = styled.div`
    margin: 50px 0 0 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    @media screen and (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 10px 0 10px 0;
    }
`;

const StudyListInputArea = styled.div`
    width: 472px;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
        width: 300px;
        margin: 0;
    }
`;

const StyledTitleText = styled.p`
    height: fit-content;
    ${fonts.TitleText}
    color: ${colors.main_navy};
    margin: 0 30px 0 0;
    @media screen and (max-width: 768px) {
        margin: 0;
        text-align: center; /* 모바일 뷰에서 가운데 정렬 */
    }
`;

const StyledSubTextThin = styled.p`
    width: 595px;
    height: fit-content;
    font-weight: light;
    color: ${colors.darkgray_navy};
    margin: 0;
    ${fonts.SubTextThin}
    @media screen and (max-width: 768px) {
        width: 100%;
        text-align: center; /* 모바일 뷰에서 가운데 정렬 */
    }
`;

const CommonButton = styled.div`
    width: 132px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-content: center;
    border-radius: 10px;
    background-color: ${colors.main_mint};
    ${fonts.SubText}
    @media screen and (max-width: 768px) {
        display: none; /* 모바일 화면에서 숨기기 */
    }
`;

const ButtonText = styled.p`
    font-size: 18px;
    margin-top: 11px;
    border-radius: 10px;
`;

const StudyListItemArea = styled.div`
    width: 1270px;
    height: 945px;
    margin: 30px 0 40px 0;
    margin: 30px 0 40px 0;
    display: grid;
    grid-auto-rows: 295px;
    grid-template-columns: 298px 298px 298px 298px;
    grid-row-gap: 30px;
    grid-column-gap: 25px;

    @media screen and (max-width: 768px) {
        width: 100%;
        height: auto;
        margin: 10px 0;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    @media screen and (max-width: 500px) {
        /* 500px 이하일 때 2행으로 표시 */
        grid-template-columns: 2fr; /* 1행으로 표시하도록 변경 */
    }
`;

const StyledInput = styled.input`
    width: 325px;
    height: 45px;
    margin: 0;
    border: solid 1px ${colors.main_navy};
    box-sizing: border-box;
    border-radius: 10px;
    padding-left: 15px;
    color: ${colors.main_navy};
    ${fonts.SubTextThin}
    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

const StyledInputBtn = styled.button`
    background: none;
    border: none;
    margin-left: -70px;
    margin-top: 3px;
    cursor: pointer;
`;

const StyledIcon = styled.img`
    width: 27px;
    height: 27px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${colors.main_black};
    transition: 0.3s;

    :hover {
        transform: scale(1.007);
        transition: 0.3s;
    }
    @media screen and (max-width: 768px) {
        display: flex;
        justify-content: center;
    }
`;

const PaginationArea = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
`;

const PaginationButton = styled.button`
    width: 80px;
    height: 30px;
    margin: 0 10px;
    border-radius: 5px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    ${fonts.SubText}
    transition: background-color 0.3s;

    &:hover {
        background-color: transparent;
        color: ${colors.main_navy};
    }

    &:disabled {
        cursor: default;
        opacity: 0.5;
        color: ${colors.gray_navy};
    }
`;

const PaginationNumber = styled.button<{ active: boolean }>`
    width: 30px;
    height: 30px;
    margin: 0 5px;
    border-radius: 50%;
    background-color: transparent;
    color: ${({ active }) => (active ? colors.dark_navy : colors.gray_navy)};
    border: none;
    outline: none;
    cursor: pointer;
    ${fonts.SubTextSmall}
    transition: background-color 0.3s;

    &:hover {
        background-color: transparent;
    }
`;
