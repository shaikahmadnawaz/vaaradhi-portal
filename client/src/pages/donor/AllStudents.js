import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AllStudents = () => {
  const { students } = useSelector((store) => store.donor);
  return (
    <section className="min-h-screen bg-gradient-to-t from-blue-400  to-red-400 flex flex-col items-center">
      <h1 className="pt-20 font-medium text-4xl">Students</h1>
      <div className="student-container grid grid-cols-3 justify-self-center gap-8 h-5/5 justify-center rounded-md py-20 w-4/5 m-auto ">
        {students.map((student) => {
          return (
            <div
              key={student.id}
              className="flex flex-col justify-center items-center max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-900"
            >
              <div className="w-32 h-32">
                <img
                  src={student.image}
                  alt="card img"
                  className="w-full mt-0 mb-7 rounded-full"
                />
              </div>
              <p className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {student.name}
              </p>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {student.gender}
              </p>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                {student.mobile}
              </p>
              <Link
                to={`/donor/students/${student.id}`}
                className="inline-block rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal bg-blue-500 hover:bg-blue-600 text-white p-2"
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
