import React from "react";
import styled from "styled-components";
import StudyListItem from "../../components/study/StudyListItem";
import BestBoardListItemContainer from "../community/components/BestBoardListItemContainer";

import { colors } from "../../constants/colors";
import * as fonts from "../../constants/fonts";
import PencilIconSrc from "../../img/pencil_mint.svg";
import CarouselImgSrc from "../../img/carousel_hand_img.svg";
import Slider from "react-slick";
import "./slick/slick-theme.css";
import "./slick/slick.css";

import { getInfoAllStudyData } from "../../api/api-study";
import { dateSplice } from "../../utils/dateFomatting";
import { Link } from "react-router-dom";

const HomePage = (): JSX.Element => {
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
          dots={true}
          infinite={true}
          speed={500}
          fade={true}
          cssEase={"linear"}
          autoplay={true}
          autoplaySpeed={3000}
        >
          <StyledCarouselOne>
            <StyledCarouselContainer>
              <StyledCarouselTextArea>
                <StyledCarouselTitleTextNavy>
                  면접을 <br />
                  면접답게
                </StyledCarouselTitleTextNavy>
                <StyledCarouselSubText>
                  면접왕에서 스터디 찾고, 동료들과 함께 자신있는 면접을
                  준비하세요
                </StyledCarouselSubText>
              </StyledCarouselTextArea>

              <StyledCarouselImg src={CarouselImgSrc} />
            </StyledCarouselContainer>
          </StyledCarouselOne>
          <StyledCarouselTwo>
            <StyledCarouselContainer>
              <StyledCarouselTextArea>
                <StyledCarouselTitleTextMint>
                  면접을 <br />
                  면접답게
                </StyledCarouselTitleTextMint>
                <StyledCarouselSubText>
                  면접왕에서 스터디 찾고, 동료들과 함께 자신있는 면접을
                  준비하세요
                </StyledCarouselSubText>
              </StyledCarouselTextArea>

              <StyledCarouselImg src={CarouselImgSrc} />
            </StyledCarouselContainer>
          </StyledCarouselTwo>
        </Slider>
      </StyledCarouselArea>

      <StyledCommonContainer>
        <StyledItemNameArea>
          <StyledTitleText>새로 올라온 스터디</StyledTitleText>
        </StyledItemNameArea>

        <StudyListItemArea>
          {studyData
            .reverse()
            .slice(0, 4)
            .map((study) => (
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

        <StyledMainStudyBtnArea>
          <StyledLink to={`/study`}>
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
          </StyledLink>

          <StyledLink to={`/study/create`}>
            <StyledMainStudyBtn>
              <StyeldBtnTextArea>
                <StyeldBtnTitleArea>
                  <StyledIcon src={PencilIconSrc} />
                  <StyledMainBtnTitle>스터디 만들기</StyledMainBtnTitle>
                </StyeldBtnTitleArea>

                <StyledMainBtnSub>
                  알맞는 스터디가 없다면 직접 스터디를 개설해보세요!
                </StyledMainBtnSub>
              </StyeldBtnTextArea>
            </StyledMainStudyBtn>
          </StyledLink>
        </StyledMainStudyBtnArea>

        <StyledItemNameArea>
          <StyledTitleText>커뮤니티 소식</StyledTitleText>
        </StyledItemNameArea>

        <StyledMainCommunityArea>
          <BestBoardListItemContainer tap={1} />
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
  margin-top: 25px;
`;
const StyledCarouselContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;
const StyledCarouselTextArea = styled.div`
  margin-top: 87px;
`;
const StyledCarouselImg = styled.img`
  margin-top: 44px;
`;
const StyledCarouselOne = styled.div`
  width: 1920px;
  height: 346px;
  margin: 0 auto;
  background-color: ${colors.back_navy};
  cursor: pointer;
`;
const StyledCarouselTwo = styled.div`
  width: 1920px;
  height: 346px;
  margin: 0 auto;
  cursor: pointer;
  background-color: #f2fffa;
`;
const StyledItemNameArea = styled.div`
  margin: 50px 0 30px 0;
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
const StyledCarouselTitleTextNavy = styled.p`
  width: 322px;
  height: fit-content;
  color: ${colors.main_navy};
  margin: 0 30px 0 0;
  ${fonts.TitleText}
  font-size: 56px;
`;
const StyledCarouselTitleTextMint = styled.p`
  width: 322px;
  height: fit-content;
  color: ${colors.main_mint};
  margin: 0 30px 0 0;
  ${fonts.TitleText}
  font-size: 56px;
`;
const StyledCarouselSubText = styled.p`
  ${fonts.SubTextThinSmall}
  margin: 34 0 0 0;
`;
const StudyListItemArea = styled.div`
  width: 1270px;
  height: 295px;
  margin: 0 0 40px 0;
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
const StyeldBtnTextArea = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 35px 0 0 40px;
`;
const StyeldBtnTitleArea = styled.div`
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
  color: ${colors.main_black};
`;
const StyledMainBtnSub = styled.p`
  ${fonts.SubTextThinSmall}
  margin: 0;
  color: ${colors.main_black};
`;

const StyledMainCommunityArea = styled.div`
  height: 300px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  transition: 0.3s;

  :hover {
    transform: scale(1.007);
    transition: 0.3s;
  }
`;
