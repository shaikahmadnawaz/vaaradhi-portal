import React from "react";
import Login from "./components/Login";
import { Welcome as AdminWelcome, CreateStudent } from "./pages/admin";
import { AllStudents, Welcome as DonorWelcome } from "./pages/donor";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Welcome } from "./pages/caretaker";
import Landing from "./pages/Landing";
import ProtectedLayout from "./pages/admin/ProtectedLayout";
import Student from "./pages/admin/Student";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="admin/" element={<ProtectedLayout />}>
            <Route index element={<AdminWelcome />} />
            <Route path="createstudent" element={<CreateStudent />} />
            <Route path="student" element={<Student />} />
          </Route>
          <Route path="/donor/">
            <Route index element={<DonorWelcome />} />
            <Route path="students" element={<AllStudents />} />
            <Route path="students/:id" element={<Student />} />
          </Route>
          <Route path="/caretaker/">
            <Route index element={<Welcome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
