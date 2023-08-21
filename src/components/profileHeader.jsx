import React from "react";
import { BiSolidUser } from "react-icons/bi";
import { useQuery } from "react-query";
import { clear_logged_user, get_me } from "../service/admin";
import { useNavigate } from "react-router-dom";

const ProfileHeader = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: get_me,
  });
  const navigate = useNavigate();

  const center = localStorage.getItem("center");

  return (
    <div className=" h-16 bg-slate-300 w-full flex  items-center">
      <div className="w-full flex justify-end  mr-10">
        <div className="flex items-center justify-end mr-36">
          <button className="bg-slate-600 px-3 py-3 rounded-md text-center">
            <BiSolidUser />
          </button>
          <p className="font-medium ml-3 text-green-600">
            hello{" "}
            <span className="text-black font-normal">{data?.first_name}</span>{" "}
            👋🏿
          </p>
        </div>
        <div>
          <button
            onClick={() => {
              clear_logged_user();
              navigate("/login");
            }}
            className="bg-red-400 px-5 py-2 rounded-md text-center"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
