import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ToDo = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("로그아웃 성공");
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) navigate("/login");
  });
  return (
    <div>
      <Nav>
        <h1 id="header">ToDo List</h1>
        <div id="logout" onClick={handleLogout}>
          로그아웃
        </div>
      </Nav>
    </div>
  );
};

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #logout {
    text-align: right;
    width: 100%;
    margin-right: 10%;
    cursor: pointer;
  }
`;

export default ToDo;
