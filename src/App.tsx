import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import HomePage from "./pages/home/Homepage";
import Mypage from "./pages/mypage/Mypage";
import StudyList from "./pages/studylist/StudyList";
import CreateStudy from "./pages/studylist/CreateStudy";
// import Layout from "./components/layout/Layout";
import LoginPage from "./pages/login/Login";
import SignupPage from "./pages/login/SignupPage";
import StudyApply from "./components/mypage/StudyApply";
import UserInfo from "./components/mypage/UserInfo";
import UserStudy from "./components/mypage/UserStudy";
import Modify from "./components/mypage/Modify";
import { Feedback } from "./pages/study/Feedback";
import Information from "./pages/study/Information";
import CommunityCreatePage from "./pages/community/CommunityCreatePage";
import CommunityPage from "./pages/community/CommunityPage";
import { CommunityDetailPage } from "./pages/community/ComunityDetailPage";
import StudyManage from "./pages/study/StudyManage";
import CommunityEditPage from "./pages/community/CommunityEditPage";
import { Helmet } from "react-helmet";
import SuspenseWrapper from "./components/common/SuspenseWrapper";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <Router>
        <QueryClientProvider client={queryClient}>
          {/* <Layout> */}
          <SuspenseWrapper>
            {" "}
            {/* SuspenseWrapper로 감싸기 */}
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Helmet>
                      <title>면접왕</title>
                    </Helmet>
                    <HomePage />
                  </>
                }
              />
              <Route
                path="/mypage"
                element={
                  <>
                    <Helmet>
                      <title>마이페이지</title>
                    </Helmet>
                    <Mypage />
                  </>
                }
              >
                <Route
                  path=""
                  element={
                    <>
                      <Helmet>
                        <title>나의 스터디</title>
                      </Helmet>
                      <UserStudy />
                    </>
                  }
                />
                <Route
                  path="studyapply"
                  element={
                    <>
                      <Helmet>
                        <title>스터디 신청</title>
                      </Helmet>
                      <StudyApply />
                    </>
                  }
                />
                <Route
                  path="userinfo"
                  element={
                    <>
                      <Helmet>
                        <title>내 정보</title>
                      </Helmet>
                      <UserInfo />
                    </>
                  }
                />
              </Route>
              <Route path="/mypage/userinfo/modify" element={<Modify />} />
              <Route
                path="/login"
                element={
                  <>
                    <Helmet>
                      <title>로그인</title>
                    </Helmet>
                    <LoginPage />
                  </>
                }
              />
              <Route
                path="/login/signup"
                element={
                  <>
                    <Helmet>
                      <title>회원가입</title>
                    </Helmet>
                    <SignupPage />
                  </>
                }
              />
              <Route
                path="/study"
                element={
                  <>
                    <Helmet>
                      <title>스터디 찾기</title>
                    </Helmet>
                    <StudyList />
                  </>
                }
              />
              <Route
                path="/study/feedback/:id"
                element={
                  <>
                    <Helmet>
                      <title>스터디 피드백</title>
                    </Helmet>
                    <Feedback />
                  </>
                }
              />
              <Route
                path="/study/:id"
                element={
                  <>
                    <Helmet>
                      <title>스터디 정보</title>
                    </Helmet>
                    <Information />
                  </>
                }
              />
              <Route
                path="/study/create"
                element={
                  <>
                    <Helmet>
                      <title>스터디 개설하기</title>
                    </Helmet>
                    <CreateStudy />
                  </>
                }
              />
              <Route
                path="/management/:studyId"
                element={
                  <>
                    <Helmet>
                      <title>스터디 관리</title>
                    </Helmet>
                    <StudyManage />
                  </>
                }
              />
              <Route
                path="/Community/CommunityPage"
                element={
                  <>
                    <Helmet>
                      <title>커뮤니티</title>
                    </Helmet>
                    <CommunityPage tap={1} />
                  </>
                }
              />
              <Route
                path="/Community/CommunityCreatePage"
                element={
                  <>
                    <Helmet>
                      <title>커뮤니티 글 쓰기</title>
                    </Helmet>
                    <CommunityCreatePage />
                  </>
                }
              />
              <Route
                path="/Community/CommunityEditPage/:community_id"
                element={
                  <>
                    <Helmet>
                      <title>커뮤니티 글 수정</title>
                    </Helmet>
                    <CommunityEditPage />
                  </>
                }
              />
              <Route
                path="/Community/CommunityDetailPage/:community_id"
                element={
                  <>
                    <Helmet>
                      <title>커뮤니티 상세페이지</title>
                    </Helmet>
                    <CommunityDetailPage />
                  </>
                }
              />
            </Routes>
          </SuspenseWrapper>
          {/* </Layout> */}
        </QueryClientProvider>
      </Router>
    </RecoilRoot>
  );
}

export default App;
