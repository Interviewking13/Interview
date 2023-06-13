import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import HomePage from "./pages/home/Homepage";
import Mypage from "./pages/mypage/Mypage";
import StudyList from "./pages/studylist/StudyList";
import CreateStudy from "./pages/studylist/CreateStudy";
import Layout from "./components/layout/Layout";
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
import StudyMagement from "./pages/study/Information";
import StudyModify from "./components/study/manage/StudyModify";
import StudyMemberManagement from "./components/study/manage/StudyMemberManagement";
import StudyApplicantList from "./components/study/manage/StudyApplicantList";
import StudyManage from "./pages/study/StudyManage";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/mypage" element={<Mypage />}>
                <Route path="userstudy" element={<UserStudy />} />
                <Route path="studyapply" element={<StudyApply />} />
                <Route path="userinfo" element={<UserInfo />} />
              </Route>
              <Route path="/mypage/userinfo/modify" element={<Modify />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/login/signup" element={<SignupPage />} />
              <Route path="/study" element={<StudyList />} />
              <Route path="/study/feedback" element={<Feedback />} />
              <Route path="/study/:id" element={<Information />} />
              <Route path="/study/create" element={<CreateStudy />} />
              <Route path="/management" element={<StudyManage />} />
              <Route
                path="/Community/CommunityPage"
                element={<CommunityPage />}
              />
              <Route
                path="/Community/CommunityCreatePage"
                element={<CommunityCreatePage />}
              />
            </Routes>
          </Layout>
        </QueryClientProvider>
      </Router>
    </RecoilRoot>
  );
}

export default App;
