import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterDiv>
      <div>Copyright © 2022 kangjuhee.</div>
      <div> All rights reserved.</div>
    </FooterDiv>
  );
};

const FooterDiv = styled.footer`
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div:first-child {
    margin-bottom: 1vw;
  }
`;
export default Footer;
