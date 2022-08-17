import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginReturnTypes {
  userData: { email: string; password: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoginValid: { email: boolean; password: boolean };
}

// 로그인 커스텀 hook
const useLogin = (): LoginReturnTypes => {
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
  return { userData, handleChange, handleSubmit, isLoginValid };
};

export default useLogin;
