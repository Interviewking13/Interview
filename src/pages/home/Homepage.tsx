import React from "react";
import styled from "styled-components";
import StudyListItem from "../../components/layout/StudyListItem";

import { colors } from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import PencilIconSrc from "../../img/pencil_mint.svg";
import Slider from "react-slick";
import './slick/slick-theme.css';
import './slick/slick.css';

import { getInfoAllStudyData } from "../../api/api-study";


const HomePage = (): JSX.Element => {

  type StudyData = {
    id: number,
    title: string,
    headcount: number,
    start: string,
    end: string,
    deadline: string,
    master: string
  }

  const [studyData, setStudyData] = React.useState<StudyData[]>([]);

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

  return (
    <>
      <StyledCarouselArea>
        <Slider
        dots= {true}
        infinite= {true}
        speed= {500}
        fade= {true}
        cssEase= {"linear"}
        autoplay= {true}
        autoplaySpeed= {3000}
        >
          <StyledCarouselOne></StyledCarouselOne>
          <StyledCarouselTwo></StyledCarouselTwo>
        </Slider>
      </StyledCarouselArea>

      <StyledCommonContainer>

        <StyledItemNameArea>
          <StyledTitleText>새로 올라온 스터디</StyledTitleText>
        </StyledItemNameArea>

        <StudyListItemArea>
        {studyData.map((study,index) => (
          <StudyListItem
           key={index}
           id={study.id}
           title={study.title}
           // currentParticipants={study.currentParticipants}
           maxParticipants={study.headcount}
           startDate={study.start}
           endDate={study.end}
           recruitDeadline={study.deadline}
           master={study.master}
           />
        ))}

        </StudyListItemArea>
        
        <StyledMainStudyBtnArea>      
          <StyledMainStudyBtn>

            <StyeldBtnTextArea>

              <StyeldBtnTitleArea>
                <StyledIcon src={PencilIconSrc} />
                <StyledMainBtnTitle>스터디 참여하기</StyledMainBtnTitle>
              </StyeldBtnTitleArea>

              <StyledMainBtnSub>
                참여하고 싶은 스터디를 찾고, 자신있는 면접을 준비해보세요!
              </StyledMainBtnSub>
            </StyeldBtnTextArea>


          </StyledMainStudyBtn>

          <StyledMainStudyBtn>

            <StyeldBtnTextArea>

              <StyeldBtnTitleArea>
                <StyledIcon src={PencilIconSrc} />
                <StyledMainBtnTitle>
                  스터디 만들기
                </StyledMainBtnTitle>
              </StyeldBtnTitleArea>

              <StyledMainBtnSub>
                알맞는 스터디가 없다면 직접 스터디를 개설해보세요!
              </StyledMainBtnSub>
            </StyeldBtnTextArea>

          </StyledMainStudyBtn>
        </StyledMainStudyBtnArea>    

        <StyledItemNameArea>
          <StyledTitleText>커뮤니티 소식</StyledTitleText>
        </StyledItemNameArea>

        <StyledMainCommunityArea>

        </StyledMainCommunityArea>

      </StyledCommonContainer>
    </>
    
  );
};

export default HomePage;


const StyledCommonContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
`;

const StyledCarouselArea = styled.div`
  overflow: hidden;
  height: 346px;
`
const StyledCarouselOne = styled.div`
  width: 1920px;
  height: 346px;
  margin: 0 auto;
  background-color: ${colors.back_navy};
  cursor: pointer;
`
const StyledCarouselTwo = styled.div`
  width: 1920px;
  height: 346px;
  margin: 0 auto;
  cursor: pointer;
  background-color: #F2FFFA;
`

const StyledItemNameArea = styled.div`
  margin: 50px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const StyledTitleText = styled.p`
  height: fit-content;
  color: ${colors.main_navy};
  margin: 0 30px 0 0;
  ${fonts.TitleText}
`;
const StudyListItemArea = styled.p`
  width: 1270px;
  height: 295px;
  margin: 30px 0 40PX 0;
  display: grid;
  grid-auto-rows: 295px;
  grid-template-columns: 298px 298px 298px 298px;
  grid-row-gap: 30px;
  grid-column-gap: 25px;
`;


const StyledMainStudyBtnArea = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledMainStudyBtn = styled.div`
  width: 620px;
  height: 134px;
  border: solid 1px ${colors.main_mint};
  border-radius: 15px;
`;
const StyeldBtnTextArea  = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 35px 0 0 40px;
`;
const StyeldBtnTitleArea = styled.p`
  height: fit-content;
  display: flex;
  margin: 0;
`;
const StyledIcon = styled.img`
  width: 27px;
  height: 27px;
`;
const StyledMainBtnTitle = styled.p`
  margin: 2px 0 20px 20px;
  ${fonts.SubText}
  font-size: 20px;
`;
const StyledMainBtnSub = styled.p`
  ${fonts.SubTextThinSmall}
  margin: 0 0 0 0;
`;

const StyledMainCommunityArea = styled.div`
  height: 300px;
`