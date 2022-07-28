import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  // 유저 로그인 데이터
  const [registerData, setRegisterData] = React.useState({
    email: "",
    password: "",
    repassword: "",
  });
  // 유저 로그인 유효성 검사
  const [isValid, setIsValid] = React.useState({
    email: false,
    password: false,
    repassword: false,
  });

  // 유저 로그인 데이터 변경 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    if (e.target.name === "email") checkEmail(e.target.value);
    if (e.target.name === "password") checkPassword(e.target.value);
    if (e.target.name === "repassword") isSamePassword(e.target.value);
  };

  // 이메일 형식 체크
  const checkEmail = (email: string) => {
    const regex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    setIsValid({ ...isValid, email: regex.test(email) });
  };

  // 비밀번호 형식 체크
  const checkPassword = (password: string) => {
    if (password.length < 8) setIsValid({ ...isValid, password: false });
    else setIsValid({ ...isValid, password: true });
  };

  // 비밀번호 일치 체크
  const isSamePassword = (repassword: string) => {
    if (repassword === registerData.password)
      setIsValid({ ...isValid, repassword: true });
    else setIsValid({ ...isValid, repassword: false });
  };

  // 등록 버튼 클릭 이벤트
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { email, password } = registerData;
      const res = await axios.post("http://localhost:8080/users/create", {
        email,
        password,
      });

      await alert(res.data.message);
      await navigate("/login");
    } catch {
      alert("회원가입 실패");
    }
  };

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
              name="repassword"
              placeholder="비밀번호를 입력해 주세요"
              value={registerData.repassword}
              onChange={handleChange}
            />
          </Col>
          <div>
            <a onClick={() => navigate("/login")}>로그인</a>
          </div>

          <button
            type="submit"
            disabled={
              !isValid.email || !isValid.password || !isValid.repassword
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
  height: 100vh;
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
