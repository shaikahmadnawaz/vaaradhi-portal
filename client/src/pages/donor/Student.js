import React from "react";
import { useSelector } from "react-redux";

const Student = () => {
  const { students, currentStudentId } = useSelector((store) => store.donor);
  const student = students.find((student) => student.id === currentStudentId);
  return (
    <div>
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
      </div>
    </div>
  );
};

export default Student;
