import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  Grid,
  Container
} from '@mui/material'; //MUI 요소 import
import { Create,Person, Checklist } from '@mui/icons-material'; //MUI icon import
import { styled } from '@mui/material/styles';


const MenuButton = ({}) =>{
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1} justifyContent='flex-start'>
        <Grid item>
          <StyledButton component={<Mystudy/>} to="userstudy" variant="text" sx={{ gap: '5px' }}><Create/>나의 스터디</StyledButton>
        </Grid >
        <Grid item > 
          <StyledButton component={Link} to="/your-path" variant="text" sx={{ gap: '5px' }}><Checklist/>스터디 신청</StyledButton>
        </Grid>
        <Grid item >
          <StyledButton component={Link} to="/your-path" variant="text" sx={{ gap: '5px' }}><Person/>내 정보</StyledButton>
        </Grid>
      </Grid>
    </Container>
  
  )
}

const StyledButton = styled(Button)`
  /* 여기에 스타일을 작성하세요 */
  color: #9FEFD3; /* 적절한 색상으로 변경 */
  &:hover {
    color: #00E595; /* 호버 시 변경할 색상 */
  }
  &:active {
    background-color: #0000ff; /* 선택 시 변경할 색상 */
  }
`;

export default MenuButton