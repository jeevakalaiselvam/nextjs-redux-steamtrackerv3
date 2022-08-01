import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import GameCard from "../atoms/GameCard";
import * as Loaders from "react-spinners";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 100%;
  min-height: 100%;
  overflow: scroll;
  flex-wrap: wrap;
`;

export default function Games() {
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games } = steamtracker;

  return (
    <Container>
      {Object.keys(games).length > 0 &&
        Object.keys(games).map((gameKey) => {
          return <GameCard game={games[gameKey]} id={gameKey} />;
        })}
      {games.length === 0 && <Loaders.HashLoader />}
    </Container>
  );
}
