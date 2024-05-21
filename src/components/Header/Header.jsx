import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { Container, Logo, LogoutBtn } from "../index";

const Header = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 bg-white shadow-xl border-2 top-0 sticky z-10">
      <Container>
        <nav className="flex items-center">
          <div>
            <Link to="/">
              <Logo width="80px" />
            </Link>
          </div>
          <ul className="flex ml-auto gap-2 md:gap-0 mb-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="inline-bock md:px-6 md:py-2 duration-200 hover:bg-gray-100 text-xs md:text-base focus:font-bold    md:focus:bg-[#e5e5e5] focus:shadow-lg rounded-3xl font-semibold"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
