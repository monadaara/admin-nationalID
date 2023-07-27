import React from "react";
import { BiSolidUser } from "react-icons/bi";
import { useQuery } from "react-query";
import { get_me } from "../service/admin";

const ProfileHeader = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: get_me,
  });
  console.log("daaaaaata", data);
  return (
    <div className=" h-16 bg-slate-300 w-full flex  items-center">
      <div className="w-full">
        <div className="flex items-center justify-end mr-36">
          <button className="bg-slate-600 px-3 py-3 rounded-md text-center">
            <BiSolidUser />
          </button>
          <p className="font-medium ml-3 text-green-600">
            hello <span className="text-black font-normal">{data?.first_name}</span> 👋🏿
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
