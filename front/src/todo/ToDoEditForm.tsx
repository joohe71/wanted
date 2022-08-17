import * as Api from "../api/Api";
import React, { useEffect } from "react";
import styled from "styled-components";
import { ToDoData } from "./ToDo";

interface ToDoEditFormProps {
  handleEditClick: (item?: ToDoData) => void;
  handleEdit: (title: string, content: string, id: string) => void;
  isEditData: ToDoData;
}

const ToDoEditForm = ({
  isEditData,
  handleEdit,
  handleEditClick,
}: ToDoEditFormProps) => {
  const [editData, setEditData] = React.useState({
    title: "",
    content: "",
    id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({ ...editData, [e.target.id]: e.target.value });
  };
  // 할 일 수정(update) 핸들러
  const handleSubmit = async () => {
    const res = await Api.put(`http://localhost:8080/todos/${editData.id}`, {
      title: editData.title,
      content: editData.content,
    });
    await handleEdit(
      res.data.data.title,
      res.data.data.content,
      res.data.data.id
    );
    await handleEditClick();
  };

  useEffect(() => {
    const updateData = async () => {
      const copied = { ...isEditData };
      await setEditData(copied);
    };
    updateData();
  }, []);

  return (
    <Container>
      <Form>
        <div>Task title</div>
        <input
          id="title"
          type="text"
          value={editData.title}
          onChange={handleChange}
        />
        <div>Description</div>
        <input
          id="content"
          type="text"
          value={editData.content}
          onChange={handleChange}
        />
        <div>
          <button onClick={handleSubmit}>Edit</button>
          <button onClick={() => handleEditClick()}>취소</button>
        </div>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  border: 2px solid red;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Form = styled.div`
  background-color: white;
`;

export default ToDoEditForm;
