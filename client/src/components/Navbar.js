import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar w-full bg-slate-100 flex items-center justify-between px-4 py-4 z-10">
        <div className="name">
          <p className="text-black font-bold text-lg">
            Welcome <span className="text-blueTheme">Donor</span>
          </p>
        </div>
        <div className="profile flex items-center">
          <img
            src="https://picsum.photos/200"
            alt="Profile"
            className="w-10 h-10 rounded-full mr-2"
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
