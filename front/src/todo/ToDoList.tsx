import React from "react";
import { ToDoProps } from "./ToDo";
import styled from "styled-components";

const ToDoList = ({ todos }: ToDoProps) => {
  return (
    <Ul>
      {todos.map((todo, index) => (
        <Group key={`todo-${index}`}>
          <li key={`todo-${index}`}>{todo.title}</li>
          <Group>
            <button>수정</button>
            <button>삭제</button>
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
