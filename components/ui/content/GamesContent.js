import React from "react";
import styled from "styled-components";
import Games from "../../organisms/Games";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0.25rem;
  height: 100%;
  overflow: scroll;
`;

export default function GamesContent() {
  return (
    <Container>
      <Games />
    </Container>
  );
}
