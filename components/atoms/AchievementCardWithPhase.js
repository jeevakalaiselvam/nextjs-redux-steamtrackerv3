import React from "react";
import { FaCheck, FaGlobe } from "react-icons/fa";
import styled from "styled-components";
import { IoEyeOff } from "react-icons/io5";
import { getFormattedDate } from "../../helpers/achievementHelper";
import {
  ALL,
  EASY,
  GRIND,
  HARD,
  MISSABLE,
  updateAchievementPhaseForGame,
} from "../../helpers/gameHelper";
import { useDispatch } from "react-redux";
import { updatePhaseForAchievement } from "../../store/actions/games.actions";

const Container = styled.div`
  width: 365px;
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: row;
  padding: 0.5rem 1rem;
  align-items: flex-start;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  margin: 0.5rem;
  min-height: 120px;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

const IconContainer = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  flex-direction: row;
  padding: 0.5rem 0;
  align-items: flex-start;
  justify-content: center;
  position: relative;
`;

const Icon = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  background: url(${(props) => props.icon});
  background-size: contain;
  background-repeat: no-repeat;
  flex-direction: row;
  padding: 0.5rem;
  align-items: flex-start;
  justify-content: center;
`;

const DataContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 0rem 1rem 0rem 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.div`
  display: flex;
  flex: 1;
  max-width: 150px;
  align-self: flex-start;
  padding: 0.5rem;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 1.5rem;
  word-wrap: break-word;

  &:hover {
    color: #ffffff;
  }
`;

const Description = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0.5rem;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  color: #b0bec5;
  font-size: 1.5rem;
`;

const HiddenContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  padding: 0rem 1rem 1rem 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const PercentageContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  padding: 0rem 1rem 1rem 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const PercentageText = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0.5rem;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  color: #b0bec5;
  font-size: 1.5rem;
`;

const PercentageIcon = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0.5rem;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  color: #b0bec5;
  font-size: 1.5rem;
`;

const CheckContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
  color: #6cff5c;
`;

const PhaseContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PhaseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.active ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.5)"};
  color: ${(props) => (props.active ? "#6cff5c" : "#737c9d;")};
  padding: 0rem 0.5rem;
  margin: 0.25rem;

  &:hover {
    color: #6cff5c;
  }
`;

export default function AchievementCardWithPhase(props) {
  const {
    name,
    hidden,
    icon,
    icongray,
    percentage,
    achieved,
    unlocktime,
    displayName,
    description,
    phase,
  } = props.achievement;
  const hiddenDescription = props?.hiddenDescription || "";
  const { gameName } = props?.gameName || "";
  const currentPhase = props?.phase || "";
  const gameId = props?.gameId || "";

  const dispatch = useDispatch();

  const setPhaseForAchievement = (achievementName, phaseValue) => {
    if (props.achievement) {
      if (typeof window !== "undefined") {
        localStorage.setItem(`${gameId}_${achievementName}_PHASE`, phaseValue);
        dispatch(updatePhaseForAchievement(achievementName, phaseValue));
      }
    }
  };

  return (
    <Container show={currentPhase == phase}>
      <IconContainer>
        <Icon icon={icon}></Icon>
        {achieved == 1 && (
          <CheckContainer>
            <FaCheck />
          </CheckContainer>
        )}
      </IconContainer>
      <DataContainer>
        <Title
          onClick={() => {
            if (window !== "undefined") {
              const searchQuery = `${displayName} achievement ${gameName} `;
              window.open(`https://www.google.com/search?q=${searchQuery}`);
              // window.open(`https://www.youtube.com/results?search_query=${searchQuery}`);
            }
          }}
        >
          {displayName}
        </Title>
        <Description>{description || hiddenDescription}</Description>
      </DataContainer>
      <PercentageContainer>
        <PercentageIcon>
          <FaGlobe />
        </PercentageIcon>
        <PercentageText>{percentage.toFixed(2)}%</PercentageText>
      </PercentageContainer>
      {hidden == "1" && (
        <HiddenContainer>
          <IoEyeOff />
        </HiddenContainer>
      )}
      <PhaseContainer>
        <PhaseItem
          active={phase == ALL}
          onClick={() => {
            setPhaseForAchievement(name, ALL);
          }}
        >
          1
        </PhaseItem>
        <PhaseItem
          active={phase == EASY}
          onClick={() => {
            setPhaseForAchievement(name, EASY);
          }}
        >
          2
        </PhaseItem>
        <PhaseItem
          active={phase == HARD}
          onClick={() => {
            setPhaseForAchievement(name, HARD);
          }}
        >
          3
        </PhaseItem>
        <PhaseItem
          active={phase == GRIND}
          onClick={() => {
            setPhaseForAchievement(name, GRIND);
          }}
        >
          4
        </PhaseItem>
        <PhaseItem
          active={phase == MISSABLE}
          onClick={() => {
            setPhaseForAchievement(name, MISSABLE);
          }}
        >
          5
        </PhaseItem>
      </PhaseContainer>
    </Container>
  );
}
