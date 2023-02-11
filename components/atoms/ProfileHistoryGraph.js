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
  calculateRecentHistory,
  calculateTotalXPForAllGames,
  calculateXPFromPercentage,
  XP_FOR_LEVEL,
} from "../../helpers/xpHelper";
import { AiFillGold } from "react-icons/ai";
import { getIcon } from "../../helpers/iconHelper";
import { setShowHistoryModal } from "../../store/actions/games.actions";

const Container = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  align-items: center;
  padding: 1rem 0.25rem;
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

const HistoryContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  padding: 1rem 0.25rem;
  overflow: scroll;
`;

const HistoryItem = styled.div`
  display: flex;
  width: 25px;
  height: 25px;
  align-items: center;
  margin: 0.5rem;
  flex-direction: row;
  justify-content: center;
  padding: 0.5rem;
  background-color: ${(props) =>
    props.current ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.5)"};
  color: ${(props) => (props.current ? "#fefefe" : "#737c9d")};
  opacity: ${(props) => (props.transparent ? "0.25" : "1.0")};
  &:hover {
    background-color: #3049d1;
    color: #fefefe;
  }
`;

const GoldTrophy = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-right: 2rem;
  color: #ffcc00;
  font-size: 2.5rem;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 1rem;
  margin-left: 1rem;
  justify-content: center;
  font-size: 2.25rem;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 1.75rem;
`;

const ProfileHistoryGraph = (props) => {
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

  const {
    xpTotal,
    currentLevel,
    toNextLevel,
    unlockedToday,
    unlockedTodayCount,
  } = calculateLevelFromAllGames(games);

  const { recentHistory } = calculateRecentHistory(games);

  const historyDayClicked = (achievements) => {
    dispatch(setShowHistoryModal(achievements));
  };

  return (
    <Container onClick={() => {}}>
      <LevelFragment>
        <Header>
          <HiOutlineChevronDoubleUp
            style={{ marginRight: "0.5rem", color: "#6cff5c" }}
          />
          <Title>HISTORY</Title>
          <HiOutlineChevronDoubleUp
            style={{ marginLeft: "0.5rem", color: "#6cff5c" }}
          />
        </Header>
        <HistoryContainer>
          {Object.keys(recentHistory).map((key, index) => {
            return (
              <HistoryItem
                transparent={recentHistory[key].length == 0}
                id={index}
                current={false}
                onClick={() => {
                  historyDayClicked(
                    recentHistory[key] ?? 0,
                    recentHistory[key][0]?.unlocktime ?? ""
                  );
                }}
              >
                {recentHistory[key].length}
              </HistoryItem>
            );
          })}
        </HistoryContainer>
      </LevelFragment>
    </Container>
  );
};

export default ProfileHistoryGraph;
