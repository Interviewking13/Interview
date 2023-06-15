import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import { colors } from "../../../constants/colors";
import { SubTextBig } from "../../../constants/fonts";

export const CommunityTaps = () => {
  const location = useLocation();
  const path = location.pathname;
  const lastPathSegment = path.substring(path.lastIndexOf("/") + 1);
  const [activeTab, setActiveTab] = useState(`${lastPathSegment}`);
  const navigate = useNavigate();

  const onClickTap = (value: string) => {
    navigate(`/community/${value}`);
  };

  return (
    <StyledCommunityTabs>
      <StyledCommunityTab>
        <span style={{ fontSize: "16px" }}>
          <CreateIcon />
        </span>
        전체 글
      </StyledCommunityTab>
      <StyledCommunityTab>
        <span style={{ fontSize: "16px" }}>
          <CreateIcon />
        </span>
        내가 쓴 글
      </StyledCommunityTab>
    </StyledCommunityTabs>
  );
};

const StyledCommunityTabs = styled.div`
  margin: 20px 0;
  display: flex;
`;

const StyledCommunityTab = styled.button`
  cursor: pointer;
  display: flex;
  ${SubTextBig};
  border: none;
  background: none;
  &:not(:first-child) {
    margin-left: 20px;
  }
  color: ${colors.gray_mint};
  &:hover {
    color: ${colors.main_mint}; /* 호버 시 변경할 색상 */
  }
  &.active {
    color: ${colors.main_mint};
  }
  align-items: center; /* 아이콘과 글자 수직 정렬 */
  span {
    margin-right: 10px; /* 아이콘과 글자 사이 간격 조정 */
  }
`;

export default CommunityTaps;
