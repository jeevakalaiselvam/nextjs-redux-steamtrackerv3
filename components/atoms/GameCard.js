import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100px;
`;

export default function GameCard({ game }) {
  return <Container>GameCard</Container>;
}
