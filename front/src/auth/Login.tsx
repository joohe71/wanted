import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();
  const { userData, handleChange, handleSubmit, isLoginValid } = useLogin();

  return (
    <Layout>
      <Form onSubmit={handleSubmit}>
        <fieldset>
          <legend>로그인</legend>
          <Col>
            <label htmlFor="loginid">아이디(E-mail)</label>
            <input
              type="email"
              id="loginid"
              name="email"
              placeholder="아이디(E-mail)을 입력해 주세요"
              value={userData.email}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <label htmlFor="loginpw">비밀번호</label>
            <input
              type="password"
              id="loginpw"
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              value={userData.password}
              onChange={handleChange}
            />
          </Col>
          <div>
            이 사이트가 처음이신가요?
            <a onClick={() => navigate("/register")}> 회원가입</a>
          </div>

          <button
            type="submit"
            disabled={!isLoginValid.email || !isLoginValid.password}
          >
            로그인
          </button>
        </fieldset>
      </Form>
    </Layout>
  );
};

const Layout = styled.div`
  // border: 2px solid red;
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  // border: 2px solid red;
  width: 40%;
  height: 50%;
  display: flex;
  justify-content: center;

  * {
    max-width: 400px;
    max-height: 600px;
  }
  fieldset {
    box-sizing: border-box;
    padding: 5%;
    margin: 0;
    width: 100%;
    height: 100%;
    // border: 2px solid blue;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Login;
