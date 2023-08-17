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
import { get_logged_user, get_me } from "./service/admin";
import Review from "./pages/Review";
import LostID from "./pages/LostID";
import CenterReportPage from "./pages/CenterReport";
import CenterAppointmentReportPage from "./pages/CenterByappointmentsReport";
import SuspectedPage from "./pages/Suspected";
import RenewID from "./pages/Renew";
import ModifyID from "./pages/Modify";
import { useQuery } from "react-query";

const App = () => {
  const navigate = useNavigate();
  const user = get_logged_user();

  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: get_me,
  });
  useEffect(() => {
    if (user?.access == null) {
      navigate("/login");
      console.log("user", user);
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="" element={<MenuLayout user={data} />}>
          <Route index element={<Dashboard />} />
          <Route path="/centers" element={<CenterPage />} />
          <Route path="/devices" element={<DevicePage />} />
          <Route path="/applicants" element={<ApplicantPage />} />
          <Route path="/processing" element={<ProcessPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/unapproved_ids" element={<UnapprovedPage />} />
          <Route path="/approved_ids" element={<ApprovedPage />} />
          <Route path="/unapproved_ids/:id" element={<Review />} />
          <Route path="/suspected" element={<SuspectedPage user={data} />} />
          <Route path="/suspected/:id" element={<Review />} />
          <Route path="/lost_id" element={<LostID />} />
          <Route path="/renew_id" element={<RenewID />} />
          <Route path="/remodify_id" element={<ModifyID />} />

          {/* reports */}

          <Route path="/center_by_users" element={<CenterReportPage />} />
          <Route
            path="/center_by_appointements"
            element={<CenterAppointmentReportPage />}
          />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
