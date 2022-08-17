import React from "react";
import ClockLoader from "react-spinners/ClockLoader";

import styled from "styled-components";

const Loading = () => {
  return (
    <Div>
      <ClockLoader size={70} color="#ff6e40" />
    </Div>
  );
};

const Div = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Loading;
