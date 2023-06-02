import React from 'react'
import {
  Grid
} from '@mui/material';
import MenuButton from './components/MenuButton'
const Info = ()=>{
  return (
    <p>솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라
      솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라
      솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라
      솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라
      솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라
      솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라솰라

    </p>
  )
}

const Mypage = () => {
  return (
    <div>
      <h2> 마이페이지 </h2>
      <p>나의 정보를 확인하세요</p>
      <Grid container>
        <Grid item xs = {12} sm={4}>
          <MenuButton />
        </Grid>
        <Grid item xs ={12} sm={12}>
          <Info/>
        </Grid>
      </Grid>
      
    </div>
  );
};
export default Mypage;
