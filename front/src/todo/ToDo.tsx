import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ToDo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") === null) navigate("/login");
  });
  return <div>ToDo</div>;
};

export default ToDo;
