import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Student = () => {
  const { students } = useSelector((store) => store.donor);
  const { id } = useParams();
  const student = students.find((student) => student.id === id);

  return (
    <div className="min-h-screen bg-gradient-to-t from-blue-400 to-red-400 flex flex-col justify-center">
      <div className="mx-auto px-6 py-12 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src={student.image}
            alt="student img"
            className="w-48 h-48 rounded-full mb-6 object-cover object-center border-2 border-blue-500"
          />
          <h2 className="text-3xl font-semibold text-gray-800 tracking-wider">
            {student.name}
          </h2>
          <p className="text-lg font-semibold text-gray-500">
            {student.dateOfBirth} | {student.gender}
          </p>
          <hr className="my-4 border-gray-400 w-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-500">
                Mobile
              </span>
              <p className="text-lg font-medium text-gray-800">
                {student.mobile}
              </p>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-500">
                Category
              </span>
              <p className="text-lg font-medium text-gray-800">
                {student.category}
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
                <p className="text-lg font-medium text-gray-800">
                  {student.careTaker.name}
                </p>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-500">
                  Mobile
                </span>
                <p className="text-lg font-medium text-gray-800">
                  {student.careTaker.mobile}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
