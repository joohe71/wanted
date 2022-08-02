import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import ToDo from "./todo/ToDo";
import ToDoDetail from "./todo/ToDoDetail";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/:id" element={<ToDoDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default Root;
