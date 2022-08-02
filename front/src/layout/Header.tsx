import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string;
}

const Header = ({ title }: HeaderProps) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("로그아웃 성공");
    navigate("/login");
  };
  return (
    <Nav>
      <h1 id="header">{title}</h1>
      <div id="logout" onClick={handleLogout}>
        로그아웃
      </div>
    </Nav>
  );
};

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 15vh;

  #logout {
    text-align: right;
    width: 100%;
    margin-right: 10%;
    cursor: pointer;
  }
`;

export default Header;
