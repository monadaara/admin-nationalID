import React from "react";
import Menu from "../components/Menu";
import ProfileHeader from "../components/profileHeader";
import { Outlet } from "react-router-dom";

const MenuLayout = () => {
  return (
    <div className="flex">
      <Menu />
      <div className="flex flex-col w-screen">
        <ProfileHeader />
        <main className="flex-grow mx-14">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MenuLayout;
