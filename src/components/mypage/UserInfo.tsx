import React, { useState, useEffect } from "react";

import {
  Typography,
  Grid,
  Box,
  Divider,
  IconButton,
  Icon,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import * as fonts from "../../constants/fonts";
import { colors } from "../../constants/colors";
import { useQuery } from "react-query";
import { getUserData } from "../../api/api-user";

type UserData = {
  email: string;
  user_name: string;
  phone_number: string;
  user_id: string;
  file_key: string;
  file_name: string;
};

const UserInfo = () => {
  const navigate = useNavigate();

  const onClickModify = () => {
    navigate("/mypage/userinfo/modify");
  };
  const [userDataValue, setUserDataValue] = useState<UserData>({
    email: "",
    user_name: "",
    phone_number: "",
    user_id: "",
    file_key: "",
    file_name: "",
  });

  const getData = async () => {
    try {
      const token = String(localStorage.getItem("token"));
      const data = await getUserData(token);
      console.log(data);
      setUserDataValue(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(userDataValue);
  console.log(userDataValue.user_name);

  return (
    <StyledDiv>
      <StyledLowContent>
        <StyledWelcome>
          면접왕 {userDataValue.user_name} 님, 어서오세요.
        </StyledWelcome>
        <StyledSettingBtn onClick={onClickModify}>
          <SettingsIcon />
        </StyledSettingBtn>
      </StyledLowContent>

      {/* 구분선 */}
      <StyledLine></StyledLine>
      {/* 회원정보부분 */}
      <StyledInfo>
        <StyledLowContent>
          <StyledInfoText>아이디</StyledInfoText>
          <StyledInfoValue>{userDataValue.email}</StyledInfoValue>
        </StyledLowContent>

        <StyledLowContent>
          <StyledInfoText>연락처</StyledInfoText>
          <StyledInfoValue> {userDataValue.phone_number} </StyledInfoValue>
        </StyledLowContent>

        <StyledLowContent>
          <StyledInfoText>자기소개서</StyledInfoText>
          <button>{userDataValue.file_name}</button>
        </StyledLowContent>
      </StyledInfo>
    </StyledDiv>
  );
};

export default UserInfo;
/** 배경 테두리 */
const StyledDiv = styled.div`
  border: 1px solid ${colors.main_navy};
  border-radius: 7px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
/** 인삿말 스타일:===님 환영합니다. */
const StyledWelcome = styled(Typography)`
  && {
    ${fonts.SubTextBig};
    color: ${colors.main_navy};
    margin: 20px;
    white-space: nowrap;
    width: 100%;
    @media screen and (max-width: 768px) {
      margin: 20px 0;
    }
  }
`;
const StyledSettingBtn = styled(IconButton)`
  && {
    margin-right: 20px;
    @media screen and (max-width: 768px) {
      margin-right: 10px;
    }
  }
`;

/** 구분선 */
const StyledLine = styled(Divider)`
  && {
    border: 1px solid ${colors.main_navy};
  }
`;
/** 테두리 내 여백 */
const StyledInfo = styled.div`
  margin: 10px 0 22px 22px;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 10px 0px;
  }
`;

/** 각 요소 가로배열 */
const StyledLowContent = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: low;
  align-items: center;
  width: 1269px;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 10px 10px;
  }
`;

/** 회원정보 요소 텍스트 스타일 */
const StyledInfoText = styled(Typography)`
  && {
    color: ${colors.darkgray_navy};
    ${fonts.SubTextThinSmall};
    width: 180px;
  }
`;
/** 회원정보 텍스트 스타일 */
const StyledInfoValue = styled(Typography)`
  && {
    color: ${colors.main_navy};
    ${fonts.SubTextSmall};
  }
`;
