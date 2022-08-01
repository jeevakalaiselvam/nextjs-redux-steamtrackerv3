import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0.25rem;
  flex: 1;
`;

export default function GamesHeader() {
  return <Container>GamesHeader</Container>;
}
