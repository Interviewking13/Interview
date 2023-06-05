import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import HomePage from "./pages/home/Homepage";
import Mypage from "./pages/mypage/Mypage";
import StudyList from "./pages/studylist/StudyList";
import Layout from "./components/layout/Layout";
import TestPage from "./components/modal/TestPage";
import LoginPage from "./pages/login/Login";
import SignupPage from "./pages/login/SignupPage";
import StudyApply from "./pages/mypage/components/StudyApply";
import UserInfo from "./pages/mypage/components/UserInfo";
import UserStudy from "./pages/mypage/components/UserStudy";
import { Feedback } from "./pages/study/Feedback";
import Information from "./pages/study/Information";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/mypage/*" element={<Layout><Mypage /></Layout>}>
              <Route path="userstudy" element={<UserStudy />} />
              <Route path="studyapply" element={<StudyApply />} />
              <Route path="userinfo" element={<UserInfo />} />
            </Route>
            <Route path="/studylist" element={<Layout><StudyList /></Layout>} />
            <Route path="/feedback" element={<Layout><Feedback /></Layout>} />
            <Route path="/study/info" element={<Layout><Information /></Layout>} />
            {/* test 페이지 */}
            <Route path="/testpage" element={<TestPage />} />
            {/* 로그인 페이지와 회원가입 페이지는 레이아웃을 제외 */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/signup" element={<SignupPage />} />
          </Routes>
        </QueryClientProvider>
      </Router>
    </RecoilRoot>
  );
}

export default App;
