import React, { useState } from "react";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../helpers/urlHelper";
import { FaPinterest, FaTrophy } from "react-icons/fa";
import {
  HiArchive,
  HiCheck,
  HiClock,
  HiCollection,
  HiPresentationChartLine,
} from "react-icons/hi";
import {
  COMPLETION_TARGET,
  getAllXPFromAchievements,
  XP_FOR_LEVEL,
} from "../../helpers/xpHelper";
import { useRouter } from "next/router";
import { AiFillCheckSquare, AiFillGold, AiFillPushpin } from "react-icons/ai";
import { getIcon } from "../../helpers/iconHelper";
import chroma from "chroma-js";
import { useDispatch, useSelector } from "react-redux";
import {
  addPinnedGame,
  changeGamesPageSearchTerm,
  removePinnedGame,
} from "../../store/actions/games.actions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 165px;
  margin: 1rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Title = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  bottom: 0;
  left: 0;
  padding: 1rem;
  font-size: 1.5rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 60;
`;

const TitleData = styled.div`
  display: flex;
  z-index: 8;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const CompletionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToGetContainer = styled.div`
  position: absolute;
  display: "flex";
  flex-direction: column;
  top: 0;
  left: 0;
  padding: 1rem;
  z-index: 8;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0.75);
  transform: translateX("0%");
`;

const ToGetIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => (props.iconColor ? props.iconColor : "red")};
  font-size: 2rem;
  z-index: 8;
  justify-content: center;
`;

const ToGetData = styled.div`
  display: flex;
  align-items: center;
  z-index: 8;
  justify-content: center;
  color: ${(props) => (props.iconColor ? props.iconColor : "red")};
  font-size: 1.5rem;
`;

const XPContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 0;
  right: 0;
  z-index: 8;
  padding: 1rem;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0.75);
  transform: translateX("0%");
`;

const XPIcon = styled.div`
  display: flex;
  align-items: center;
  color: #f5b81c;
  font-size: 1.75rem;
  margin-right: 0.5rem;
  z-index: 8;
  justify-content: center;
`;

const XPData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f5b81c;
  z-index: 8;
  font-size: 1.5rem;
`;

const CompletionOverlay = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #f5b81c;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  font-size: 5rem;
`;

const PinIcon = styled.div`
  position: absolute;
  bottom: 0px;
  right: ${(props) => (props.movePinRight ? "-100px" : "0px")};
  background-color: rgba(0, 0, 0, 0.9);
  color: ${(props) => (props.active ? "#f5b81c" : "#fefefe")};
  cursor: pointer;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 70;
  font-size: 2rem;
  transition: 0.25s all;

  &:hover {
    color: #f5b81c;
  }
`;

const CompleteIcon = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.color};
  cursor: pointer;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 7;
  font-size: 5rem;
  width: 100%;
  height: 100%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export default function GameCard({ game }) {
  const { id, playtime, name, version, achievements, completion, toGet } = game;
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings, pinnedGames } = steamtracker;

  let newAchievements = achievements.filter((achievement) => {
    if (typeof window !== "undefined") {
      let ignoredAchievementsInStorage =
        localStorage.getItem(`${id}_IGNORE`) || JSON.stringify([]);
      let ignoredAchievements = JSON.parse(ignoredAchievementsInStorage);
      if (!ignoredAchievements.includes(achievement.name)) {
        return true;
      }
    }
  });

  const router = useRouter();

  const xpData = getAllXPFromAchievements(newAchievements);
  const {
    totalXP,
    completedXP,
    remainingXP,
    completedTotal,
    total,
    percentageCompletion,
  } = xpData;
  const completed = completedXP / XP_FOR_LEVEL;
  const needed = (totalXP * COMPLETION_TARGET) / XP_FOR_LEVEL;

  const [movePinRight, setMovePinRight] = useState(true);

  const getColorForOverlay = (percentage) => {
    if (percentage == 100) {
      return chroma("#b55af2");
    } else if (percentage < 100 && percentage >= 75) {
      return chroma("#f5b81c");
    } else if (percentage < 75 && percentage >= 50) {
      return "#C0C0C0";
    } else if (percentage < 50 && percentage >= 25) {
      return chroma("#B87333");
    } else {
      return "#00000000";
    }
  };

  const calculateTrophiesToNextStage = () => {
    if (percentageCompletion < 25) {
      return {
        next: Math.ceil(total * 0.25) - completedTotal,
        iconColor: "#B87333",
      };
    } else if (percentageCompletion >= 25 && percentageCompletion < 50) {
      return {
        next: Math.ceil(total * 0.5) - completedTotal,
        iconColor: "#C0C0C0",
      };
    } else if (percentageCompletion >= 50 && percentageCompletion < 75) {
      return {
        next: Math.ceil(total * 0.75) - completedTotal,
        iconColor: "#f5b81c",
      };
    } else if (percentageCompletion >= 75) {
      return {
        next: Math.ceil(total * 1) - completedTotal,
        iconColor: "#b55af2",
      };
    }
  };

  const { next, iconColor } = calculateTrophiesToNextStage();

  return (
    <Container>
      <Overlay />
      <Image image={HEADER_IMAGE(id)} />
      {completed >= needed && false && (
        <CompletionOverlay>{getIcon("trophy")}</CompletionOverlay>
      )}
      <Title
        onClick={() => {
          if (typeof window !== "undefined") {
            localStorage.setItem("SELECTED_GAME", id);
          }
          router.push(`/games/${id}`);
        }}
      >
        <TitleData
          onMouseEnter={() => {
            setMovePinRight((old) => false);
          }}
          onMouseLeave={() => {
            setMovePinRight((old) => true);
          }}
        >
          {" "}
          {name}
        </TitleData>
      </Title>
      {next !== 0 && (
        <ToGetContainer>
          <ToGetIcon iconColor={iconColor}>{getIcon("trophy")}</ToGetIcon>
          <ToGetData iconColor={iconColor}>{next}</ToGetData>
        </ToGetContainer>
      )}
      {false && (
        <XPContainer>
          <XPIcon>{getIcon("xp")}</XPIcon>
          <XPData>
            {Math.floor(Math.floor(totalXP * COMPLETION_TARGET) - completedXP)}
          </XPData>
        </XPContainer>
      )}

      <PinIcon
        onMouseEnter={() => {
          setMovePinRight((old) => false);
        }}
        onMouseLeave={() => {
          setMovePinRight((old) => true);
        }}
        movePinRight={movePinRight}
        active={pinnedGames.includes(id)}
        onClick={() => {
          if (pinnedGames.length > 0 && pinnedGames.includes(id)) {
            dispatch(removePinnedGame({ gameId: id }));
            dispatch(changeGamesPageSearchTerm(""));
          } else {
            dispatch(addPinnedGame({ gameId: id }));
            dispatch(changeGamesPageSearchTerm(""));
          }
        }}
      >
        <AiFillPushpin />
      </PinIcon>
      {
        <CompleteIcon
          active={true}
          onClick={() => {}}
          color={getColorForOverlay(percentageCompletion)}
        >
          <FaTrophy />
        </CompleteIcon>
      }
    </Container>
  );
}
