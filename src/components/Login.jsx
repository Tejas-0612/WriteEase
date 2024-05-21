import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Spinner from "./Spinner";
import authService from "../appwrite/auth";
import { Input, Button, Logo } from "./index";
import { login as authLogin } from "../store/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (data) => {
    setError("");
    try {
      setLoading(true);
      console.log(data);
      const session = await authService.login(data);
      if (!session) setLoading(false);
      if (session) {
        const userData = await authService.getCurrentUser();
        console.log(userData);
        if (userData) {
          dispatch(authLogin({ userData }));
          console.log(dispatch(authLogin(userData)));
          toast.success("logged in successfully");
          setLoading(false);
          navigate("/");
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      setError(error.message);
    }
  };

  return loading ? (
    <div className="flex items-center justify-center w-full bg-gray-100 h-[495px] px-2 md:px-0 gap-2">
      <Spinner /> Signing In
    </div>
  ) : (
    <div className="flex items-center justify-center w-full bg-gray-100 h-[495px] px-2 md:px-0">
      <div
        className={` mx-auto w-full max-w-lg bg-white rounded-xl shadow-lg p-10 border-2 border-gray-300`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5 ">
            <Input
              label="Email: "
              placeholder="Enter your Email"
              type="email"
              autoFocus
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
                validate: {
                  passwordPattern: (value) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                      value
                    ) ||
                    "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
            />
            <Button
              type="submit"
              className="w-full font-semibold"
              children="Sign in"
            />
          </div>
        </form>
        <p className="mt-2 text-center text-base text-black/60 font-semibold">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
