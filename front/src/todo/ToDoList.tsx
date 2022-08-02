import React from "react";
import { ToDoProps } from "./ToDo";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ToDoList = ({ todos, handleDelete, handleEditClick }: ToDoProps) => {
  const navigate = useNavigate();
  return (
    <Ul>
      {todos.map((todo, index) => (
        <Group key={`todo-${index}`}>
          <li key={`todo-${index}`} onClick={() => navigate(`/${todo.id}`)}>
            {todo.title}
          </li>
          <Group>
            <button onClick={() => handleEditClick(todo)}>수정</button>
            <button onClick={() => handleDelete(todo)}>삭제</button>
          </Group>
        </Group>
      ))}
    </Ul>
  );
};

const Ul = styled.ul`
  list-style: none;
  padding: 0;
`;

const Group = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default ToDoList;
