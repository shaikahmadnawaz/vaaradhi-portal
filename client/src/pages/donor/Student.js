import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Student = () => {
  const { students } = useSelector((store) => store.donor);
  const { id } = useParams();
  const student = students.find((student) => student.id === id);
  return (
    <div className="min-h-screen bg-gradient-to-t from-blue-400 to-red-400 ">
      <div className="m-auto p-20">
        <div
          key={student.id}
          className="w-3/5 m-auto p-10 rounded-t-lg bg-white flex flex-col items-center"
        >
          <div className="w-40 h-40 mb-4">
            <img
              src={student.image}
              alt="student img"
              className="rounded-full"
            />
          </div>
          <div className="w-full p-3 flex gap-4">
            <p className="text-xl text-end w-1/2">Name:</p>
            <p className="text-xl text-start w-1/2">{student.name}</p>
          </div>
          <div className="w-full p-3 flex gap-4">
            <p className="text-xl text-end w-1/2">Date of Birth:</p>
            <p className="text-xl text-start w-1/2">{student.dateOfBirth}</p>
          </div>
          <div className="w-full p-3 flex gap-4">
            <p className="text-xl text-end w-1/2">Gender:</p>
            <p className="text-xl text-start w-1/2">{student.gender}</p>
          </div>
          <div className="w-full p-3 flex gap-4">
            <p className="text-xl text-end w-1/2">Mobile:</p>
            <p className="text-xl text-start w-1/2">{student.mobile}</p>
          </div>
          <div className="w-full p-3 flex gap-4">
            <p className="text-xl text-end w-1/2">Category:</p>
            <p className="text-xl text-start w-1/2">{student.category}</p>
          </div>
        </div>
        <div className="w-3/5 m-auto p-10 border-t border-slate-400 rounded-b-lg bg-white flex flex-col items-center">
          <div className="w-full p-3 font-medium text-2xl text-center">
            Care taker's details
          </div>
          <div className="w-full p-3 flex gap-4">
            <p className="text-xl text-end w-1/2">Name:</p>
            <p className="text-xl text-start w-1/2">{student.careTaker.name}</p>
          </div>
          <div className="w-full p-3 flex gap-4">
            <p className="text-xl text-end w-1/2">Mobile:</p>
            <p className="text-xl text-start w-1/2">
              {student.careTaker.mobile}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
