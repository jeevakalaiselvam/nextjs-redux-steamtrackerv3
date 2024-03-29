import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  GAME_OPTION_PERCENTAGE_DESC,
  GAME_OPTION_PERCENTAGE_DESC_UNLOCKED,
} from "../../../helpers/filterHelper";
import Achievements from "../../organisms/Achievements";
import AchievementsUnlockedRecent from "../../organisms/AchievementsUnlockedRecent";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 0.25rem;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

export default function GamesRightSidebar() {
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings } = steamtracker;
  const { gamePage } = settings;

  const router = useRouter();
  const { gameId } = router.query;

  let game;
  if (gameId) {
    game = games.find((game) => game.id == gameId);
  }

  return (
    <Container>
      {game && (
        <>
          <Title>RECENTLY UNLOCKED</Title>
          <AchievementsUnlockedRecent
            game={game}
            filterOption={GAME_OPTION_PERCENTAGE_DESC_UNLOCKED}
            searchTerm={""}
          />
        </>
      )}
    </Container>
  );
}
