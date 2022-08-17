import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";

const SignUp = () => {
  const navigate = useNavigate();
  const { registerData, isRegisterValid, handleChange, handleSubmit } =
    useSignUp();
  return (
    <Layout>
      <Form onSubmit={handleSubmit}>
        <fieldset>
          <legend>회원가입</legend>
          <Col>
            <label htmlFor="registerid">아이디(E-mail)</label>
            <input
              type="email"
              id="registerid"
              name="email"
              placeholder="아이디(E-mail)을 입력해 주세요"
              value={registerData.email}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <label htmlFor="registerpw">비밀번호</label>
            <input
              type="password"
              id="registerpw"
              name="password"
              placeholder="비밀번호를 입력해 주세요"
              value={registerData.password}
              onChange={handleChange}
            />
          </Col>
          <Col>
            <label htmlFor="againpw">비밀번호 확인</label>
            <input
              type="password"
              id="againpw"
              name="passwordCheck"
              placeholder="비밀번호를 입력해 주세요"
              value={registerData.passwordCheck}
              onChange={handleChange}
            />
          </Col>
          <div>
            <a onClick={() => navigate("/login")}>로그인</a>
          </div>

          <button
            type="submit"
            disabled={
              !isRegisterValid.email ||
              !isRegisterValid.password ||
              !isRegisterValid.passwordCheck
            }
          >
            회원가입
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

export default SignUp;
