import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const ProtectedLayout = () => {
  const { user } = useSelector((store) => store.admin);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
};

export default ProtectedLayout;
