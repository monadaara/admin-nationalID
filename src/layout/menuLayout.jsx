import React from "react";
import Menu from "../components/Menu";
import ProfileHeader from "../components/profileHeader";
import { Outlet } from "react-router-dom";

const MenuLayout = () => {
  return (
    <div className="w-screen ">
      <div className="flex ">
        <div className="w-[20%]">
          <Menu />
        </div>

        <div className="flex flex-col  w-[80%]">
          <ProfileHeader />
          <main className=" mx-14">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MenuLayout;
