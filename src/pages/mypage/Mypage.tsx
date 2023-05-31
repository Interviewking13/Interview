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
      <p> 마이페이지 </p>
      <Grid container>
        <Grid item xs = {2}>
          <MenuButton />
        </Grid>
        <Grid item xs ={9}>
          <Info/>
        </Grid>
        <Grid item xs ={1}>
        </Grid>
      </Grid>
      
    </div>
  );
};
export default Mypage;
