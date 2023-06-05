import React from 'react'
import {
  Typography,
  Grid,
  Container,
  Box,
  Divider,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';

//각 페이지컴포넌트 호출



const UserInfo = ()=>{
  return (
    <StyledDiv>
       <StyledTitle container xs={12}>
            <Grid item xs={11}><Typography> 면접왕 준영님, 어서오세요. </Typography></Grid>
            <Grid item><IconButton><SettingsIcon/></IconButton></Grid>
        </StyledTitle>
      <StyledLine></StyledLine>
      <StyledInfo container>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1}>아이디</Grid>
            <Grid item>dasdsㅁㄴㅇㅁㄴ</Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1}>비밀번호</Grid>
            <Grid item>dasdsㅁㄴㅇㅁㄴ</Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1}>연락처</Grid>
            <Grid item>dasdsㅁㄴㅇㅁㄴ</Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={1}>자기소개서</Grid>
            <Grid item>dasdsㅁㄴㅇㅁㄴ</Grid>
          </Grid>
        </Grid>
      </StyledInfo>
    </StyledDiv>
  )
}

export default UserInfo

const StyledDiv = styled(Box)`
  width: 1270px;
  border: 1px solid #00057D;
  border-radius: 7px;
  `
  const StyledTitle = styled(Grid)`
    padding: 24px;
    align-items: center
  `
  const StyledInfo = styled(Grid)`
    margin: 24px;
    font-size: 12pt;
  `
const StyledLine = styled(Divider)`
  border: 1px solid #00057D;
 `