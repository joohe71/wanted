import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ToDoAddForm from "./ToDoAddForm";
import axios from "axios";
import ToDoList from "./ToDoList";
import ToDoEditForm from "./ToDoEditForm";
import Header from "../layout/Header";

export type ToDoData = {
  title: string;
  content: string;
  id: string;
};
export interface ToDoProps {
  todos: { title: string; content: string; id: string }[];
  handleDelete: (item: ToDoData) => void;
  handleEditClick: (item?: ToDoData) => void;
}

const ToDo = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = React.useState(false);
  const [isEdited, setIsEdited] = React.useState(false);
  const [isEditData, setIsEditData] = React.useState<ToDoData>({
    title: "",
    content: "",
    id: "",
  });
  const [todos, setTodos] = React.useState<ToDoProps["todos"]>([]);

  const handleAdd = () => setIsClicked((prev) => !prev);

  const handleEditClick = (item?: ToDoData) => {
    setIsEdited((prev) => !prev);
    if (item) {
      setIsEditData(item);
    }
  };

  const handleUpdate = (title: string, content: string, id: string) => {
    const copied = [...todos];
    copied.push({ title, content, id });

    setTodos(copied);
  };

  const handleEdit = (title: string, content: string, id: string) => {
    const copied = [...todos];
    const index = copied.findIndex((item) => item.id === id);
    copied[index] = { title, content, id };
    setTodos(copied);
  };

  const handleDelete = async (item: any) => {
    await axios.delete(`http://localhost:8080/todos/${item.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const copied = [...todos];
    await copied.splice(todos.indexOf(item), 1);
    await setTodos(copied);
  };

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
      {isEdited && (
        <ToDoEditForm
          handleEditClick={handleEditClick}
          handleEdit={handleEdit}
          isEditData={isEditData}
        />
      )}
      <div>
        <Header title={"Todo List"} />
        <Container>
          <button onClick={() => setIsClicked((prev) => !prev)}>
            할일 추가 버튼
          </button>
          <ToDoList
            todos={todos}
            handleDelete={handleDelete}
            handleEditClick={handleEditClick}
          />
        </Container>
      </div>
    </>
  );
};

const Container = styled.div`
  padding: 0 10%;
`;

export default ToDo;
