import React from "react";
import Login from "./components/Login";
import AllStudents from "./pages/donor/AllStudents";
import Student from "./pages/donor/Student";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateStudent from "./components/CreateStudent";

function App() {
  return (
    <>
      <CreateStudent />
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/students" element={<AllStudents />} />
          <Route path="/student" element={<Student />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
