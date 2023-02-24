import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COMMON,
  EPIC,
  LEGENDARY,
  MARVEL,
  RARE,
  UNCOMMON,
  WASTE,
} from "../../helpers/colorHelper";
import { GAMES_PAGE, GAME_PAGE } from "../../helpers/constantHelper";
import {
  setCompletionPercentageTarget,
  setOpacityForUnlockedAchievement,
  setTargetInfo,
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
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
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

const SettingTitle = styled.div`
  display: flex;
  min-width: 200px;
  align-items: center;
  margin-right: 1rem;
  justify-content: flex-start;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > input {
    width: 100px;
    color: #333;
    outline: none;
  }
`;

const SettingsTarget = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { settings, lastSelectedGame, targetSettings } = steamtracker;
  const { settingsPage } = settings;

  const [completionPercentage, setCompletionPercentage] = useState(
    settingsPage?.completionPercentageTarget ?? 100
  );

  const setTarget = () => {
    dispatch(setTargetInfo(targetRarity));
    if (lastSelectedGame) {
      if (props.type == GAME_PAGE) {
        router.push(`/games/${lastSelectedGame}`);
      } else if (props.type == GAMES_PAGE) {
        router.push(`/games`);
      }
    }
  };

  const [targetRarity, setTargetRarity] = useState(targetSettings);

  const {
    WASTE_TARGET,
    COMMON_TARGET,
    UNCOMMON_TARGET,
    RARE_TARGET,
    EPIC_TARGET,
    LEGENDARY_TARGET,
    MARVEL_TARGET,
  } = targetRarity;

  const setTargetForRarityInfo = (rarityInfo) => {
    let newRarity = {
      ...targetRarity,
      [rarityInfo.type + "_TARGET"]: Number(rarityInfo.value),
    };
    console.log("NEW RARITY", { newRarity });
    setTargetRarity(newRarity);
  };

  return (
    <Container onClick={() => {}}>
      <LevelFragment>
        <Header>
          <HiOutlineChevronDoubleUp
            style={{ marginRight: "0.5rem", color: "#6cff5c" }}
          />
          <Title>Targets</Title>
          <HiOutlineChevronDoubleUp
            style={{ marginLeft: "0.5rem", color: "#6cff5c" }}
          />
        </Header>
        <LevelContainer>
          <OptionContainer>
            <SettingTitle>WASTE TARGET</SettingTitle>
            <InputWrapper>
              <input
                type="number"
                min={1}
                max={100}
                step={1}
                value={WASTE_TARGET}
                onChange={(e) => {
                  setTargetForRarityInfo({
                    type: WASTE,
                    value: e.target.value,
                  });
                }}
              />
            </InputWrapper>
          </OptionContainer>
          <OptionContainer>
            <SettingTitle>UNCOMMON TARGET</SettingTitle>
            <InputWrapper>
              <input
                type="number"
                min={1}
                max={100}
                step={1}
                value={UNCOMMON_TARGET}
                onChange={(e) => {
                  setTargetForRarityInfo({
                    type: UNCOMMON,
                    value: e.target.value,
                  });
                }}
              />
            </InputWrapper>
          </OptionContainer>
          <OptionContainer>
            <SettingTitle>COMMON TARGET</SettingTitle>
            <InputWrapper>
              <input
                type="number"
                min={1}
                max={100}
                step={1}
                value={COMMON_TARGET}
                onChange={(e) => {
                  setTargetForRarityInfo({
                    type: COMMON,
                    value: e.target.value,
                  });
                }}
              />
            </InputWrapper>
          </OptionContainer>
          <OptionContainer>
            <SettingTitle>RARE TARGET</SettingTitle>
            <InputWrapper>
              <input
                type="number"
                min={1}
                max={100}
                step={1}
                value={RARE_TARGET}
                onChange={(e) => {
                  setTargetForRarityInfo({
                    type: RARE,
                    value: e.target.value,
                  });
                }}
              />
            </InputWrapper>
          </OptionContainer>
          <OptionContainer>
            <SettingTitle>EPIC TARGET</SettingTitle>
            <InputWrapper>
              <input
                type="number"
                min={1}
                max={100}
                step={1}
                value={EPIC_TARGET}
                onChange={(e) => {
                  setTargetForRarityInfo({
                    type: EPIC,
                    value: e.target.value,
                  });
                }}
              />
            </InputWrapper>
          </OptionContainer>
          <OptionContainer>
            <SettingTitle>LEGENDARY TARGET</SettingTitle>
            <InputWrapper>
              <input
                type="number"
                min={1}
                max={100}
                step={1}
                value={LEGENDARY_TARGET}
                onChange={(e) => {
                  setTargetForRarityInfo({
                    type: LEGENDARY,
                    value: e.target.value,
                  });
                }}
              />
            </InputWrapper>
          </OptionContainer>
          <OptionContainer>
            <SettingTitle>MARVEL TARGET</SettingTitle>
            <InputWrapper>
              <input
                type="number"
                min={1}
                max={100}
                step={1}
                value={MARVEL_TARGET}
                onChange={(e) => {
                  setTargetForRarityInfo({
                    type: MARVEL,
                    value: e.target.value,
                  });
                }}
              />
            </InputWrapper>
          </OptionContainer>
          <Save onClick={setTarget}>SAVE</Save>
        </LevelContainer>
      </LevelFragment>
    </Container>
  );
};

export default SettingsTarget;
