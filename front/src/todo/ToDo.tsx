import React, { Suspense, useEffect, lazy } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ToDoAddForm from "./ToDoAddForm";
import * as Api from "../api/Api";
import ToDoEditForm from "./ToDoEditForm";
import Header from "../layout/Header";
import ToDoSkeleton from "../ToDoSkeleton";

const ToDoList = lazy(() => import("./ToDoList"));

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
    await Api.delete(`http://localhost:8080/todos/${item.id}`);
    const copied = [...todos];
    await copied.splice(todos.indexOf(item), 1);
    await setTodos(copied);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await Api.get("http://localhost:8080/todos");
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
      <Div>
        <Header title={"Todo List"} />
        <Container>
          <button onClick={() => setIsClicked((prev) => !prev)}>
            할일 추가 버튼
          </button>
          <Ul>
            <Suspense
              fallback={
                [1, 2, 3, 4, 5].map((num) => (
                  <ToDoSkeleton key={`todolistLoading-${num}`} />
                ))
                // </ul>
              }
            >
              <ToDoList
                todos={todos}
                handleDelete={handleDelete}
                handleEditClick={handleEditClick}
              />
            </Suspense>
          </Ul>
        </Container>
      </Div>
    </>
  );
};

export const Div = styled.div`
  min-height: 90vh;
`;

export const Container = styled.div`
  padding: 0 10%;
  min-height: 75vh;
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
`;

export default ToDo;
