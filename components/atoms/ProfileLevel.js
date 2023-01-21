import React, { useEffect, useState } from "react";
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
  XP_FOR_LEVEL,
} from "../../helpers/xpHelper";
import { PLAYER_LEVEL_KEY } from "../ui/header/GameHeader";

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
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
`;

const LevelUp = styled.div`
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
  margin-right: 1.5rem;
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
  justify-content: center;
  font-size: 1.75rem;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 1.75rem;
`;

const ProfileLevel = (props) => {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, planner } = steamtracker;

  const { xpTotal, toNextLevel, unlockedAll } =
    calculateLevelFromAllGames(games);

  const currentLevel = Math.floor(xpTotal / XP_FOR_LEVEL);

  const [levelInStorage, setLevelInStorage] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let levelInStorage = localStorage.getItem(PLAYER_LEVEL_KEY) || 0;
      setLevelInStorage(levelInStorage);
    }
  }, []);

  const resetlevelInStorage = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        PLAYER_LEVEL_KEY,
        Math.floor(xpTotal / XP_FOR_LEVEL)
      );
      setLevelInStorage(Math.floor(xpTotal / XP_FOR_LEVEL));
    }
  };

  return (
    <Container onClick={() => {}}>
      <LevelFragment>
        <Header>
          <HiOutlineChevronDoubleUp
            style={{ marginRight: "0.5rem", color: "#6cff5c" }}
          />
          <Title>LEVEL</Title>
          <HiOutlineChevronDoubleUp
            style={{ marginLeft: "0.5rem", color: "#6cff5c" }}
          />
        </Header>
        <LevelContainer>
          <GoldTrophy>
            <Icon
              style={{
                marginRight: "1rem",
              }}
            >
              {getIcon("medal")}
            </Icon>
            <Text>{currentLevel}</Text>
          </GoldTrophy>
          {levelInStorage < currentLevel && (
            <LevelUp onClick={resetlevelInStorage}>LEVEL UP</LevelUp>
          )}
        </LevelContainer>
      </LevelFragment>
    </Container>
  );
};

export default ProfileLevel;
