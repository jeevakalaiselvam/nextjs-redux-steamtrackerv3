import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { GAMES_PAGE, GAME_PAGE } from "../../helpers/constantHelper";
import {
  setCompletionPercentageTarget,
  setOpacityForUnlockedAchievement,
} from "../../store/actions/games.actions";

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

const SettingsCompletion = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { settings, lastSelectedGame } = steamtracker;
  const { settingsPage } = settings;

  const [completionPercentage, setCompletionPercentage] = useState(
    settingsPage?.completionPercentageTarget ?? 100
  );

  const setTarget = () => {
    dispatch(setCompletionPercentageTarget(completionPercentage));
    if (lastSelectedGame) {
      if (props.type == GAME_PAGE) {
        router.push(`/games/${lastSelectedGame}`);
      } else if (props.type == GAMES_PAGE) {
        router.push(`/games`);
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
          <Title>Completion Percentage</Title>
          <HiOutlineChevronDoubleUp
            style={{ marginLeft: "0.5rem", color: "#6cff5c" }}
          />
        </Header>
        <LevelContainer>
          <OptionContainer>
            <input
              type="number"
              min={1}
              max={100}
              step={1}
              value={completionPercentage}
              onChange={(e) => {
                setCompletionPercentage(e.target.value);
              }}
            />
          </OptionContainer>
          <Save onClick={setTarget}>SAVE</Save>
        </LevelContainer>
      </LevelFragment>
    </Container>
  );
};

export default SettingsCompletion;
