import React from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Footer from "./layout/Footer";
import ToDo from "./todo/ToDo";
import ToDoDetail from "./todo/ToDoDetail";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              when={localStorage.getItem("token") === null}
              to="/login"
            >
              <ToDo />
            </ProtectedRoute>
          }
        />
        <Route path="/:id" element={<ToDoDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default Root;

type IProtectedRoute = {
  when: boolean;
  children: React.ReactElement;
} & React.ComponentProps<typeof Navigate>;

const ProtectedRoute = ({ when, children, ...props }: IProtectedRoute) => {
  return when ? <Navigate {...props} /> : children;
};
