import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Student = () => {
  return (
    <div className="container">
      <nav className="navbar w-full bg-slate-100 flex items-center justify-between px-4 py-4  fixed top-0 z-50">
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
      <div className="grid grid-cols-2 ">
        <div className="p1 h-screen">
          <div className="mx-auto px-6 py-12 bg-white rounded-lg shadow-lg h-screen">
            <div className="flex flex-col items-center">
              <img
                src="https://picsum.photos/200"
                alt="student img"
                className="w-48 h-48 rounded-full mb-6 object-cover object-center border-2 border-blue-500"
              />
              <h2 className="text-3xl font-semibold text-gray-800 tracking-wider">
                John
              </h2>
              <p className="text-lg font-semibold text-gray-500">
                01-01-2000 | male
              </p>
              <hr className="my-4 border-gray-400 w-full" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-500">
                    Mobile
                  </span>
                  <p className="text-lg font-medium text-gray-800">
                    76854898547
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-500">
                    Category
                  </span>
                  <p className="text-lg font-medium text-gray-800">
                    semi-orphan
                  </p>
                </div>
              </div>
              <hr className="my-4 border-gray-400 w-full" />
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Care Taker's Details
                </h3>
                <div className="flex flex-col sm:flex-row">
                  <div className="flex flex-col mr-6">
                    <span className="text-lg font-semibold text-gray-500">
                      Name
                    </span>
                    <p className="text-lg font-medium text-gray-800">Doe</p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-500">
                      Mobile
                    </span>
                    <p className="text-lg font-medium text-gray-800">
                      987604896
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-rows-2 h-screen p-2">
          <div class="donor-details h-screen flex flex-col items-center">
            <h1 class="text-3xl font-semibold text-gray-800 tracking-wider">
              Donor
            </h1>
            <img
              src="https://picsum.photos/200"
              alt="student img"
              class="w-48 h-48 rounded-full mb-6 object-cover object-center border-2 border-blue-500"
            />
            <h2 class="text-3xl font-semibold text-gray-800 tracking-wider">
              John
            </h2>
            <p class="text-lg font-semibold text-gray-500">01-01-2000 | male</p>
            <hr class="my-4 border-gray-400 w-full" />
          </div>
          <div class="caretaker-details h-screen flex flex-col items-center">
            <h1 class="text-3xl font-semibold text-gray-800 tracking-wider">
              Caretaker
            </h1>
            <img
              src="https://picsum.photos/200"
              alt="student img"
              class="w-48 h-48 rounded-full mb-6 object-cover object-center border-2 border-blue-500"
            />
            <h2 class="text-3xl font-semibold text-gray-800 tracking-wider">
              John
            </h2>
            <p class="text-lg font-semibold text-gray-500">01-01-2000 | male</p>
            <hr class="my-4 border-gray-400 w-full" />
          </div>
        </div>
      </div>
      <div className="activity m-10">
        <h1 className="text-2xl flex justify-center items-center font-bold text-gray-800 mb-4">
          Activities
        </h1>
        <div className="cards ml-[6rem] my-3 grid grid-cols-3 gap-1">
          <div className="card shadow-lg w-[20rem] bg-white">
            <img
              className="w-full h-60 object-cover rounded-t-lg"
              src="https://picsum.photos/200"
              alt="card"
            />
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-gray-800">
                Card title
              </h5>
              <p className="mb-4 text-base text-gray-600">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card shadow-lg w-[20rem] bg-white">
            <img
              className="w-full h-60 object-cover rounded-t-lg"
              src="https://picsum.photos/200"
              alt="card"
            />
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-gray-800">
                Card title
              </h5>
              <p className="mb-4 text-base text-gray-600">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card shadow-lg w-[20rem] bg-white">
            <img
              className="w-full h-60 object-cover rounded-t-lg"
              src="https://picsum.photos/200"
              alt="card"
            />
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-gray-800">
                Card title
              </h5>
              <p className="mb-4 text-base text-gray-600">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card shadow-lg w-[20rem] bg-white">
            <img
              className="w-full h-60 object-cover rounded-t-lg"
              src="https://picsum.photos/200"
              alt="card"
            />
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-gray-800">
                Card title
              </h5>
              <p className="mb-4 text-base text-gray-600">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card shadow-lg w-[20rem] bg-white">
            <img
              className="w-full h-60 object-cover rounded-t-lg"
              src="https://picsum.photos/200"
              alt="card"
            />
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-gray-800">
                Card title
              </h5>
              <p className="mb-4 text-base text-gray-600">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
          <div className="card shadow-lg w-[20rem] bg-white">
            <img
              className="w-full h-60 object-cover rounded-t-lg"
              src="https://picsum.photos/200"
              alt="card"
            />
            <div className="p-6">
              <h5 className="mb-2 text-xl font-medium leading-tight text-gray-800">
                Card title
              </h5>
              <p className="mb-4 text-base text-gray-600">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
