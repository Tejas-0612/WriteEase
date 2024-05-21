import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/");
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      className="inline-bock md:px-6 text-xs md:text-base md:py-2 duration-200 md:hover:bg-red-300 font-semibold md:font-bold md:rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
