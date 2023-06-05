import styled from "@emotion/styled";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
export const DetailTitle = (props: any) => {
  return (
    <SubContainer>
      <SubContentTitle>
        <PeopleAltIcon />
        {props.name}
      </SubContentTitle>
      <SubContentContent>{props.content}</SubContentContent>
    </SubContainer>
  );
};

const SubContentContent = styled.span`
  margin-top: 10px;
`;
const SubContentTitle = styled.span`
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
`;
const SubContainer = styled.div`
  display: flex;
`;
