import React from "react";
import Navbar from "../../components/Navbar";
import AllStudents from "./AllStudents";

const Welcome = () => {
  return (
    <div className="w-full h-screen bg-slate-200">
      <Navbar />
      <div className="flex">
        <section className="w-full h-full">
          <AllStudents />
        </section>
      </div>
    </div>
  );
};

export default Welcome;
