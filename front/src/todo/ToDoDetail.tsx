import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../layout/Header";
import axios from "axios";

const ToDoDetail = () => {
  const params = useParams();
  const [detailData, setDetailData] = React.useState({
    title: "",
    content: "",
    id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8080/todos/${params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res.data.data);
      const { title, content, id } = res.data.data;
      await setDetailData({ title, content, id });
    };
    fetchData();
  }, []);
  return (
    <div>
      <Header title={"Todo Detail"} />
      <div>
        <div>{detailData.title}</div>
        <div>{detailData.content}</div>
      </div>
    </div>
  );
};

export default ToDoDetail;
