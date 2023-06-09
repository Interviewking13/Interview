import { ReactNode } from "react";
import { Button, Grid } from "@mui/material";
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
//프롭스타입지정
type props = {
  children: ReactNode;
  onClick: () => void;
};
//MenuTapBtn 함수
const MenuTapBtn = ({ children, onClick }: props) => {
  const clickHandler = (): void => {
    onClick();
  };
  return (
    <Grid item>
      <StyledButtonMui sx={{ gap: "5px" }} onClick={clickHandler}>
        {children}
      </StyledButtonMui>
    </Grid>
  );
};

export default MenuTapBtn;

//버튼 스타일
const StyledButtonMui = styled(Button)`
  && {
    padding-left: 0;
    ${fonts.SubTextBig}
    color: ${colors.gray_mint}; /* 적절한 색상으로 변경 */
    &:hover {
      color: ${colors.main_mint}; /* 호버 시 변경할 색상 */
    }
    &:active {
      background-color: #0000ff; /* 선택 시 변경할 색상 */
    }
  }
`;
{
  /* <MenuTapBtn OnClick={}
>얄리얄리얄라셩 얄라리 얄라<MenuTapBtn/> */
}
// //사용형태
// *layout이 MUI Grid 로 짜여져있습니다.

// *<Grid container spacing={1} justifyContent="flex-start"> 이걸로 감싸주셔야합니다.

// <MenuTapBtn onClick={useNavigator를 이용한 경로 클릭 이벤트}>
//  <아이콘/>
//  버튼 내용
// </MenuTapBtn>

// </Grid>
