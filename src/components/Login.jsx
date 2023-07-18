import React from "react";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation } from "react-query";
import { login } from "../service/Login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);

const schema = Joi.object({
  username: Joi.string().max(20).min(4),
  password: joiPassword
    .string()
    .minOfSpecialCharacters(2)
    .minOfLowercase(2)
    .minOfUppercase(2)
    .minOfNumeric(2)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .required(),
});
const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ resolver: joiResolver(schema) });

  const navigate = useNavigate();

  const loginMutation = useMutation((data) => login(data));

  const onSubmit = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        localStorage.setItem("logged_user", JSON.stringify(data));
        navigate("/");
      },
      onError: (error, variables) => {
        toast.error(error.response.data.detail, { theme: "colored" });
        // console.log("errror", error.response.data.detail);
      },
    });
  };
  return (
    <>
      <h4 className="text-4xl font-medium pb-1">Login 🔑</h4>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>

      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
        action=""
        className="mt-10 flex flex-col justify-center"
      >
        <div className="w-96 mb-5">
          <input
            className={`border-2 w-full outline-none py-3 hover:border-blue-500 focus:border-blue-500 px-4 bg-slate-50 focus:bg-white  rounded-lg ${
              errors?.username ? "border-red-400" : "border-slate-300"
            } `}
            {...register("username")}
            placeholder="username"
            type="text"
          />
          {errors && errors?.username && (
            <span className="text-red-400 text-left">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="w-96 mb-5">
          <input
            className={`border-2 w-full outline-none py-3 hover:border-blue-500 focus:border-blue-500 px-4 bg-slate-50 focus:bg-white  rounded-lg ${
              errors?.password ? "border-red-400" : "border-slate-300"
            } `}
            placeholder="password"
            type="password"
            {...register("password")}
          />
          {errors && errors?.password && (
            <span className="text-red-400">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-bluelight w-96 py-3 text-center text-white rounded-lg"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
