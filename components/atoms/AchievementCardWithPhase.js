import React, { useEffect, useState } from "react";
import { FaCheck, FaExpandArrowsAlt, FaGlobe, FaTrophy } from "react-icons/fa";
import styled from "styled-components";
import { IoBook, IoChevronUp, IoEyeOff } from "react-icons/io5";
import { AiFillGold } from "react-icons/ai";

import { ALL, EASY, GRIND, HARD, MISSABLE } from "../../helpers/gameHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  addPinAchievement,
  removePinAchievement,
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
import {
  UNCOMMON_COLOR,
  COMMON_COLOR,
  MARVEL_COLOR,
} from "../../helpers/colorHelper";
import { removePinnedAchievement } from "../../helpers/achievementHelper";

const Container = styled.div`
  width: ${(props) => (props.width ? props.width : "365px")};
  display: flex;
  align-items: center;
  z-index: 10000;
  justify-content: center;
  flex-direction: column;
  position: relative;
  margin: 0.5rem;
  height: 125px;
  opacity: ${(props) =>
    props.achieved == 1 && props.activateCompletionOpacity
      ? props.opacity
      : "1.0"};

  animation: ${(props) =>
    props.animateRight ? `animateRight 0.25s linear` : ""};

  @keyframes animateRight {
    from {
      -ms-transform: translateX(-100px);
      -moz-transform: translateX(-100px);
      -webkit-transform: translateX(-100px);
      -o-transform: translateX(-100px);
      transform: translateX(-100px);
    }
    to {
      -ms-transform: translateX(0px);
      -moz-transform: translateX(0px);
      -webkit-transform: translateX(0px);
      -o-transform: translateX(0px);
      transform: translateX(0px);
    }
  }
`;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0.5rem 1rem;
  align-items: flex-start;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  cursor: pointer;
  height: 125px;
  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }
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
  min-height: 65px;
  max-height: 65px;
  width: 100%;
  padding: 0.5rem;
  font-weight: bold;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  color: #b0bec5;
  font-size: 1.4rem;
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

const PinnedStatusContainer = styled.div`
  position: absolute;
  bottom: 8px;
  left: 1rem;
  width: 60px;
  font-size: 1rem;
  color: ${(props) => (props.pinColor ? props.pinColor : "#FEFEFE")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PercentageContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  display: flex;
  padding: 0rem 1rem 1rem 1rem;
  flex-direction: column;
  flex-direction: row;
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
  font-size: 1.75rem;
`;

const RarityText = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  color: ${(props) => (props.color ? props.color : "")};
  font-size: 1.15rem;
`;

const TrophyIcon = styled.div`
  width: 20px;
  height: 20px;
  background: url("/goldNew.png");
  background-size: contain;
  background-repeat: no-repeat;
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
  const {
    width,
    hideUnlock,
    animateRight,
    index,
    hidePinned = false,
    showPhase,
  } = props;
  const gameId = props?.gameId || "";
  const activateCompletionOpacity = props.activateCompletionOpacity;

  const steamtracker = useSelector((state) => state.steamtracker);
  const { hiddenGames, games, settings, pinnedAchievements, lastUnlockedTime } =
    steamtracker;
  const { settingsPage } = settings;

  const [hiddenDescription, setHiddenDescription] = useState("HIDDEN");

  useEffect(() => {
    if (hiddenGames[gameId] && gameId) {
      setHiddenDescription(
        (old) => hiddenGames[gameId][displayName?.toLowerCase().trim()]
      );
    }
  }, [gameId, hiddenGames]);

  const dispatch = useDispatch();

  const game = games.find((game) => game.id == gameId);

  const [showJournal, setShowJournal] = useState(false);
  const [pinned, setPinned] = useState(
    pinnedAchievements[gameId]?.includes(name)
  );

  useEffect(() => {}, []);

  useEffect(() => {
    if (gameId) {
      if (pinnedAchievements[gameId]?.includes(name)) {
        setPinned(true);
      } else {
        setPinned(false);
      }
    }
  }, [gameId, pinnedAchievements]);

  const [pinnedText, setPinnedText] = useState(pinned ? "PINNED" : "UNPINNED");
  const [pinColor, setPinColor] = useState(
    pinned ? UNCOMMON_COLOR : COMMON_COLOR
  );

  const onPinMouseEnter = () => {
    setPinnedText(pinned ? "UNPIN" : "PIN IT");
  };
  const onPinMouseLeave = () => {
    setPinnedText(pinned ? "PINNED" : "UNPINNED");
  };

  useEffect(() => {
    setPinnedText(pinned ? "PINNED" : "UNPINNED");
    setPinColor(pinned ? UNCOMMON_COLOR : COMMON_COLOR);
  }, [pinned]);

  useEffect(() => {
    if (pinnedText == "PINNED" || pinnedText == "PIN IT") {
      setPinColor(UNCOMMON_COLOR);
    } else if (pinnedText == "UNPIN") {
      setPinColor(MARVEL_COLOR);
    } else {
      setPinColor(COMMON_COLOR);
    }
  }, [pinnedText]);

  const addOrRemovePinStatus = () => {
    if (pinned) {
      dispatch(removePinAchievement({ gameId: gameId, achievementId: name }));
    } else {
      dispatch(addPinAchievement({ gameId: gameId, achievementId: name }));
    }
  };

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
    color: ${(props) => (props.active ? "#FFFFFF" : "#737c9d")};
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    margin: 1rem 0.5rem 0.25rem 0.25rem;
    opacity: ${(props) => (props.active ? "1.0" : "0.25")};
    font-size: 1rem;
    &:hover {
      color: #fefefe;
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

  const setPhaseForAchievement = (achievementName, phaseValue) => {
    if (props.achievement) {
      dispatch(updatePhaseForAchievement(achievementName, phaseValue));
    }
  };

  return (
    <Container
      index={index}
      animateRight={animateRight}
      width={width}
      achieved={achieved}
      activateCompletionOpacity={activateCompletionOpacity}
      opacity={settingsPage?.unlockedAchievementOpacity}
      onClick={() => {
        dispatch(setShowJournalRightSidebar(props.achievement));
      }}
    >
      <MainContainer>
        <IconContainer>
          <Icon icon={achieved ? icon : icon}></Icon>
          {false && (
            <XPData>
              <XPText>{calculateXPFromPercentage(percentage)}</XPText>
              <XPIcon>{getIcon("xp")}</XPIcon>
            </XPData>
          )}
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
          <Description>
            {description &&
              !hiddenDescription &&
              description?.slice(0, 75) +
                `${description?.length > 75 ? "..." : ""}`}
            {hiddenDescription &&
              hiddenDescription?.slice(0, 75) +
                `${description?.length > 75 ? "..." : ""}`}
          </Description>
        </DataContainer>
        {
          <PercentageContainer>
            <RarityText>{calculateXPFromPercentage(percentage)}</RarityText>
            <RarityIcon color={getRarityColorFromPercentage(percentage)}>
              {getIcon("achievement")}
            </RarityIcon>
          </PercentageContainer>
        }
        {!hidePinned && (
          <PinnedStatusContainer
            pinColor={pinColor}
            onMouseEnter={onPinMouseEnter}
            onMouseLeave={onPinMouseLeave}
            onClick={() => {
              addOrRemovePinStatus();
            }}
          >
            {pinnedText}
          </PinnedStatusContainer>
        )}
        {hidden == "1" && false && (
          <HiddenContainer>
            <IoEyeOff />
          </HiddenContainer>
        )}
        <PhaseContainer show={showPhase}>
          {false && (
            <XPData>
              <XPText>{calculateXPFromPercentage(percentage)}</XPText>
              <XPIcon>{getIcon("achievement")}</XPIcon>
            </XPData>
          )}
          <PhaseItem
            active={phase == ALL}
            onClick={() => {
              setPhaseForAchievement(name, ALL);
            }}
          >
            ALL
          </PhaseItem>
          <PhaseItem
            active={phase == EASY}
            onClick={() => {
              setPhaseForAchievement(name, EASY);
            }}
          >
            EASY
          </PhaseItem>
          <PhaseItem
            active={phase == MISSABLE}
            onClick={() => {
              setPhaseForAchievement(name, MISSABLE);
            }}
          >
            MISS
          </PhaseItem>
          <PhaseItem
            active={phase == GRIND}
            onClick={() => {
              setPhaseForAchievement(name, GRIND);
            }}
          >
            GRIND
          </PhaseItem>
          <PhaseItem
            active={phase == HARD}
            onClick={() => {
              setPhaseForAchievement(name, HARD);
            }}
          >
            HARD
          </PhaseItem>

          {false && (
            <PhaseItemIgnore active={ignoreActive} onClick={addToIgnoreList}>
              {ignoreActive && "REMOVE"}
              {!ignoreActive && "IGNORE"}
            </PhaseItemIgnore>
          )}
        </PhaseContainer>
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
