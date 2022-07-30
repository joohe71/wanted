import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ToDoAddForm from "./ToDoAddForm";

const ToDo = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("로그아웃 성공");
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) navigate("/login");
  });

  return (
    <>
      {isClicked && <ToDoAddForm />}
      <div>
        <Nav>
          <h1 id="header">ToDo List</h1>
          <div id="logout" onClick={handleLogout}>
            로그아웃
          </div>
        </Nav>
        <button onClick={() => setIsClicked((prev) => !prev)}>
          할일 추가 버튼
        </button>
        <ul>
          <li>할일 1</li>
          <li>할일 2</li>
        </ul>
      </div>
    </>
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
