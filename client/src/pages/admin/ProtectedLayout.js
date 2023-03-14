import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const { user } = useSelector((store) => store.admin);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedLayout;
