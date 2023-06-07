import React from "react";
import { Button, Typography, TextField, Grid, Box } from "@mui/material";
import { styled } from "@mui/material";

//각 페이지컴포넌트 호출

const MenuButton = () => {
  return (
    <>
      <Grid item>
        <StyledDeleteButton variant="contained" sx={{ gap: "5px" }}>
          회원탈퇴
        </StyledDeleteButton>
      </Grid>
      <Grid item>
        <StyledModifyButton variant="contained">수정하기</StyledModifyButton>
      </Grid>
    </>
  );
};

const Modify = () => {
  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid item>
          <StyledTitle variant="h5">내 정보수정</StyledTitle>
        </Grid>
        <Grid item>
          <StyledSubTitle variant="subtitle1">
            나의 회원정보를 수정합니다.
          </StyledSubTitle>
        </Grid>
      </Grid>
      {/**  페이지내용 */}
      <form>
        <Grid
          container
          rowSpacing={2}
          alignItems="center"
          sx={{ marginTop: "7px" }}
        >
          <Grid item xs={2}>
            <StyledInfoName>이름</StyledInfoName>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField
              variant="outlined"
              label="Read Only"
              defaultValue="Hello World"
              InputProps={{
                readOnly: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <StyledInfoName>연락처</StyledInfoName>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={2}>
            <StyledInfoName>아이디</StyledInfoName>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={2}>
            <StyledInfoName>비밀번호</StyledInfoName>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={2}>
            <StyledInfoName>비밀번호확인</StyledInfoName>
          </Grid>
          <Grid item xs={10}>
            <StyledTextField variant="outlined" fullWidth />
          </Grid>

          <Grid item xs={2}>
            <StyledInfoName>자기소개서첨부</StyledInfoName>
          </Grid>
          <Grid item xs={8.5}>
            <StyledTextField variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={1.5} container justifyContent="flex-end">
            <StyledFindButton variant="contained">수정하기</StyledFindButton>
          </Grid>

          {/* 버튼1, 버튼2 */}
          <Grid
            container
            spacing={1}
            sx={{ marginTop: "7px" }}
            justifyContent="flex-end"
          >
            <MenuButton />
          </Grid>
        </Grid>
      </form>
    </StyledContainer>
  );
};
export default Modify;

const StyledContainer = styled(Box)`
  width: 66.1%;
  max-width: 1270px;
  margin-left: 325px;
  padding-left: 0;
`;
// 내정보수정 타이틀 스타일
const StyledTitle = styled(Typography)``;
// 내정보를 수정하세요 서브타이틀 스타일
const StyledSubTitle = styled(Typography)`
  color: #8689a3;
`;
//각정보타이틀 스타일지정
const StyledInfoName = styled(Typography)`
  color: #0e0e0e;
  font-size: 20px;
  font-weight: 600;
`;
//텍스트필드 스타일지정
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    height: "45px",
    borderRadius: "10px",
    border: "1px #00057D solid",
  },
}));

//버튼 스타일
const StyledFindButton = styled(Button)`
  /* 여기에 스타일을 작성하세요 */
  font-size: 18px;
  border-radius: 10px;
  font-weight: 700;
  padding: auto;
  background-color: #2e3057;
  color: #f1f4ff;
  &:hover {
    background-color: #f1f4ff;
    color: #2e3057;
  }
`;
const StyledModifyButton = styled(Button)`
  /* 여기에 스타일을 작성하세요 */
  font-size: 18px;
  border-radius: 10px;
  font-weight: 700;
  padding: auto;
  background-color: #00e595;
  color: #00057d;
  &:hover {
    background-color: #00057d;
    color: #00e595;
  }
`;
const StyledDeleteButton = styled(Button)`
  /* 여기에 스타일을 작성하세요 */
  font-size: 18px;
  border-radius: 10px;
  font-weight: 700;
  padding: auto;
  background-color: #ff4f4f;
  color: #f1f4ff;
  &:hover {
    background-color: #f1f4ff;
    color: #ff4f4f;
  }
`;
