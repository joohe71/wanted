import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ToDoAddForm from "./ToDoAddForm";
import axios from "axios";
import ToDoList from "./ToDoList";

export interface ToDoProps {
  todos: { title: string; content: string; id: string }[];
}

const ToDo = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = React.useState(false);
  const [todos, setTodos] = React.useState<ToDoProps["todos"]>([]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("로그아웃 성공");
    navigate("/login");
  };

  const handleAdd = () => setIsClicked((prev) => !prev);

  const handleUpdate = (title: string, content: string, id: string) => {
    const copied = [...todos];
    copied.push({ title, content, id });

    setTodos(copied);
  };

  // const handleDelete = async(item:any) => {
  //   const copied = [...todos];
  //   await copied.splice(todos.indexOf(item), 1);
  //   await setTodos(copied);
  // }

  useEffect(() => {
    if (localStorage.getItem("token") === null) navigate("/login");
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8080/todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.data);
      await setTodos(
        res.data.data.map((todo: any) => ({
          title: todo.title,
          content: todo.content,
          id: todo.id,
        }))
      );
    };
    fetchData();
  }, []);

  return (
    <>
      {isClicked && (
        <ToDoAddForm handleAdd={handleAdd} handleUpdate={handleUpdate} />
      )}
      <div>
        <Nav>
          <h1 id="header">ToDo List</h1>
          <div id="logout" onClick={handleLogout}>
            로그아웃
          </div>
        </Nav>
        <Container>
          <button onClick={() => setIsClicked((prev) => !prev)}>
            할일 추가 버튼
          </button>
          <ToDoList todos={todos} />
        </Container>
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

const Container = styled.div`
  padding: 0 10%;
`;

export default ToDo;
