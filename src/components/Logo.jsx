import React from "react";
import LOGO from "../assets/LOGO.svg";
import LOGO2 from "../assets/LOGO2.svg";

const Logo = ({ type = "Header" }) => {
  return (
    <div>
      {type == "Header" ? (
        <img src={LOGO} className="w-24 md:w-44 select-none" />
      ) : (
        <img src={LOGO2} className="bg-white w-32 md:w-44 select-none" />
      )}
    </div>
  );
};

export default Logo;
