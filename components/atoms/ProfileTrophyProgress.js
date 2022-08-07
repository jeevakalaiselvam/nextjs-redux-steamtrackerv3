import React from "react";
import { BsFillArrowDownRightSquareFill } from "react-icons/bs";
import { FaTrophy } from "react-icons/fa";
import {
  HiFastForward,
  HiOutlineArrowNarrowDown,
  HiOutlineChevronDoubleUp,
  HiOutlineChevronUp,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getAllUnlockedAchievements,
  getAllUnlockedAchievementsTodayAndYesterday,
} from "../../helpers/achievementHelper";
import { openLinkInNewTab } from "../../helpers/browserHelper";
import { getIcon } from "../../helpers/iconHelper";
import {
  calculateLevelFromAllGames,
  calculateTotalXPForAllGames,
  calculateXPFromPercentage,
  XP_FOR_LEVEL,
} from "../../helpers/xpHelper";

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
  display: flex;
  align-items: center;
  width: 100px;
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
  flex-direction: column;
  justify-content: center;
  margin-right: 2rem;
  color: #f1b51b;
  font-size: 2rem;
`;

const PurpleTrophy = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  color: #b55af2;
  font-size: 1.5rem;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-right: 1rem;
  justify-content: center;
  font-size: 1.5rem;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;
`;

const LevelItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-size: 1.5rem;
`;

const ProfileTrophyProgress = (props) => {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, planner } = steamtracker;

  const { xpTotal, currentLevel, toNextLevel } =
    calculateLevelFromAllGames(games);

  const { allAchievementsToday } =
    getAllUnlockedAchievementsTodayAndYesterday(games);
  const { allAchievementsYesterday } =
    getAllUnlockedAchievementsTodayAndYesterday(games);

  const totalXPToday = allAchievementsToday.reduce((acc, achievement) => {
    return acc + calculateXPFromPercentage(achievement.percentage);
  }, 0);
  const totalXPUntilYesterday = allAchievementsYesterday.reduce(
    (acc, achievement) => {
      return acc + calculateXPFromPercentage(achievement.percentage);
    },
    0
  );

  return (
    <Container onClick={() => {}}>
      <LevelFragment>
        <Header>
          <HiOutlineChevronDoubleUp
            style={{ marginRight: "0.5rem", color: "#6cff5c" }}
          />
          <Title>PROGRESS</Title>
          <HiOutlineChevronDoubleUp
            style={{ marginLeft: "0.5rem", color: "#6cff5c" }}
          />
        </Header>
        <LevelContainer>
          <GoldTrophy>
            <LevelItem>
              <Icon>{getIcon("trophy")}</Icon>
              <Text>{Math.floor(totalXPUntilYesterday / XP_FOR_LEVEL)}</Text>
            </LevelItem>
            <HiOutlineArrowNarrowDown />
            {new Array(
              Math.floor(
                (totalXPUntilYesterday + totalXPToday) / XP_FOR_LEVEL
              ) - Math.floor(totalXPUntilYesterday / XP_FOR_LEVEL)
            )
              .fill(1)
              .map((level, index) => {
                return (
                  <>
                    <LevelItem>
                      <Icon>{getIcon("trophy")}</Icon>
                      <Text>
                        {" "}
                        {Math.floor(totalXPUntilYesterday / XP_FOR_LEVEL) +
                          index +
                          1}
                      </Text>
                    </LevelItem>
                  </>
                );
              })}
          </GoldTrophy>
        </LevelContainer>
      </LevelFragment>
    </Container>
  );
};

export default ProfileTrophyProgress;
