import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  background-color: red;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default function Games() {
  return <Container>Games</Container>;
}
