import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Input, Logo, Button } from "./index";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

function SignUp() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      setLoading(true);
      const userData = await authService.createAccount(data);
      if (!userData) setLoading(false);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          setLoading(false);
          toast.success("Registered Successfully");

          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return loading ? (
    <div className="flex items-center justify-center w-full bg-gray-100 h-[495px] px-2 md:px-0 gap-2">
      <Spinner /> Signing Up
    </div>
  ) : (
    <div className="flex items-center justify-center bg-gray-100 max-h-[535px] px-2 md:px-0">
      <div
        className={`max-h-[535px] mx-auto w-full max-w-lg bg-white rounded-xl p-10 border-2 shadow-lg border-gray-300`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="mt-4 *:my-2 ">
            <Input
              label="Full name: "
              placeholder="Enter your full name"
              autoFocus
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
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
              })}
            />
            <Button
              children="create Account"
              type="submit"
              className="w-full mt-4 font-semibold"
            />
          </div>
        </form>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
