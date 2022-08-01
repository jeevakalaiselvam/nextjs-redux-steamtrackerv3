import React from "react";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../helpers/urlHelper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 150px;
  margin: 1rem;
  position: relative;
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default function GameCard({ game }) {
  const { id, playtime, name, version, achievements, completion, toGet } = game;
  return (
    <Container>
      <Image image={HEADER_IMAGE(id)} />
      <Overlay />
    </Container>
  );
}
