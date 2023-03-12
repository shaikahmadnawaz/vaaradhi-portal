import React from "react";
import Navbar from "../../components/Navbar";

const Welcome = () => {
  return (
    <div className="w-full h-screen bg-slate-200">
      <Navbar />
      <div className="flex">
        <h2 className="">Students Adopted</h2>
        <section></section>
      </div>
    </div>
  );
};

export default Welcome;
