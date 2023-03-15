import React from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Welcome = () => {
  const { user } = useSelector((store) => store.admin);
  if (!user) {
    return <Navigate to="/" />;
  }
  return (
    <section className="h-screen bg-slate-200">
      <div className="flex w-full absolute top-[4.4rem]">
        <div className="hidden pl-2 w-1/4 sidebar max-w-[16rem] bg-gray-100 md:block">
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Dashboard</h2>
            <ul className="text-gray-800">
              <li className="mb-2">
                <Link href="#" className="hover:text-blueTheme">
                  Students
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-blueTheme">
                  Donors
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-blueTheme">
                  Caretakers
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-blueTheme">
                  Announcements
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-blueTheme">
                  Donations
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="right-side bg-white flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-10 py-10 justify-between gap-8 p-4">
            <div className="box cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 flex justify-center items-center flex-col bg-blueTheme h-48 rounded-lg p-4">
              <h3 className="text-white font-bold text-xl mb-2">Students</h3>
              <p className="text-white">15</p>
            </div>
            <div className="box cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 flex justify-center items-center flex-col bg-blueTheme h-48 rounded-lg p-4">
              <h3 className="text-white font-bold text-xl mb-2">Donors</h3>
              <p className="text-white">10</p>
            </div>
            <div className="box cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 flex justify-center items-center flex-col bg-blueTheme  h-48 rounded-lg p-4">
              <h3 className="text-white font-bold text-xl mb-2">Caretakers</h3>
              <p className="text-white">7</p>
            </div>
          </div>
          <div className="p-10">
            <h2 className="text-xl font-bold mb-4">Activities</h2>
            <ul className="text-gray-800">
              <li className="py-3">
                <p className="text-md font-semibold transition ease-in-out transform duration-400 hover:translate-x-2">
                  <span className="text-blueTheme">John Doe</span> posted a new
                  announcement
                </p>
              </li>
              <li className="py-3">
                <p className="text-md font-semibold transition ease-in-out transform duration-400 hover:translate-x-2">
                  <span className="text-blueTheme">John Doe</span> posted a new
                  announcement
                </p>
              </li>
              <li className="py-3">
                <p className="text-md font-semibold transition ease-in-out transform duration-400 hover:translate-x-2">
                  <span className="text-blueTheme">John Doe</span> posted a new
                  announcement
                </p>
              </li>
              <li className="py-3">
                <p className="text-md font-semibold transition ease-in-out transform duration-400 hover:translate-x-2">
                  <span className="text-blueTheme">John Doe</span> posted a new
                  announcement
                </p>
              </li>
              <li className="py-3">
                <p className="text-md font-semibold transition ease-in-out transform duration-400 hover:translate-x-2">
                  <span className="text-blueTheme">John Doe</span> posted a new
                  announcement
                </p>
              </li>
              <li className="py-3">
                <p className="text-md font-semibold transition ease-in-out transform duration-400 hover:translate-x-2">
                  <span className="text-blueTheme">John Doe</span> posted a new
                  announcement
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
