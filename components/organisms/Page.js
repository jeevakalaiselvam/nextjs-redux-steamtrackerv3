import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  background-color: #1e1e1e;
`;

export default function Page({ leftSidebar, header, rightSidebar, content }) {
  return <Container>Page</Container>;
}
