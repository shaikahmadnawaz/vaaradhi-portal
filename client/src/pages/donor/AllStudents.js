import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllStudents = () => {
  const { students } = useSelector((store) => store.donor);
  return (
    <section className="min-h-screen bg-gradient-to-t from-blue-400  to-red-400 flex flex-col items-center">
      <h1 className="pt-20 font-medium text-4xl">Students</h1>
      <div className="student-container grid grid-cols-3 justify-self-center gap-8 h-4/5 justify-center rounded-md py-20 w-4/5 m-auto ">
        {students.map((student) => {
          return (
            <div
              key={student.id}
              className="bg-white h-max flex flex-col rounded-md py-3 items-center shadow-md"
            >
              <div className="w-32 h-32">
                <img
                  src={student.image}
                  alt="card img"
                  className="w-full mb-4 rounded-full"
                />
              </div>
              <p className="text-lg font-bold">{student.name}</p>
              <p>{student.gender}</p>
              <p>{student.mobile}</p>
              <Link
                to={`/donor/students/${student.id}`}
                className="bg-blue-500 text-white p-2 rounded-lg"
              >
                More details
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AllStudents;
