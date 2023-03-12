import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Welcome = () => {
  return (
    <section className="w-full h-screen bg-slate-200">
      <Navbar />
      <div className="flex">
        <div className="sidebar w-1/4 bg-gray-100 h-screen">
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
        <div className="right-side w-3/4 bg-white h-full">
          <div className="flex justify-between gap-4 p-4">
            <div className="box flex justify-center items-center flex-col bg-blueTheme w-1/3 h-48 rounded-lg p-4">
              <h3 className="text-white font-bold text-xl mb-2">Students</h3>
              <p className="text-white">15</p>
            </div>
            <div className="box flex justify-center items-center flex-col bg-blueTheme w-1/3 h-48 rounded-lg p-4">
              <h3 className="text-white font-bold text-xl mb-2">Donors</h3>
              <p className="text-white">10</p>
            </div>
            <div className="box flex justify-center items-center flex-col bg-blueTheme w-1/3 h-48 rounded-lg p-4">
              <h3 className="text-white font-bold text-xl mb-2">Caretakers</h3>
              <p className="text-white">7</p>
            </div>
          </div>
          <div className="p-4 h-screen">
            <h2 className="text-lg font-bold mb-4">Announcements</h2>
            <ul className="text-gray-800">
              <li className="mb-2">
                <p className="text-sm font-semibold">
                  <span className="text-blueTheme">John Doe</span> posted a new
                  announcement
                </p>
              </li>
              <li className="mb-2">
                <p className="text-sm font-semibold">
                  <span className="text-blueTheme">John Doe</span> posted a new
                  announcement
                </p>
              </li>
              <li className="mb-2">
                <p className="text-sm font-semibold">
                  <span className="text-blueTheme">John Doe</span> posted a new
                  announcement
                </p>
              </li>
              <li className="mb-2">
                <p className="text-sm font-semibold">
                  <span className="text-blueTheme">John Doe</span> posted a new
                  announcement
                </p>
              </li>
              <li className="mb-2">
                <p className="text-sm font-semibold">
                  <span className="text-blueTheme">John Doe</span> posted a new
                  announcement
                </p>
              </li>
              <li className="mb-2">
                <p className="text-sm font-semibold">
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
