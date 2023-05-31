import * as React from 'react';
import {
  Button,
  Box,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';


const DeleteButton = styled(Button)({
  color:'#d50000'
})

const MenuButton = ({}) =>{
  return (
    <Grid container>
      <Grid item xs= {12}>
      <Button variant="text">나의 스터디</Button>
      </Grid >
      <Grid item xs= {12}> 
        <Button variant="text">개인정보수정</Button>
        </Grid>
      <Grid item xs= {12}>
        <DeleteButton variant="text">회원탈퇴</DeleteButton>
      </Grid>
    
   
    
  </Grid>
  )
}

export default MenuButton