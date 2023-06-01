import React from 'react'
import {
  Typography,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';



//각 페이지컴포넌트 호출
import MenuButton from './components/MenuButton'
import MyInfo from './components/MyInfo'
import MyStudy from './components/MyStudy'
import StudyAP from './components/StudyApplyPage'

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
    <div style={{ maxWidth: '1270px', margin: 'auto' }}>
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
        <Info/>
      </Grid>
    </Grid>
    </div>
  );
};
export default Mypage;


const StyledTitle = styled(Typography )`
  /* 여기에 스타일을 작성하세요 */
  color: #00057D 
`;

const StyledSubTitle = styled(Typography )`
  /* 여기에 스타일을 작성하세요 */
  color: #8689A3 
`;