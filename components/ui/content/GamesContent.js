import React from "react";
import { useSelector } from "react-redux";
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
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings } = steamtracker;
  const { gamesPage } = settings;
  const { filterOption, searchTerm } = gamesPage;

  return (
    <Container>
      <Games
        filterOption={filterOption}
        searchTerm={searchTerm}
        games={games}
      />
    </Container>
  );
}
