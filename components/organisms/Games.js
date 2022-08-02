import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import GameCard from "../atoms/GameCard";
import * as Loaders from "react-spinners";
import {
  sortsearchFilteredGamesByFilterOption,
  sortGamesBySearchTerm,
  sortGamesByFilterOption,
} from "../../helpers/gameHelper";

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

export default function Games({ games, filterOption, searchTerm }) {
  const [searchFilteredGames, setSearchFilteredGames] = useState([]);

  useEffect(() => {
    const searchFilteredGames = games.filter((game) => {
      if (searchTerm == "") {
        return true;
      } else {
        if (
          game.name
            .toLowerCase()
            .trim()
            .includes(searchTerm.toLowerCase().trim())
        ) {
          return true;
        }
      }
    });

    const filteredGames = sortGamesByFilterOption(
      searchFilteredGames,
      filterOption
    );

    setSearchFilteredGames((old) => filteredGames);
  }, [searchTerm, filterOption]);

  return (
    <Container>
      {searchFilteredGames.length > 0 &&
        searchFilteredGames.map((game) => {
          return <GameCard game={game} key={game.id} />;
        })}
      {searchFilteredGames.length === 0 && <Loaders.HashLoader />}
    </Container>
  );
}
