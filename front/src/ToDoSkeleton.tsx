import React from "react";
import { Skeleton, Stack } from "@mui/material";
import styled from "styled-components";

const ToDoSkeleton = () => {
  return (
    <StackStyle width="100%">
      <Skeleton width="100%" height="40px" variant="rectangular"></Skeleton>
    </StackStyle>
  );
};

const StackStyle = styled(Stack)`
  margin-bottom: 10px;
`;
export default ToDoSkeleton;
