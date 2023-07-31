import styled from "styled-components";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { SubTextSmall } from "../../../constants/fonts";
type DetailTitleProps = {
  name: string;
  content: any;
};

type DetailButtonProps = DetailTitleProps & {
  onClick?: () => void;
};

export const DetailTitle = (props: DetailTitleProps) => {
  return (
    <SubContainer>
      <SubContentTitle>
        <Peopleicon />
        {props.name}
      </SubContentTitle>
      <SubContentContent>{props.content}</SubContentContent>
    </SubContainer>
  );
};
export const DetailButton = (props: DetailButtonProps) => {
  const { name, content, onClick } = props;
  return (
    <SubContainer>
      <SubContentTitle>
        <Peopleicon />
        {props.name}
      </SubContentTitle>
      <SubContentContentButton onClick={onClick}>
        {content}
      </SubContentContentButton>
    </SubContainer>
  );
};

const SubContentContent = styled.span`
  margin-top: 10px;
  ${SubTextSmall};
  @media screen and (max-width: 360px) {
    font-size: 12px;
  }
`;
const SubContentTitle = styled.span`
  ${SubTextSmall};
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-right: 50px;
  width: 100px;
  color: #8689a3;
  align-items: center;
  justify-content: flex-start;
  &:not(:first-child) {
    margin-left: 30px;
  }

  @media screen and (max-width: 360px) {
    font-size: 12px;
    margin-right: 10px;
  }
`;
const SubContainer = styled.div`
  display: flex;
`;

const SubContentContentButton = styled.div`
  margin-top: 10px;
  ${SubTextSmall};
  cursor: pointer;
  &.cursor-style {
    cursor: pointer;
  }
  @media screen and (max-width: 360px) {
    font-size: 12px;
  }
`;
const Peopleicon = styled(PeopleAltIcon)`
  font-size: 10px;
`;
