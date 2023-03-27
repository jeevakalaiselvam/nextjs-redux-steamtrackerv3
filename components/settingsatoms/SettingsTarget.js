import { useRouter } from "next/router";
import React, { useState } from "react";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  COMMON,
  COMMON_COLOR,
  EPIC,
  EPIC_COLOR,
  LEGENDARY,
  LEGENDARY_COLOR,
  MARVEL,
  MARVEL_COLOR,
  RARE,
  RARE_COLOR,
  UNCOMMON,
  UNCOMMON_COLOR,
  WASTE,
  WASTE_COLOR,
} from "../../helpers/colorHelper";
import { GAMES_PAGE, GAME_PAGE } from "../../helpers/constantHelper";
import { getIcon } from "../../helpers/iconHelper";
import {
  COMMON_HIGHER,
  COMMON_LOWER,
  EPIC_HIGHER,
  EPIC_LOWER,
  LEGENDARY_HIGHER,
  LEGENDARY_LOWER,
  MARVEL_HIGHER,
  MARVEL_LOWER,
  RARE_HIGHER,
  RARE_LOWER,
  UNCOMMON_HIGHER,
  UNCOMMON_LOWER,
  WASTE_HIGHER,
  WASTE_LOWER,
} from "../../helpers/xpHelper";
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
  position: relative;
  justify-content: flex-start;
`;

const Inner = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  margin-right: 1rem;
  color: #fefefe;
  min-width: 50px;
  text-align: center;
  margin-left: 1rem;
  opacity: 0.5;
  justify-content: flex-end;
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

const Icon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 2rem;
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
            <Icon
              style={{
                marginRight: "1rem",
                color: WASTE_COLOR,
              }}
            >
              {getIcon("trophy")}
            </Icon>
            <SettingTitle>
              WASTE<Inner>({`${WASTE_LOWER} - ${WASTE_HIGHER}`})</Inner>
            </SettingTitle>
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
            {" "}
            <Icon
              style={{
                marginRight: "1rem",
                color: COMMON_COLOR,
              }}
            >
              {getIcon("trophy")}
            </Icon>
            <SettingTitle>
              COMMON<Inner>({`${COMMON_LOWER} - ${COMMON_HIGHER}`})</Inner>
            </SettingTitle>
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
            {" "}
            <Icon
              style={{
                marginRight: "1rem",
                color: UNCOMMON_COLOR,
              }}
            >
              {getIcon("trophy")}
            </Icon>
            <SettingTitle>
              UNCOMMON
              <Inner>({`${UNCOMMON_LOWER} - ${UNCOMMON_HIGHER}`})</Inner>
            </SettingTitle>
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
            {" "}
            <Icon
              style={{
                marginRight: "1rem",
                color: RARE_COLOR,
              }}
            >
              {getIcon("trophy")}
            </Icon>
            <SettingTitle>
              RARE<Inner>({`${RARE_LOWER} - ${RARE_HIGHER}`})</Inner>
            </SettingTitle>
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
            {" "}
            <Icon
              style={{
                marginRight: "1rem",
                color: EPIC_COLOR,
              }}
            >
              {getIcon("trophy")}
            </Icon>
            <SettingTitle>
              EPIC<Inner>({`${EPIC_LOWER} - ${EPIC_HIGHER}`})</Inner>
            </SettingTitle>
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
            {" "}
            <Icon
              style={{
                marginRight: "1rem",
                color: LEGENDARY_COLOR,
              }}
            >
              {getIcon("trophy")}
            </Icon>
            <SettingTitle>
              LEGENDARY
              <Inner>({`${LEGENDARY_LOWER} - ${LEGENDARY_HIGHER}`})</Inner>
            </SettingTitle>
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
            {" "}
            <Icon
              style={{
                marginRight: "1rem",
                color: MARVEL_COLOR,
              }}
            >
              {getIcon("trophy")}
            </Icon>
            <SettingTitle>
              MARVEL<Inner>({`${MARVEL_LOWER} - ${MARVEL_HIGHER}`})</Inner>
            </SettingTitle>
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
