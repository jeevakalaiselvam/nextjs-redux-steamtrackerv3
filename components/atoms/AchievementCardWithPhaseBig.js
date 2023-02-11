import React, { useEffect, useState } from "react";
import { FaCheck, FaExpandArrowsAlt, FaGlobe } from "react-icons/fa";
import styled from "styled-components";
import { IoBook, IoChevronUp, IoEyeOff } from "react-icons/io5";
import { AiFillGold } from "react-icons/ai";

import { ALL, EASY, GRIND, HARD, MISSABLE } from "../../helpers/gameHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  setShowJournalRightSidebar,
  updatePhaseForAchievement,
} from "../../store/actions/games.actions";
import { HiChevronDoubleUp, HiMenu } from "react-icons/hi";
import JournalInput from "./JournalInput";
import { calculateXPFromPercentage } from "../../helpers/xpHelper";
import { getIcon } from "../../helpers/iconHelper";
import { HEADER_IMAGE } from "../../helpers/urlHelper";

const Container = styled.div`
  display: flex;
  align-items: center;
  z-index: 10000;
  justify-content: center;
  flex-direction: column;
  position: relative;
  opacity: ${(props) =>
    props.achieved == 1 && props.activateCompletionOpacity ? "0.1" : "1.0"};
`;

const MainContainer = styled.div`
  width: 365px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  min-height: 125px;
  cursor: pointer;
  border-radius: 4px;
  margin: 0.5rem;
  background: ${(props) => (props.icon ? `url("${props.icon}")` : "")};
  background-repeat: no-repeat;
  background-size: cover;
  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
`;

const IconContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 0.5rem 0;
  align-items: flex-start;
  justify-content: center;
  position: relative;
`;

const UnlockedContainer = styled.div`
  position: absolute;
  bottom: 0;
  color: #b0bec5;
  right: ${(props) => (props.achieved ? "5px" : "50px")};
  display: flex;
  z-index: 100000;
  padding: 0rem 1rem 1rem 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  opacity: 0.5;
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

const XPData = styled.div`
  display: flex;
  width: 100%;
  padding: 0.25rem 1rem;
  color: #b0bec5;
  align-items: center;
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
  max-width: 200px;
  align-self: center;
  padding: 0.5rem;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  font-size: 1.5rem;

  &:hover {
    color: #ffffff;
  }
`;

const Description = styled.div`
  display: flex;
  min-height: 50px;
  max-height: 50px;
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
  bottom: 1.5rem;
  left: 0;
  display: flex;
  padding: 0rem 1rem 1rem 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const PercentageContainer = styled.div`
  position: absolute;
  top: 5px;
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
  height: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
  color: #ffffff;
`;

const XPText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.25rem;
  color: #ffcc00;
`;

const XPIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  color: #ffcc00;
`;

export default function AchievementCardWithPhaseBig(props) {
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
  const { gameName } = props?.gameName || "";
  const gameId = props?.gameId || "";
  const activateCompletionOpacity = props.activateCompletionOpacity;

  const steamtracker = useSelector((state) => state.steamtracker);
  const { hiddenGames, games } = steamtracker;

  const [hiddenDescription, setHiddenDescription] = useState("HIDDEN");
  useEffect(() => {
    if (hiddenGames[gameId] && gameId) {
      setHiddenDescription(
        (old) => hiddenGames[gameId][displayName.toLowerCase().trim()]
      );
    }
  }, [gameId, hiddenGames]);

  const dispatch = useDispatch();

  const setPhaseForAchievement = (achievementName, phaseValue) => {
    if (props.achievement) {
      if (typeof window !== "undefined") {
        localStorage.setItem(`${gameId}_${achievementName}_PHASE`, phaseValue);
        dispatch(updatePhaseForAchievement(achievementName, phaseValue));
      }
    }
  };

  const game = games.find((game) => game.id == gameId);

  return (
    <Container
      achieved={achieved}
      activateCompletionOpacity={activateCompletionOpacity}
    >
      <MainContainer icon={icon}>
        <InnerContainer>
          <IconContainer>
            <Icon icon={achieved ? icon : icon}></Icon>
            <XPData>
              <XPText>{calculateXPFromPercentage(percentage)}</XPText>
              <XPIcon>{getIcon("xp")}</XPIcon>
            </XPData>
            {achieved == 1 && false && (
              <CheckContainer>
                <FaCheck />
              </CheckContainer>
            )}
          </IconContainer>
          <DataContainer>
            <Title
              onClick={() => {
                if (window !== "undefined") {
                  const searchQuery = `${displayName} achievement ${game.name} `;
                  window.open(`https://www.google.com/search?q=${searchQuery}`);
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
          {hidden == "1" && false && (
            <HiddenContainer>
              <IoEyeOff />
            </HiddenContainer>
          )}
        </InnerContainer>
      </MainContainer>
      {achieved == 1 && (
        <UnlockedContainer achieved={achieved}>
          {`${new Date(unlocktime * 1000).toString().slice(0, -40)}, ${new Date(
            unlocktime * 1000
          ).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}`}
        </UnlockedContainer>
      )}
    </Container>
  );
}
