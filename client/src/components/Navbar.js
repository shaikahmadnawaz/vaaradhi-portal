import React from "react";
import { HiOutlineMenu } from "react-icons/hi";

const Navbar = () => {
  return (
    <nav className="relative">
      <div className="navbar shadow-md w-full bg-slate-100 flex items-center justify-between p-4 fixed gap-2 top-0 z-50">
        <div className="text-3xl cursor-pointer md:hidden">
          <HiOutlineMenu />
        </div>
        <div className="name flex-1">
          <p className="text-black font-medium text-xl">
            Welcome <span className=" font-bold text-blueTheme">Donor</span>
          </p>
        </div>
        <div className="profile flex items-center">
          <img
            src="https://picsum.photos/200"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
