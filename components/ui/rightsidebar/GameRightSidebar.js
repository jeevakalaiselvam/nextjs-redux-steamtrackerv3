import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  getAllUnlockedAchievements,
  getaUnlockedAchievementsByType,
} from "../../../helpers/achievementHelper";
import {
  GAME_OPTION_PERCENTAGE_ASC_UNLOCKTIME,
  GAME_OPTION_PERCENTAGE_DESC,
  GAME_OPTION_PERCENTAGE_DESC_UNLOCKED,
  GAME_OPTION_PERCENTAGE_DESC_UNLOCKTIME,
} from "../../../helpers/filterHelper";
import { getIcon } from "../../../helpers/iconHelper";
import { calculateXPFromPercentage } from "../../../helpers/xpHelper";
import JournalInput from "../../atoms/JournalInput";
import Achievements from "../../organisms/Achievements";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 0.25rem 0;
  min-height: 100vh;
  max-height: 100vh;
  padding: 1rem;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.15rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  justify-content: center;
`;

const Data = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1b51b;
`;

const Icon = styled.div`
  display: flex;
  margin-right: 0.25rem;
  align-items: center;
  color: #f1b51b;
  justify-content: center;
`;

const Text = styled.div`
  color: #f1b51b;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const JournalContainer = styled.div`
  display: flex;
  transition: 0.5s all;
  align-items: flex-start;
  padding: 1rem;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  color: #b0bec5;
  backdrop-filter: blur(2px);
  width: 100%;
`;

export default function GameRightSidebar() {
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings } = steamtracker;
  const { gamePage } = settings;
  const { selectedAchievement: achievement } = gamePage;

  const router = useRouter();
  const { gameId } = router.query;

  let game;
  let todayOnly = [];
  if (gameId) {
    game = games.find((game) => game.id == gameId);
    todayOnly = getaUnlockedAchievementsByType(game.achievements, "TODAY");
  }

  return (
    <Container>
      {game && (
        <>
          <TitleContainer>
            <Title>UNLOCKED TODAY</Title>
            <Data>
              <Icon>{getIcon("gold")}</Icon>
              <Text>
                {todayOnly.reduce(
                  (acc, item) =>
                    acc + calculateXPFromPercentage(item.percentage),
                  0
                )}
              </Text>
            </Data>
          </TitleContainer>
          <Achievements
            game={game}
            filterOption={GAME_OPTION_PERCENTAGE_ASC_UNLOCKTIME}
            searchTerm={""}
            showOnly="TODAY"
          />
        </>
      )}
    </Container>
  );
}
