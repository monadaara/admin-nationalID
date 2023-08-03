import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import Dashboard from "./pages/Dashboard";
import { get_logged_user } from "./service/admin";
import Review from "./pages/Review";
import LostID from "./pages/LostID";
import CenterReportPage from "./pages/CenterReport";

const App = () => {
  const navigate = useNavigate();
  const user = get_logged_user();
  useEffect(() => {
    if (user?.access == null) {
      navigate("/login");
      console.log("user", user);
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="" element={<MenuLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/centers" element={<CenterPage />} />
          <Route path="/devices" element={<DevicePage />} />
          <Route path="/applicants" element={<ApplicantPage />} />
          <Route path="/processing" element={<ProcessPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/unapproved_ids" element={<UnapprovedPage />} />
          <Route path="/approved_ids" element={<ApprovedPage />} />
          <Route path="/unapproved_ids/:id" element={<Review />} />
          <Route path="/lost_id" element={<LostID />} />

          {/* reports */}

          <Route
            path="/center_by_user_appointement"
            element={<CenterReportPage />}
          />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
