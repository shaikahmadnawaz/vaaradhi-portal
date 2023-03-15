import React from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import donations from "../../assets/donations";

const Student = () => {
  return (
    <div className="container">
      <Navbar />
      <div className="grid grid-cols-2 ">
        <div className="p1 h-screen">
          <div className="bg-white mt-32 shadow-lg rounded-lg overflow-hidden w-80 mx-auto">
            <div className="flex justify-center items-center mt-6">
              <img
                className="w-48 h-48 rounded-full  object-cover"
                src="https://picsum.photos/200"
                alt="user"
              />
            </div>

            <div className="p-4 flex flex-col justify-center items-center">
              <h2 className="text-lg font-semibold">John</h2>
              <p className="text-gray-600">Male</p>
              <p className="text-gray-600">20-12-2002</p>
              <p className="text-gray-600">28775438954</p>
              <h3 className="text-md font-medium mt-4">Mother:</h3>
              <p className="text-gray-600">John Father</p>
              <p className="text-gray-600">Farmer</p>
              <h3 className="text-md font-medium mt-4">Care Taker:</h3>
              <p className="text-gray-600">Hohn</p>
              <p className="text-gray-600">895489987056</p>
              <h3 className="text-md font-medium mt-4">Category:</h3>
              <p className="text-gray-600">Orphan</p>
              <h3 className="text-md font-medium mt-4">Education:</h3>
              <p className="text-gray-600">Primary</p>
              <p className="text-gray-600">Year - 2003</p>
              <h3 className="text-md font-medium mt-4">Documents:</h3>
              <p className="text-gray-600">Aadhaar</p>
              <p className="text-gray-600">Certificates</p>
              <div className="table mt-4">
                <table className="table-auto border-collapse border border-gray-400">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Donor</th>
                      <th className="px-4 py-2 text-left">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((donation) => (
                      <tr key={donation.id}>
                        <td className="border px-4 py-2">{donation.date}</td>
                        <td className="border px-4 py-2">{donation.donor}</td>
                        <td className="border px-4 py-2">{donation.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="p2 flex flex-1 h-screen">
          <div className="activity mb-8 mt-20">
            <h1 className="text-2xl flex justify-center items-center font-bold text-gray-800 mb-4">
              Activities
            </h1>
            <div className="cards gap-x-6 my-6 grid grid-cols-2 gap-16">
              <div className="card shadow-lg w-[20rem] bg-white">
                <img
                  className="w-full h-60 object-cover rounded-t-lg"
                  src="https://picsum.photos/200"
                  alt="card"
                />
                <div className="p-6">
                  <h5 className="mb-2 text-xl font-medium leading-tight text-gray-800">
                    Activity 1
                  </h5>
                  <p className="mb-4 text-base text-gray-600">
                    About the activity that student participated in
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
                    Activity 1
                  </h5>
                  <p className="mb-4 text-base text-gray-600">
                    About the activity that student participated in detail
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
                    Activity 1
                  </h5>
                  <p className="mb-4 text-base text-gray-600">
                    About the activity that student participated in detail
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
                    Activity 1
                  </h5>
                  <p className="mb-4 text-base text-gray-600">
                    About the activity that student participated in detail
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
                    Activity 1
                  </h5>
                  <p className="mb-4 text-base text-gray-600">
                    About the activity that student participated in detail
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
                    Activity 1
                  </h5>
                  <p className="mb-4 text-base text-gray-600">
                    About the activity that student participated in detail
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
