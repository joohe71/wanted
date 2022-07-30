import React from "react";
import { ToDoProps } from "./ToDo";

const ToDoList = ({ todos }: ToDoProps) => {
  return (
    <ul>
      {todos.map((todo, index) => (
        <li key={`todo-${index}`}>{todo.title}</li>
      ))}
    </ul>
  );
};

export default ToDoList;
