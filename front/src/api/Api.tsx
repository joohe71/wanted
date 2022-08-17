import axios from "axios";

const token = `Bearer ${localStorage.getItem("token")}`;

const get = (endpoint: string) => {
  return axios.get(endpoint, {
    headers: {
      Authorization: token,
    },
  });
};

const post = (endpoint: string, data: any) => {
  const bodyData = JSON.stringify(data);
  return axios.post(endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

const put = (endpoint: string, data: any) => {
  const bodyData = JSON.stringify(data);
  return axios.put(endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

const del = (endpoint: string) => {
  return axios.delete(endpoint, {
    headers: {
      Authorization: token,
    },
  });
};

export { get, post, put, del as delete };
