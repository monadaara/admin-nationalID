import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import MenuLayout from "./layout/menuLayout";
import Home from "./pages/Home";
import CenterPage from "./pages/Center";
import DevicePage from "./pages/Device";
import ApplicantPage from "./pages/Applicant";
import ProcessPage from "./pages/Process";
import UsersPage from "./pages/Users";
import UnapprovedPage from "./pages/UnapprovedIDs";
import ApprovedPage from "./pages/ApprovedIDs";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<MenuLayout />}>
          <Route index element={<Home />} />
          <Route path="/centers" element={<CenterPage />} />
          <Route path="/devices" element={<DevicePage />} />
          <Route path="/applicants" element={<ApplicantPage />} />
          <Route path="/processing" element={<ProcessPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/unapproved_ids" element={<UnapprovedPage />} />
          <Route path="/approved_ids" element={<ApprovedPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
