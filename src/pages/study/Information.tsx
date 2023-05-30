import styled from "@emotion/styled";
import { Button } from "@mui/material";

const Container = styled.div`
  margin: 30px 100px;
  display: flex;
  flex-direction: column;
`;

// const Mybutton = styled(Button)`
//   width: 200px;
//   background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
//   border: 0;
//   border-radius: 3px;
//   box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
//   color: white;
//   height: 48px;
//   padding: 0 20px;
// `;

const StydyTap = styled.div`
  margin-top: 10px;
  display: flex;
`;

const StydyTapText = styled.span`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  color: #00e595;
  &:not(:first-child) {
    margin-left: 30px;
  }
`;
const Title = styled.span`
  margin-top: 10px;
  color: #00057d;
  font-size: 48px;
  font-weight: 800;
`;
const Mystudy = styled.span`
  margin-top: 30px;
  color: #00057d;
  font-size: 32px;
  font-weight: 700;
`;
const SubTitle = styled.div`
  display: flex;
  flex-direction: column;
`;
const SubContainer = styled.div`
  display: flex;
`;

const SubContentTitle = styled.span`
  margin-top: 10px;
  margin-right: 50px;
  width: 100px;
`;
const SubContentContent = styled.span`
  margin-top: 10px;
`;
const Divider = styled.div`
  margin: 15px 0px;
  border-bottom: 1px solid #000;
`;

const StudyIntro = styled.span`
  margin: 10px 0px;
  color: #00057d;
  font-size: 20px;
  font-weight: 600;
`;
const Information = () => {
  return (
    <Container>
      <Mystudy>나의스터디</Mystudy>
      <StydyTap>
        <StydyTapText>스터디 정보</StydyTapText>
        <StydyTapText>피드백</StydyTapText>
      </StydyTap>
      <Title>SAFFY면접스터디 #개발자 #프론트엔드</Title>
      <SubTitle>
        <SubContainer>
          <SubContentTitle>회의링크</SubContentTitle>
          <SubContentContent>
            <a href="http://naver.com">화상채팅 바로가기</a>{" "}
          </SubContentContent>
        </SubContainer>
        <SubContainer>
          <SubContentTitle>진행 기간</SubContentTitle>
          <SubContentContent>23.06.01 ~ 23.08.01</SubContentContent>
        </SubContainer>
        <SubContainer>
          <SubContentTitle>인원</SubContentTitle>
          <SubContentContent>8/20 명</SubContentContent>
        </SubContainer>
        <SubContainer>
          <SubContentTitle>스터디장</SubContentTitle>
          <SubContentContent>이용섭</SubContentContent>
        </SubContainer>
      </SubTitle>
      <Divider></Divider>
      <StudyIntro>스터디 소개</StudyIntro>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae,
        voluptate! Sit doloremque modi asperiores aliquam nisi, reprehenderit
        dolorum porro unde facilis ullam, quod cum? Voluptatum et ratione
        repellendus doloremque perferendis. Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Recusandae, voluptate! Sit doloremque modi
        asperiores aliquam nisi, reprehenderit dolorum porro unde facilis ullam,
        quod cum? Voluptatum et ratione repellendus doloremque perferendis.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae,
        voluptate! Sit doloremque modi asperiores aliquam nisi, reprehenderit
        dolorum porro unde facilis ullam, quod cum? Voluptatum et ratione
        repellendus doloremque perferendis. Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Recusandae, voluptate! Sit doloremque modi
        asperiores aliquam nisi, reprehenderit dolorum porro unde facilis ullam,
        quod cum? Voluptatum et ratione repellendus doloremque perferendis.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae,
        voluptate! Sit doloremque modi asperiores aliquam nisi, reprehenderit
        dolorum porro unde facilis ullam, quod cum? Voluptatum et ratione
        repellendus doloremque perferendis. Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Recusandae, voluptate! Sit doloremque modi
        asperiores aliquam nisi, reprehenderit dolorum porro unde facilis ullam,
        quod cum? Voluptatum et ratione repellendus doloremque perferendis.
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae,
        voluptate! Sit doloremque modi asperiores aliquam nisi, reprehenderit
        dolorum porro unde facilis ullam, quod cum? Voluptatum et ratione
        repellendus doloremque perferendis.
      </p>
    </Container>
  );
};
export default Information;
