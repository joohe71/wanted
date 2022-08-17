import React from "react";
import { Navigate } from "react-router-dom";

type IProtectedRoute = {
  when: boolean;
  children: React.ReactElement;
} & React.ComponentProps<typeof Navigate>;

const ProtectedRoute = ({ when, children, ...props }: IProtectedRoute) => {
  return when ? <Navigate {...props} /> : children;
};

export default ProtectedRoute;
