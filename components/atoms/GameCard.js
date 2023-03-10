import React, { useEffect, useState } from "react";
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
  calculateRarityLeftFromAchievements,
  completionPercentageTarget,
  getAllXPFromAchievements,
  getPercentageCompletionColor,
  calculateLevelFromAllGames,
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
  setLastSelectedGame,
} from "../../store/actions/games.actions";
import {
  BELOW_WASTE_COLOR,
  COMMON_COLOR,
  EPIC,
  EPIC_COLOR,
  LEGENDARY_COLOR,
  MARVEL_COLOR,
  RARE_COLOR,
  UNCOMMON_COLOR,
  WASTE_COLOR,
} from "../../helpers/colorHelper";
import next from "next";
import { calculaNextStageForGame } from "../../helpers/gameHelper";

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
  flex-direction: column;
  bottom: 0px;
  left: 0;
  padding: 1rem;
  font-size: 1.5rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 60;
`;

const CompletionBar = styled.div`
  position: absolute;
  width: 100%;
  height: 3px;
  display: flex;
  flex-direction: column;
  bottom: 0px;
  left: 0;
  font-size: 1.5rem;
  z-index: 60;
  background-color: ${(props) => (props.color ? props.color : "red")};
`;

const TitleData = styled.div`
  display: flex;
  z-index: 8;
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const ToGetContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  padding: 1rem;
  z-index: 8;
  transition: all 0.5s;
  transform: translateX("0%");
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
  flex-direction: row;
  cursor: pointer;
  top: 0;
  right: ${(props) => (props.trophyHovered ? "0px" : "-100px")};
  z-index: 8;
  padding: 1rem;
  color: ${(props) => (props.iconColor ? props.iconColor : "")};
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0.75);
  transform: translateX("0%");
`;

const XPIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.75rem;
  z-index: 8;
  justify-content: center;
`;

const TrophyIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.75rem;
  z-index: 8;
  justify-content: center;
  color: ${(props) => (props.iconColor ? props.iconColor : "")};
`;

const Percentage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  z-index: 8;
  color: ${(props) => (props.iconColor ? props.iconColor : "")};
`;

const XPData = styled.div`
  display: flex;
  margin-right: 0.5rem;
  align-items: center;
  justify-content: center;
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
  const { id, name, achievements, toGet } = game;
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { settings, pinnedGames, targetSettings, games } = steamtracker;
  const { settingsPage } = settings;
  const { completionPercentageTarget } = settingsPage;

  const [gameData, setGameData] = useState({
    achievements: [],
    percentageCompletion: 0,
  });
  const [movePinRight, setMovePinRight] = useState(true);
  const [xpInfo, setXPInfo] = useState({});
  const [levelInfo, setLevelInfo] = useState({});
  const [rarityInfo, setRarityInfo] = useState({});
  const [nextStage, setNextStage] = useState({
    next: 0,
    iconColor: COMMON_COLOR,
  });

  const router = useRouter();

  const [trophyHovered, setTrophyHovered] = useState(true);

  useEffect(() => {
    if (game) {
      const xpData = getAllXPFromAchievements(game.achievements);
      const xpInfo = calculateLevelFromAllGames(games);
      const rarityInfo = calculateRarityLeftFromAchievements(
        game.achievements,
        targetSettings
      );
      const nextStage = calculaNextStageForGame(game);
      setGameData(game);
      setXPInfo(xpInfo);
      setLevelInfo(levelInfo);
      setRarityInfo(rarityInfo);
      setNextStage(nextStage);
    }
  }, [game]);

  return (
    <Container>
      <Overlay />
      <Image image={HEADER_IMAGE(id)} />
      <Title
        onClick={() => {
          if (typeof window !== "undefined") {
            localStorage.setItem("SELECTED_GAME", id);
          }
          dispatch(setLastSelectedGame(id));
          dispatch(changeGamesPageSearchTerm(""));
          router.push(`/games/${id}`);
        }}
      >
        <TitleData
          onMouseEnter={() => {
            setMovePinRight(false);
          }}
          onMouseLeave={() => {
            setMovePinRight(true);
          }}
        >
          {name}
        </TitleData>
      </Title>
      {
        <ToGetContainer>
          {false && (
            <ToGetData>
              {false && (
                <TrophyIcon
                  iconColor={getPercentageCompletionColor(gameData.completion)}
                >
                  {getPercentageCompletionColor(gameData.completion) !=
                    COMMON_COLOR && getIcon("trophy")}{" "}
                  {getPercentageCompletionColor(gameData.completion) ==
                    COMMON_COLOR && getIcon("ongoing")}
                </TrophyIcon>
              )}
              {false && (
                <Percentage
                  iconColor={getPercentageCompletionColor(gameData.completion)}
                >
                  {gameData.completion} %
                </Percentage>
              )}
            </ToGetData>
          )}
        </ToGetContainer>
      }
      {nextStage.next > 0 && (
        <XPContainer
          iconColor={nextStage.iconColor}
          trophyHovered={trophyHovered}
        >
          <XPData>{nextStage.next}</XPData>
          <XPIcon>{getIcon("achievement")}</XPIcon>
        </XPContainer>
      )}
      <PinIcon
        onMouseEnter={() => {
          setMovePinRight(false);
        }}
        onMouseLeave={() => {
          setMovePinRight(true);
        }}
        movePinRight={movePinRight}
        active={
          (pinnedGames && pinnedGames?.length && pinnedGames?.includes(id)) ??
          false
        }
        onClick={() => {
          if (
            pinnedGames &&
            pinnedGames.length > 0 &&
            pinnedGames?.includes(id)
          ) {
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
      {(nextStage.next == 0 || gameData.completed > 0) && (
        <CompleteIcon
          onMouseEnter={() => {
            // setTrophyHovered(true);
          }}
          onMouseLeave={() => {
            // setTrophyHovered(false);
          }}
          active={true}
          onClick={() => {}}
          color={getPercentageCompletionColor(gameData.completion)}
        >
          {getIcon("trophy")}
        </CompleteIcon>
      )}
      )
    </Container>
  );
}
