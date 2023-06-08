import { ReactNode } from "react";
import { Button, Grid } from "@mui/material";
import { Create, Person, Checklist } from "@mui/icons-material"; //MUI icon import
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";

type props = {
  children: ReactNode;
  className?: string;
  onClick: () => void;
};

const MenuTapBtn = () => {
  //페이지 이동
  const navigate = useNavigate();
  const onClickUserStudy = () => {
    navigate("/mypage/userstudy");
  };

  return (
    <Grid container spacing={1} justifyContent="flex-start">
      <Grid item>
        <StyledButton sx={{ gap: "5px" }} onClick={onClickUserStudy}>
          <Create />
          나의 스터디
        </StyledButton>
      </Grid>
    </Grid>
  );
};
export default MenuTapBtn;
const StyledButton = styled(Button)`
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
