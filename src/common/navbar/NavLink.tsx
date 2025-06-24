import type React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink: React.FC<{
  to: string;
  name: string;
}> = ({ to = "", name = "" }) => {
  const { pathname } = useLocation();

  return (
    <>
      <Link
        to={to as string}
        className={`uppercase text-sm px-2.5 transition-all duration-300 py-1 ${
          pathname === to ? "text-red-500" : "text-white hover:text-red-500"
        }`}
      >
        {name}
      </Link>
    </>
  );
};

export default NavLink;
