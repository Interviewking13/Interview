import React, { useState, ChangeEvent } from "react";
import { getUserData, putUserData } from "../../api/api-user";
import { Button, Typography, TextField } from "@mui/material";
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import axios from "axios";

const Modify = () => {
  const userId = window.localStorage.getItem("token");
  console.log(userId);

  axios
    .get(
      `https://port-0-interviewking13-7xwyjq992llj5sps0m.sel4.cloudtype.app/api/user/userInfo/:${userId}`
    )
    .then((res) => {
      const userInfo = res;
      console.log(userInfo);
    });
  const [userInfoValue, setUserInfoValue] = useState({});

  return (
    <StyledContainer>
      {/* 타이틀 */}
      <StyledLowContent>
        <StyledTitle>내 정보 수정</StyledTitle>
        <StyledSubTitle variant="subtitle1">
          나의 회원 정보를 수정합니다.
        </StyledSubTitle>
      </StyledLowContent>
      {/* 회원정보 입력 */}
      <form>
        <StyledLowContent>
          <StyledInfoName>이름</StyledInfoName>
          <StyledTextField
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </StyledLowContent>
        <StyledLowContent>
          <StyledInfoName>연락처</StyledInfoName>

          <StyledTextField
            variant="outlined"
            // defaultValue="01023445678"
            fullWidth
          />
        </StyledLowContent>
        <StyledLowContent>
          <StyledInfoName>아이디</StyledInfoName>

          <StyledTextField
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </StyledLowContent>
        <StyledLowContent>
          <StyledInfoName>비밀번호</StyledInfoName>
          <StyledTextField variant="outlined" type="password" fullWidth />
        </StyledLowContent>
        <StyledLowContent>
          <StyledInfoName>비밀번호확인</StyledInfoName>

          <StyledTextField variant="outlined" type="password" fullWidth />
        </StyledLowContent>

        {/* 파일첨부 부분 */}
        <StyledLowContent>
          <StyledInfoName>자기소개서첨부</StyledInfoName>

          <StyledFileFindTextField
            variant="outlined"
            placeholder="파일을 선택하세요"
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
          <label htmlFor="input-file">
            <input type="file" id="input-file" style={{ display: "none" }} />
            <StyledFindButton variant="contained">파일찾기</StyledFindButton>
          </label>
        </StyledLowContent>

        {/* 회원탈퇴, 수정 버튼 */}
        <StyledLowContent>
          <StyledDeleteButton variant="contained" sx={{ gap: "5px" }}>
            회원탈퇴
          </StyledDeleteButton>
          <StyledModifyButton variant="contained" type="submit">
            수정하기
          </StyledModifyButton>
        </StyledLowContent>
      </form>
    </StyledContainer>
  );
};
export default Modify;

/** 페이지 전체 감싸는 div*/
const StyledContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
/** 각 요소 가로배열 */
const StyledLowContent = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: low;
  align-items: center;
  width: 1269px;
`;
/** title :내 정보수정*/
const StyledTitle = styled(Typography)`
  && {
    ${fonts.TitleText};
    color: ${colors.main_mint};
    padding: 0;
  }
`;
/** subTitle: 나의 회원정보수정 */
const StyledSubTitle = styled(Typography)`
  && {
    ${fonts.SubTextThin}
    color: ${colors.darkgray_navy};
    padding: 0;
    margin-left: 30px;
    line-height: 50px;
  }
`;
/** 각 요소 텍스트*/
const StyledInfoName = styled.div`
  && {
    ${fonts.SubTextBig}
    color:${colors.main_black};
    width: 160px;
  }
`;
/** MUI input 입력란 스타일*/
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "45px",
    borderRadius: "10px",
    border: "1px #00057D solid",
    width: "1100px",
  },
}));
/** MUI input 파일찾기  */
const StyledFileFindTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "45px",
    borderRadius: "10px",
    border: "1px #00057D solid",
    width: "960px",
  },
}));

/** 수정하기버튼 스타일 */
const StyledModifyButton = styled(Button)`
  && {
    border-radius: 10px;
    width: 132px;
    height: 45px;
    ${fonts.SubText}
    padding: auto;
    background-color: ${colors.main_mint};
    color: ${colors.main_navy};
    &:hover {
      background-color: ${colors.main_navy};
      color: ${colors.main_mint};
    }
  }
`;
/** 회원탈퇴 버튼 스타일 */
const StyledDeleteButton = styled(Button)`
  && {
    border-radius: 10px;
    width: 132px;
    height: 45px;
    ${fonts.SubText}
    padding: auto;
    background-color: ${colors.main_red};
    color: ${colors.back_navy};
    &:hover {
      background-color: ${colors.back_navy};
      color: ${colors.main_red};
    }
  }
`;
/** 파일찾기버튼 스타일 */
const StyledFindButton = styled(Button)`
  && {
    border-radius: 10px;
    width: 132px;
    height: 45px;
    padding: auto;
    ${fonts.SubText}
    background-color: ${colors.dark_navy};
    color: ${colors.back_navy};
    &:hover {
      background-color: ${colors.back_navy};
      color: ${colors.dark_navy};
    }
  }
`;
/**업로드된 파일 삭제 텍스트버튼  */
const StyledFileDeleteButton = styled(Button)`
  && {
    color: ${colors.main_red};
    ${fonts.SubTextThinSmall}
    cursor: pointer;
  }
`;
/**업로드된 파일 다운로드 텍스트버튼 */
const StyledFileDownButton = styled(Button)`
  && {
    color: ${colors.darkgray_navy};
    ${fonts.SubTextSmall}
    cursor: pointer;
  }
`;
