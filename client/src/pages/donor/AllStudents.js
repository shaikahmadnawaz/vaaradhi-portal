import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllStudents = () => {
  const { students } = useSelector((store) => store.donor);
  return (
    <section className="min-h-screen bg-gray-300 flex flex-col items-center">
      <h2 className="pt-20 mt-7 font-medium text-3xl text-gray-800">
        Students Adopted
      </h2>
      <div className="grid grid-cols-3 gap-6 mt-8">
        {students.map((student) => {
          return (
            <div
              key={student.id}
              className="flex flex-col justify-between w-[18rem] h-[20rem] rounded-lg bg-white p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
              <div className="w-32 h-32 mx-auto">
                <img
                  src={student.image || "https://via.placeholder.com/150"}
                  alt="student img"
                  className="w-25 h-25 object-cover rounded-full border-2 border-blue-500"
                />
              </div>
              <div className="flex justify-center items-center flex-col">
                <p className="mb-2 text-lg font-medium leading-tight text-gray-800">
                  {student.name}
                </p>
                <p className="mb-2 text-sm text-gray-600">{student.gender}</p>
                <p className="mb-4 text-sm text-gray-600">{student.mobile}</p>
                <Link
                  to={`/donor/students/${student.id}`}
                  className="inline-block rounded-full px-4 py-2 text-sm font-medium uppercase leading-normal bg-blue-500 hover:bg-blue-600 text-white transition duration-300 ease-in-out"
                >
                  More details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AllStudents;
