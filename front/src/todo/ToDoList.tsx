import React from "react";
import { ToDoProps } from "./ToDo";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ToDoList = ({ todos, handleDelete, handleEditClick }: ToDoProps) => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {todos.map((todo, index) => (
        <Group key={`todo-${index}`}>
          <Li key={`todo-${index}`} onClick={() => navigate(`/${todo.id}`)}>
            {todo.title}
          </Li>
          <ButtonGroup>
            <Button onClick={() => handleEditClick(todo)}>수정</Button>
            <Button onClick={() => handleDelete(todo)}>삭제</Button>
          </ButtonGroup>
        </Group>
      ))}
    </React.Fragment>
  );
};

const Group = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid red;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 10%;
`;

const Button = styled.button`
  padding: 5% 8%;
`;
const Li = styled.li`
  height: 40px;
  line-height: 40px;
`;

export default ToDoList;
