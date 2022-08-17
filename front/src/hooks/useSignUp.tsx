import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface SignUpReturnTypes {
  registerData: {
    email: string;
    password: string;
    passwordCheck: string;
  };
  isRegisterValid: {
    email: boolean;
    password: boolean;
    passwordCheck: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const useSignUp = (): SignUpReturnTypes => {
  const navigate = useNavigate();
  // 유저 회원가입 데이터
  const [registerData, setRegisterData] = React.useState({
    email: "",
    password: "",
    passwordCheck: "",
  });
  // 유저 회원가입 유효성 검사
  const [isRegisterValid, setIsRegisterValid] = React.useState({
    email: false,
    password: false,
    passwordCheck: false,
  });

  // 유저 회원가입 데이터 변경 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    if (e.target.name === "email") checkEmail(e.target.value);
    if (e.target.name === "password") checkPassword(e.target.value);
    if (e.target.name === "passwordCheck") isSamePassword(e.target.value);
  };

  // 이메일 형식 체크
  const checkEmail = (email: string) => {
    const regex =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    setIsRegisterValid({ ...isRegisterValid, email: regex.test(email) });
  };

  // 비밀번호 형식 체크
  const checkPassword = (password: string) => {
    if (password.length < 8)
      setIsRegisterValid({ ...isRegisterValid, password: false });
    else setIsRegisterValid({ ...isRegisterValid, password: true });
  };

  // 비밀번호 일치 체크
  const isSamePassword = (passwordCheck: string) => {
    if (passwordCheck === registerData.password)
      setIsRegisterValid({ ...isRegisterValid, passwordCheck: true });
    else setIsRegisterValid({ ...isRegisterValid, passwordCheck: false });
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

  return { registerData, isRegisterValid, handleChange, handleSubmit };
};

export default useSignUp;
