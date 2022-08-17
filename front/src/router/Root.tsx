import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import Footer from "../layout/Footer";
import ToDo from "../todo/ToDo";
import ToDoDetail from "../todo/ToDoDetail";
import ProtectedRoute from "./ProtectedRoute";

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
