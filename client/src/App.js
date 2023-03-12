import React from "react";
import Login from "./components/Login";
import { Welcome as AdminWelcome, CreateStudent } from "./pages/admin";
import { Welcome as DonorWelcome, AllStudents, Student } from "./pages/donor";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/">
            <Route index element={<AdminWelcome />} />
            <Route path="createstudent" element={<CreateStudent />} />
          </Route>
          <Route path="/donor/">
            <Route index element={<DonorWelcome />} />
            <Route path="students" element={<AllStudents />} />
            <Route path="students/:id" element={<Student />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
