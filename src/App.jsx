import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import MenuLayout from "./layout/menuLayout";
import Home from "./pages/Home";
import CenterPage from "./pages/Center";
import DevicePage from "./pages/Device";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<MenuLayout />}>
          <Route index element={<Home />} />
          <Route path="/centers" element={<CenterPage />} />
          <Route path="/devices" element={<DevicePage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
};

export default App;
