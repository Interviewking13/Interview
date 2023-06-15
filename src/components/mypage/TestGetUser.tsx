import { useQuery } from "react-query";
import { getUserData } from "../../api/api-user";
import styled from "styled-components";

const TestGetUser = () => {
  const token = localStorage.getItem("token") || "";

  const { data: userData } = useQuery(["getUserData", token], () => getUserData(token), {
    enabled: !!token,
  });

  // userData가 null인 경우에 대한 처리
  if (!userData) {
    return <StyledBox>
      <p>userData가 null입니다.</p>
    </StyledBox>;
  }

  console.log("사용자 이름:", userData.user_name);
  console.log("이메일:", userData.email);
  console.log("전화번호:", userData.phone_number);

  return (
    <StyledBox>
      {userData.user_name}
      {userData.email}
      {userData.phone_number}
      <p>사용자 정보를 가지고 오고싶어요!</p>
    </StyledBox>
  );
};


export default TestGetUser;

const StyledBox = styled.div`
  width: 1270px;
  height: 240px;
  margin: 0 auto;
  border: 1px solid #ddd;
  background-color: #ddd;

  p {
    text-align: center;
    line-height: 200px;
  }
`;