import React from "react";
import Menu from "../components/Menu";
import ProfileHeader from "../components/profileHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { get_logged_user } from "../service/admin";

const MenuLayout = () => {
  return (
    <div className="w-screen font-poppins">
      <div className="flex ">
        <div className="w-[17%]">
          <Menu />
        </div>

        <div className="flex flex-col  w-[83%]">
          <ProfileHeader />
          <main className=" mx-10 ">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default MenuLayout;
