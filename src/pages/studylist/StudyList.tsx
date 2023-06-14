import styled from "styled-components";
import React from 'react';
import StudyListItem from "../../components/study/StudyListItem";

import { colors } from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import SearchIconSrc from "../../img/search_navy.svg";
import { getInfoAllStudyData } from "../../api/api-study";
import { dateSplice } from "../../utils/dateFomatting";
import { Link } from "react-router-dom";

const StudyList = (): JSX.Element => {
  type StudyData = {
    _id: string,
    title: string,
    acceptcount: number,
    headcount: number,
    start: string,
    end: string,
    deadline: string,
    leader_name: string
  }

  const [studyData, setStudyData] = React.useState<StudyData[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 12;

  React.useEffect(() => {
    getInfoAllStudyData()
      .then((response) => {
        console.log(response.data);
        setStudyData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const getDisplayedStudyData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return studyData.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(studyData.length / itemsPerPage);

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const generatePaginationNumbers = () => {
    const paginationNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      paginationNumbers.push(
        <PaginationNumber
          key={i}
          onClick={() => goToPage(i)}
          active={i === currentPage}
        >
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
          <StyledInput type="text" name="search" id="" placeholder="검색하기" />
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

      <PaginationArea>
        <PaginationButton
          disabled={currentPage === 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          	&lt;
        </PaginationButton>
        {generatePaginationNumbers()}
        <PaginationButton
          disabled={currentPage === totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
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
`;

const StudyListTopArea = styled.div`
  margin: 50px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const StudyListInputArea = styled.div`
  width: 472px;
  display: flex;
  justify-content: space-between;
`;

const StyledTitleText = styled.p`
  height: fit-content;
  ${fonts.TitleText}
  color: ${colors.main_navy};
  margin: 0 30px 0 0;
`;

const StyledSubTextThin = styled.p`
  width: 595px;
  height: fit-content;
  font-weight: light;
  color: ${colors.darkgray_navy};
  margin: 0;
  ${fonts.SubTextThin}
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
  display: grid;
  grid-auto-rows: 295px;
  grid-template-columns: 298px 298px 298px 298px;
  grid-row-gap: 30px;
  grid-column-gap: 25px;
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
  color: ${({ active }) =>
    active ? colors.dark_navy : colors.gray_navy};
  border: none;
  outline: none;
  cursor: pointer;
  ${fonts.SubTextSmall}
  transition: background-color 0.3s;

  &:hover {
    background-color: transparent;
  }
`;
