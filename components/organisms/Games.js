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
import e from "cors";
import { GAMES_OPTION_COMPLETION_PINNED } from "../../helpers/filterHelper";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  overflow: scroll;
  flex-wrap: wrap;
`;

export default function Games({ games, filterOption, searchTerm }) {
  const [searchFilteredGames, setSearchFilteredGames] = useState([]);
  const steamtracker = useSelector((state) => state.steamtracker);
  const { pinnedGames, settings, targetSettings } = steamtracker;
  const { settingsPage } = settings;
  const { completionPercentageTarget } = settingsPage;

  useEffect(() => {
    const searchFilteredGames = games.filter((game) => {
      if (searchTerm == "") {
        return true;
      } else {
        if (
          game.name
            .toLowerCase()
            .trim()
            ?.includes(searchTerm.toLowerCase().trim())
        ) {
          return true;
        }
      }
    });

    let filteredGames = [];

    if (searchTerm !== "") {
      filteredGames = searchFilteredGames;
    } else {
      filteredGames = sortGamesByFilterOption(
        searchFilteredGames,
        GAMES_OPTION_COMPLETION_PINNED,
        pinnedGames ?? [],
        completionPercentageTarget ?? 100,
        targetSettings
      );
    }

    setSearchFilteredGames((old) => filteredGames);
  }, [searchTerm, filterOption, pinnedGames]);

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
