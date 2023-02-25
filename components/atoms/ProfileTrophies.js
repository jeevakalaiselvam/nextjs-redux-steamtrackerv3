import React from "react";
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

const Container = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
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
  flex-direction: row;
  justify-content: center;
  margin-right: 2rem;
  color: #ffcc00;
  margin-left: 1rem;
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
  font-size: 2rem;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 1.75rem;
`;

const ProfileTrophies = (props) => {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, planner } = steamtracker;

  const { xpTotal, currentLevel, toNextLevel, unlockedAll } =
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
          <Title>TROPHIES</Title>
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
              {getIcon("trophy")}
            </Icon>
            <Text>{unlockedAll}</Text>
          </GoldTrophy>
        </LevelContainer>
      </LevelFragment>
    </Container>
  );
};

export default ProfileTrophies;
