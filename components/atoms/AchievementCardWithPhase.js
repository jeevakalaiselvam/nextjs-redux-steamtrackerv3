import React, { useEffect, useState } from "react";
import { FaCheck, FaExpandArrowsAlt, FaGlobe, FaTrophy } from "react-icons/fa";
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
import {
  calculateXPFromPercentage,
  getRarityColorFromPercentage,
  getRarityTextFromPercentage,
} from "../../helpers/xpHelper";
import { getIcon } from "../../helpers/iconHelper";

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
  flex-direction: row;
  padding: 0.5rem 1rem;
  align-items: flex-start;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  margin: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

const JournalContainer = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  transition: 0.5s all;
  min-height: ${(props) => (props.show ? "500px" : "0px")};
  align-items: flex-start;
  top: 0;
  left: 0;
  height: 500px;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
  color: #b0bec5;
  backdrop-filter: blur(2px);
  z-index: 100000;
  width: 100%;
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
  padding: 0.5rem 1rem;
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
  align-self: flex-start;
  padding: 0.5rem;
  flex-direction: row;
  font-weight: bolder;
  align-items: flex-start;
  justify-content: flex-start;
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
  font-weight: bold;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  color: #b0bec5;
  font-size: 1.5rem;
`;

const JournalOneline = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0.5rem;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-start;
  color: #b0bec5;
  font-size: 1.5rem;
  opacity: 0.5;
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const RarityIcon = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0.5rem;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  color: ${(props) => (props.color ? props.color : "")};
  font-size: 1.5rem;
`;

const RarityText = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  color: ${(props) => (props.color ? props.color : "")};
  font-size: 0.75rem;
`;

const TrophyIcon = styled.div`
  width: 20px;
  height: 20px;
  background: url("/goldNew.png");
  background-size: contain;
  background-repeat: no-repeat;
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

const PhaseRevealer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 7px;
  left: 0;
  color: ${(props) => (props.active ? "#6cff5c" : "#737c9d;")};
  padding: 0rem 0.5rem;
  margin: 0.5rem;
  z-index: 10000000;
  font-size: 1.5rem;
  &:hover {
    color: #6cff5c;
  }
`;

const PhaseContainer = styled.div`
  position: absolute;
  bottom: 7px;
  right: 0;
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  padding-right: 0.5rem;
`;

const PhaseItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.active ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.5)"};
  color: ${(props) => (props.active ? "#FFFFFF" : "#737c9d;")};
  padding: 0rem 0.5rem;
  margin: 0.25rem 0.5rem 0.25rem 0.25rem;
  opacity: 0.5;

  &:hover {
    color: #ffffff;
  }
`;

const PhaseItemIgnore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.active ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.5)"};
  color: ${(props) => (props.active ? "#bd2a2e" : "#737c9d;")};
  padding: 0rem 0.5rem;
  margin: 0.25rem;

  &:hover {
    color: #ff4858;
  }
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
  const { gameName } = props?.gameName || "";
  const currentPhase = props?.phase || "";
  const gameId = props?.gameId || "";
  const showIgnore = props.showIgnore;
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

  const [showPhases, setShowPhases] = useState(false);

  const [showJournal, setShowJournal] = useState(false);
  const [journalData, setJournalData] = useState("");

  const onDataSaved = (journalData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${gameId}_${name}_JOURNAL`, journalData);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const journalDataInStore = localStorage.getItem(
        `${gameId}_${name}_JOURNAL`
      );
      if (!journalDataInStore) setJournalData((old) => "");
      else setJournalData((old) => journalDataInStore);
    }
  }, [showJournal]);

  const addToIgnoreList = () => {
    if (typeof window !== "undefined") {
      if (ignoreActive) {
        let ignoreListInStorage =
          localStorage.getItem(`${gameId}_IGNORE`) || JSON.stringify([]);
        let ignoredAchievements = JSON.parse(ignoreListInStorage);
        ignoredAchievements = ignoredAchievements.filter(
          (achName) => achName !== name
        );

        localStorage.setItem(
          `${gameId}_IGNORE`,
          JSON.stringify(ignoredAchievements)
        );
        setIgnoreActive((old) => false);
      } else {
        let ignoreListInStorage =
          localStorage.getItem(`${gameId}_IGNORE`) || JSON.stringify([]);
        let ignoredAchievements = JSON.parse(ignoreListInStorage);
        ignoredAchievements = [...ignoredAchievements, name];

        localStorage.setItem(
          `${gameId}_IGNORE`,
          JSON.stringify(ignoredAchievements)
        );
        setIgnoreActive((old) => true);
      }
    }
  };

  const [ignoreActive, setIgnoreActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let ignoreListInStorage =
        localStorage.getItem(`${gameId}_IGNORE`) || JSON.stringify([]);
      let ignoredAchievements = JSON.parse(ignoreListInStorage);
      setIgnoreActive((old) => ignoredAchievements.includes(name));
    }
  }, [gameId, name]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let ignoreListInStorage =
        localStorage.getItem(`${gameId}_IGNORE`) || JSON.stringify([]);
      let ignoredAchievements = JSON.parse(ignoreListInStorage);
      setIgnoreActive((old) => ignoredAchievements.includes(name));
    }
  }, []);

  return (
    <Container
      achieved={achieved}
      activateCompletionOpacity={activateCompletionOpacity}
    >
      <MainContainer>
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
                // window.open(`https://www.youtube.com/results?search_query=${searchQuery}`);
              }
            }}
          >
            {displayName}
          </Title>
          <Description>{description || hiddenDescription}</Description>
        </DataContainer>
        <PercentageContainer>
          {/* <PercentageIcon>
            <FaGlobe />
          </PercentageIcon>
          <PercentageText>{percentage.toFixed(2)}%</PercentageText> */}
          <RarityIcon color={getRarityColorFromPercentage(percentage)}>
            <FaTrophy />
          </RarityIcon>
          <RarityText>{getRarityTextFromPercentage(percentage)}</RarityText>
        </PercentageContainer>
        {hidden == "1" && false && (
          <HiddenContainer>
            <IoEyeOff />
          </HiddenContainer>
        )}
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
