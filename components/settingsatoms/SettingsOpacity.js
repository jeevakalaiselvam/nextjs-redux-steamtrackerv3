import { useRouter } from "next/router";
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
import { GAME_PAGE } from "../../helpers/constantHelper";
import { getIcon } from "../../helpers/iconHelper";
import {
  calculateLevelFromAllGames,
  calculateTotalXPForAllGames,
  XP_FOR_LEVEL,
} from "../../helpers/xpHelper";
import { setOpacityForUnlockedAchievement } from "../../store/actions/games.actions";
import { PLAYER_LEVEL_KEY } from "../ui/header/GameHeader";

const Container = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  align-items: center;
  padding: 1rem;
  justify-content: center;
  margin: 0.5rem;
  flex-direction: column;
  width: 95%;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
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
  width: 100%;
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
  color: #ffcc00;
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
  font-size: 2rem;
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > input {
    width: 100px;
    color: #333;
    margin-bottom: 1rem;
  }
`;

const Save = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #3049d1;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
  padding: 0.5rem 1rem;
  border-radius: 2px;

  &:hover {
    color: #fefefe;
    background-color: #3049d1;
    opacity: 1;
  }
`;

const SettingsOpacity = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings, lastSelectedGame } = steamtracker;
  const { settingsPage } = settings;

  const { xpTotal } = calculateLevelFromAllGames(games);

  const [achievementUnlockedOpacity, setAchievementUnlockedOpacity] = useState(
    settingsPage?.unlockedAchievementOpacity ?? 0.2
  );

  const setOpacity = () => {
    dispatch(setOpacityForUnlockedAchievement(achievementUnlockedOpacity));
    if (lastSelectedGame) {
      if (props.type == GAME_PAGE) {
        router.push(`/games/${lastSelectedGame}`);
      }
    }
  };

  return (
    <Container onClick={() => {}}>
      <LevelFragment>
        <Header>
          <HiOutlineChevronDoubleUp
            style={{ marginRight: "0.5rem", color: "#6cff5c" }}
          />
          <Title>Hide Unlocked Achievement</Title>
          <HiOutlineChevronDoubleUp
            style={{ marginLeft: "0.5rem", color: "#6cff5c" }}
          />
        </Header>
        <LevelContainer>
          <OptionContainer>
            <input
              type="number"
              min={0}
              max={1}
              step={0.1}
              value={achievementUnlockedOpacity}
              onChange={(e) => {
                setAchievementUnlockedOpacity(e.target.value);
              }}
            />
          </OptionContainer>
          <Save onClick={setOpacity}>SAVE</Save>
        </LevelContainer>
      </LevelFragment>
    </Container>
  );
};

export default SettingsOpacity;
