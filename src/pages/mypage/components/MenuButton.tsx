import * as React from 'react';
import {
  Button,
  Box,
  Grid
} from '@mui/material';
import {Person, Edit,Checklist } from '@mui/icons-material';

import { styled } from '@mui/material/styles';



const MenuButton = ({}) =>{
  return (
    <Grid container spacing={1}>
      <Grid item xs= {4} sm={4}>
      <Button variant="text"><Edit/> 나의 스터디</Button>
      </Grid >
      <Grid item xs= {4} sm={4}> 
        <Button variant="text"><Checklist/> 스터디 신청</Button>
        </Grid>
      <Grid item xs= {4} sm={4}>
        <Button variant="text"><Person/> 내 정보</Button>
      </Grid>
    
   
    
  </Grid>
  )
}

export default MenuButton