import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import GameCard from "../atoms/GameCard";
import * as Loaders from "react-spinners";
import { sortGamesByFilterOption } from "../../helpers/gameHelper";

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
  const { games, settings } = steamtracker;
  const { gamesPage } = settings;
  const { filterOption } = gamesPage;

  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    const sortedGames = sortGamesByFilterOption(games, filterOption);
    setFilteredGames((old) => sortedGames);
  }, [filterOption]);

  return (
    <Container>
      {filteredGames.length > 0 &&
        filteredGames.map((game) => {
          return <GameCard game={game} id={game.id} />;
        })}
      {filteredGames.length === 0 && <Loaders.HashLoader />}
    </Container>
  );
}
