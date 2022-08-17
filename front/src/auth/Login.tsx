import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  // 유저 로그인 데이터
  const [userData, setUserData] = React.useState({ email: "", password: "" });
  // 유저 로그인 유효성 검사
  const [isLoginValid, setIsLoginValid] = React.useState({
    email: false,
    password: false,
  });

  // 유저 로그인 데이터 변경 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    if (e.target.name === "email") checkEmail(e.target.value);
    if (e.target.name === "password") checkPassword(e.target.value);
  };

  // 이메일 형식 체크
  const checkEmail = (email: string) => {
    const regex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    setIsLoginValid({ ...isLoginValid, email: regex.test(email) });
  };

  // 비밀번호 형식 체크
  const checkPassword = (password: string) => {
    if (password.length < 8)
      setIsLoginValid({ ...isLoginValid, password: false });
    else setIsLoginValid({ ...isLoginValid, password: true });
  };

  // 제출 버튼 클릭 이벤트
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/users/login",
        userData
      );
      await localStorage.setItem("token", res.data.token);
      await alert(res.data.message);
      await navigate("/");
      await console.log("로그인 성공");
    } catch {
      alert("로그인 실패");
    }
  };

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
