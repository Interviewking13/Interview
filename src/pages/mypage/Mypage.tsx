import React from 'react'
import { Outlet,useNavigate  } from 'react-router-dom';
import {
  Button,
  Typography,
  Container,
  Grid,
  Box
} from '@mui/material';
import { styled } from '@mui/material';
import { Create,Person, Checklist } from '@mui/icons-material'; //MUI icon import




//각 페이지컴포넌트 호출
const MenuButton = () =>{
  const navigate = useNavigate();

  const onClickUserStudy = () => {
    navigate('/mypage/userstudy'); // useNavigate 사용하여 페이지 이동
  };
  const onClickStudyApply = () => {
    navigate('/mypage/studyapply'); // useNavigate 사용하여 페이지 이동
  };
  const onClickUserInfo= () => {
    navigate('/mypage/userInfo'); // useNavigate 사용하여 페이지 이동
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={1} justifyContent='flex-start'>
        <Grid item>
          <StyledButton sx={{ gap: '5px' }} onClick={onClickUserStudy} ><Create/>나의 스터디</StyledButton>
        </Grid >
        <Grid item > 
          <StyledButton sx={{ gap: '5px' }} onClick={onClickStudyApply} ><Checklist/>스터디 신청</StyledButton>
        </Grid>
        <Grid item >
          <StyledButton sx={{ gap: '5px' }} onClick={onClickUserInfo}><Person/>내 정보</StyledButton>
        </Grid>
      </Grid>
    </Container>
  
  )
}

const Mypage = () => {

  return (
    <StyledContainer>
     <Grid container spacing={1}>
      {/* 타이틀과 서브 타이틀 */}
      <Grid item xs={12}>
        <Grid container spacing ={1}>
          <Grid item>
            <StyledTitle variant="h5">마이페이지</StyledTitle>
          </Grid>
          <Grid item>
            <StyledSubTitle variant="subtitle1">나의 정보를 확인하세요</StyledSubTitle>
          </Grid>
        </Grid>
      </Grid>

      {/* 버튼1, 버튼2, 버튼3 */}
      <Grid item xs={12}>
          <MenuButton/>
      </Grid>

      {/* 페이지 내용 */}
      <Grid item xs={12}>
        <Outlet/>
      </Grid>
    </Grid>
    </StyledContainer>
  );
};
export default Mypage;

const StyledContainer = styled(Box)`
width: 66.1%;
max-width: 1270px;
margin-left: 325px;
padding-left: 0;
`


const StyledTitle = styled(Typography )`
  /* 여기에 스타일을 작성하세요 */
  color: #00057D 
`;

const StyledSubTitle = styled(Typography )`
  /* 여기에 스타일을 작성하세요 */
  color: #8689A3 
`;

//버튼 스타일
const StyledButton = styled(Button)`
  /* 여기에 스타일을 작성하세요 */
  padding-left: 0;
  color: #9FEFD3; /* 적절한 색상으로 변경 */
  &:hover {
    color: #00E595; /* 호버 시 변경할 색상 */
  }
  &:active {
    background-color: #0000ff; /* 선택 시 변경할 색상 */
  }
`;
