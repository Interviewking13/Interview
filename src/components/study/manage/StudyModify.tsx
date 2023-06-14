import { HTMLAttributes } from "react";
import styled from "styled-components";
import { colors } from "../../../constants/colors";
import * as fonts from "../../../constants/fonts";
import { Link } from "react-router-dom";
interface StyledCommonButtonProps extends HTMLAttributes<HTMLDivElement> {
  backgroundColor?: string;
}
const StudyModify = () => {
  return (
    <>
      <StyledStudyCreateArea>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>스터디 이름</StyledStudyCreateText>
          <StyledStudyInput
            type="text"
            placeholder="스터디 이름을 입력하세요."
          />
        </StyledStudyCreateInputArea>
        <StyledStudyCreateInputAreaBig>
          <StyledStudyCreateText>스터디 소개</StyledStudyCreateText>
          <StyledStudyInputBig placeholder="스터디 설명을 입력하세요." />
        </StyledStudyCreateInputAreaBig>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>회의 링크</StyledStudyCreateText>
          <StyledStudyInput
            type="url"
            placeholder="화상 회의 주소를 입력하세요."
          />
        </StyledStudyCreateInputArea>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>진행 기간</StyledStudyCreateText>
          <StyledDateArea>
            <StyledStudyDate type="date" />
            <StyledStudyDateText>~</StyledStudyDateText>
            <StyledStudyDate type="date" />
          </StyledDateArea>
        </StyledStudyCreateInputArea>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>모집 마감일</StyledStudyCreateText>
          <StyledStudyDate type="date" />
        </StyledStudyCreateInputArea>
        <StyledStudyCreateInputArea>
          <StyledStudyCreateText>모집 인원</StyledStudyCreateText>
          <StyledStudyInputNumber
            type="number"
            min="1"
            placeholder="모집 인원을 입력하세요."
          />
        </StyledStudyCreateInputArea>
        <StyledStudyCreateBtnArea>
          <StyledLink to={`/study/delete`}>
            <SubButtonContainer>
              <StyledCommonButton backgroundColor={colors.main_red}>
                <StyledButtonTextDelete>스터디 삭제</StyledButtonTextDelete>
              </StyledCommonButton>
            </SubButtonContainer>
          </StyledLink>
          <StyledLink to={`/study/modify`}>
            <SubButtonContainer>
              <StyledCommonButton backgroundColor={colors.main_mint}>
                <StyledButtonTextDelete>수정하기</StyledButtonTextDelete>
              </StyledCommonButton>
            </SubButtonContainer>
          </StyledLink>
        </StyledStudyCreateBtnArea>
      </StyledStudyCreateArea>
    </>
  );
};

export default StudyModify;

const StyledStudyCreateArea = styled.div`
  height: 760px;
  margin: 20px 0 20px 0;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
`;
const StyledStudyCreateInputArea = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
`;
const StyledStudyCreateInputAreaBig = styled.div`
  height: 400px;
  display: flex;
`;
const StyledStudyCreateText = styled.p`
  width: 163px;
  margin: 0;
  font-family: ${fonts.SubText};
  padding: 10px 0;
  color: ${colors.main_gray};
`;

const StyledStudyInput = styled.input`
  width: 1080px;
  height: 45px;
  border: solid 1px ${colors.main_navy};
  border-radius: 10px;
  margin: 0;
  padding-left: 20px;
  font-family: ${fonts.SubTextThinSmall};
`;
const StyledStudyInputNumber = styled.input`
  width: 447px;
  height: 45px;
  border: solid 1px ${colors.main_navy};
  border-radius: 10px;
  margin: 0;
  padding: 0 20px 0 20px;
  font-family: sans-serif;
  font-size: 16px;
`;
const StyledDateArea = styled.div`
  width: 1103px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledStudyDateText = styled.p`
  margin: 0;
  font-family: ${fonts.SubText};
  color: ${colors.main_gray};
`;
const StyledStudyDate = styled.input`
  width: 447px;
  height: 45px;
  border: solid 1px ${colors.main_navy};
  border-radius: 10px;
  margin: 0;
  padding: 0 20px 0 20px;
  font-family: sans-serif;
  font-size: 16px;
`;
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
`;

const StyledStudyCreateBtnArea = styled.div`
  width: 1270px;
  display: flex;
  flex-direction: row-reverse;
  gap: 20px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${colors.main_black};
  display: flex;
  align-items: center;
`;

const StyledCommonButton = styled.div<StyledCommonButtonProps>`
  cursor: pointer;
  width: 132px;
  height: 45px;
  background-color: ${(props) =>
    props.backgroundColor}; /* props로 전달받은 배경색을 사용 */
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

const StyledButtonTextDelete = styled.p`
  font-family: ${fonts.SubTextBig};
  color: ${colors.back_navy};
`;

const SubButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
