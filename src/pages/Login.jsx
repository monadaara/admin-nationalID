import React from "react";
import Login from "./../components/Login";
const LoginPage = () => {
  return (
    <div className="grid grid-cols-2">
      <div className=" bg-blue-600 w-full h-screen flex items-center justify-center">
        <img
          className="w-[35rem] rounded-lg   object-cover"
          src="/elder.jpeg"
          alt=""
        />
      </div>

      <div className="flex items-center justify-center flex-col">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
