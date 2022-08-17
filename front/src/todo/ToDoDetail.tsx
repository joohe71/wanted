import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../layout/Header";
import * as Api from "../api/Api";
import { Container, Div } from "./ToDo";
import styled from "styled-components";

const ToDoDetail = () => {
  const params = useParams();
  const [detailData, setDetailData] = React.useState({
    title: "",
    content: "",
    id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await Api.get(`http://localhost:8080/todos/${params.id}`);
      console.log(res.data.data);
      const { title, content, id } = res.data.data;
      await setDetailData({ title, content, id });
    };
    fetchData();
  }, []);
  return (
    <Div>
      <Header title={"Todo Detail"} />
      <Container>
        <H3>{detailData.title}</H3>
        <div>{detailData.content}</div>
      </Container>
    </Div>
  );
};

const H3 = styled.h3`
  width: 100%;
  word-break: break-all;
`;
export default ToDoDetail;
