import { useRouter } from "next/router";
import React from "react";
import { FaTrophy } from "react-icons/fa";
import {
  HiFastForward,
  HiOutlineChevronDoubleUp,
  HiOutlineChevronUp,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getAllUnlockedAchievements,
  getaUnlockedAchievementsByRecent30Days,
  getaUnlockedAchievementsByType,
} from "../../helpers/achievementHelper";
import { openLinkInNewTab } from "../../helpers/browserHelper";
import {
  calculateLevelFromAllGames,
  calculateTotalXPForAllGames,
  calculateXPFromPercentage,
  XP_FOR_LEVEL,
} from "../../helpers/xpHelper";
import { AiFillGold } from "react-icons/ai";

const Container = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  align-items: center;
  padding: 1rem;
  justify-content: center;
  margin-top: 0.5rem;
  flex-direction: column;
  width: 95%;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

const LevelFragment = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const LevelContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 1rem;
`;

const GoldTrophy = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-right: 2rem;
  color: #f1b51b;
  font-size: 1.5rem;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 1rem;
  margin-left: 1rem;
  justify-content: center;
  font-size: 2rem;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;
`;

const ProfileHistoryTrophies = (props) => {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, planner } = steamtracker;

  const router = useRouter();
  const { gameId } = router.query;

  const game = games.find((game) => game.id == gameId);
  const { phaseAddedGame } = planner;

  let todayTrophies = getaUnlockedAchievementsByType(
    phaseAddedGame.achievements,
    "TODAY"
  );

  const allUnlockedAchievements = getAllUnlockedAchievements(games);
  const achievmentsMapper = getaUnlockedAchievementsByRecent30Days(
    allUnlockedAchievements
  );

  const { xpTotal, currentLevel, toNextLevel } =
    calculateLevelFromAllGames(games);

  const goldTrophies = games.reduce((acc, game) => {
    if (+game.completion == 100) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  const purpleTrophies = games.reduce((acc, game) => {
    if (+game.completion >= 80 && +game.completion < 100) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  return (
    <Container onClick={() => {}}>
      <LevelFragment>
        <Header>
          <HiOutlineChevronDoubleUp
            style={{ marginRight: "0.5rem", color: "#6cff5c" }}
          />
          <Title>TODAY</Title>
          <HiOutlineChevronDoubleUp
            style={{ marginLeft: "0.5rem", color: "#6cff5c" }}
          />
        </Header>
        <LevelContainer>
          <GoldTrophy>
            <Icon>
              <AiFillGold />
            </Icon>
            <Text>
              {Math.floor(
                todayTrophies.reduce(
                  (acc, trophy) =>
                    acc + calculateXPFromPercentage(trophy.percentage),
                  0
                )
              )}
            </Text>
          </GoldTrophy>
        </LevelContainer>
      </LevelFragment>
    </Container>
  );
};

export default ProfileHistoryTrophies;
