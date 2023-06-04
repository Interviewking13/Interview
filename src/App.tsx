import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import HomePage from "./pages/home/Homepage";
import Mypage from "./pages/mypage/Mypage";
import Layout from "./components/layout/Layout";
import Information from "./pages/study/Information";
import { Feedback } from "./pages/study/Feedback";

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <Router>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/mypage" element={<Mypage />} />
              <Route path="/study/info" element={<Information />} />
              <Route path="/study/feedback" element={<Feedback />} />
            </Routes>
          </Layout>
        </QueryClientProvider>
      </Router>
    </RecoilRoot>
  );
}

export default App;
