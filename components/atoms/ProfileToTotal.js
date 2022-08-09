import { useRouter } from "next/router";
import React from "react";
import { AiFillGold } from "react-icons/ai";
import { FaTrophy } from "react-icons/fa";
import {
  HiFastForward,
  HiOutlineChevronDoubleUp,
  HiOutlineChevronUp,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { openLinkInNewTab } from "../../helpers/browserHelper";
import { getIcon } from "../../helpers/iconHelper";
import {
  calculateLevelFromAllGames,
  calculateTotalXPForAllGames,
  COMPLETION_TARGET,
  getAllXPFromAchievements,
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
  justify-content: center;
  width: 100px;
  font-size: 1.5rem;
`;

const LevelContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const CurrentLevel = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;
  padding: 1rem;
`;

const XPContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  z-index: 8;
  padding: 1rem;
  transition: all 0.5s;
  transform: translateX("0%");
`;

const XPData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fefefe;
  z-index: 8;
  font-size: 1.5rem;
`;

const XPText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1b51b;
`;

const XPIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1b51b;
  margin-left: -1rem;
  margin-right: 0.75rem;
  font-size: 2rem;
`;

const ProfileToTotal = (props) => {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, planner } = steamtracker;
  const { phaseAddedGame } = planner;

  const router = useRouter();
  const { gameId } = router.query;

  const game = games.find((game) => game.id == gameId);
  const { id, playtime, name, version, achievements, completion, toGet } = game;

  const xpData = getAllXPFromAchievements(phaseAddedGame.achievements);
  const { totalXP, completedXP, remainingXP } = xpData;

  const completed = completedXP / XP_FOR_LEVEL;
  const needed = (totalXP * COMPLETION_TARGET) / XP_FOR_LEVEL;

  return (
    <Container onClick={() => {}}>
      <LevelFragment>
        <Header>
          <HiOutlineChevronDoubleUp
            style={{ marginRight: "0.5rem", color: "#6cff5c" }}
          />
          <Title>TOTAL</Title>
          <HiOutlineChevronDoubleUp
            style={{ marginLeft: "0.5rem", color: "#6cff5c" }}
          />
        </Header>
        <LevelContainer>
          <XPContainer>
            <XPData>
              <XPIcon>{getIcon("xp")}</XPIcon>
              <XPText>{totalXP}</XPText>
            </XPData>
          </XPContainer>
        </LevelContainer>
      </LevelFragment>
    </Container>
  );
};

export default ProfileToTotal;
