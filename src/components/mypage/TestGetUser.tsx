import { useQuery } from "react-query";
import { getUserData } from "../../api/api-user";
import styled from "styled-components";

const TestGetUser = () => {

  const token = localStorage.getItem("token");
  const { data: userData } = useQuery(["userData"], () => getUserData(token as string));

  // token 값을 활용하여 필요한 작업을 수행
  // console.log("UserData", userData);
  // const { user_name, phone_number, email, password } = userData?.data || {};

  // userData가 null인 경우
  if (!userData) {
    return <div>userData is null</div>
  }

  console.log("사용자 이름:", userData.data.user_name);
  console.log("이메일:", userData.data.email);
  console.log("전화번호:", userData.data.user_id);
  console.log("전화번호:", userData.data.token);

  return (
    <StyledBox>
      <div>
        <ul>
          <li>{`사용자 이름: ${userData?.data.user_name}`}</li>
          <li>{`이메일: ${userData?.data.email}`}</li>
          <li>{`아이디: ${userData?.data.user_id}`}</li>
          <li>{`토큰: ${userData?.data.token}`}</li>
        </ul>
      </div>
    </StyledBox>
  );
};


export default TestGetUser;

const StyledBox = styled.div`
  width: 1270px;
  height: 300px;
  margin: 0 auto;
  border: 1px solid #ddd;
  background-color: #ddd;

  div {
    margin: 10px;
  }
`;