import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  FILTER_OPTIONS_GAME_PAGE,
  GAMES_OPTION_COMPLETION_PINNED,
} from "../../../helpers/filterHelper";
import {
  changeGamePageFilterOption,
  changeGamePageSearchTerm,
  setGameDataRefresh,
  setRarityFilterForGame,
  toggleJournalRightSidebar,
} from "../../../store/actions/games.actions";
import Filter from "../../atoms/Filter";
import Search from "../../atoms/Search";
import { TbAB, TbArrowsMaximize, TbDialpad, TbRefresh } from "react-icons/tb";
import { useRouter } from "next/router";
import axios from "axios";
import {
  calculateLevelFromAllGames,
  calculateRarityLeftFromAchievements,
  getAllXPFromAchievements,
  XP_FOR_LEVEL,
} from "../../../helpers/xpHelper";
import { getIcon } from "../../../helpers/iconHelper";
import { FaTrophy } from "react-icons/fa";
import chroma from "chroma-js";
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
} from "../../../helpers/colorHelper";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0.25rem 1rem;
  flex: 1;
  width: 100%;
`;

const RemainingContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TrophyRemainingList = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const TrophyContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: ${(props) => (props.color ? props.color : "")};
  width: 50px;
`;

const TrophyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
`;

const TrophyCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const ClearTrophyFilter = styled.div`
  position: absolute;
  display: flex;
  left: 0;
  padding-left: 2rem;
  align-items: center;
  justify-content: flex-end;
`;

const SearchContainer = styled.div`
  position: absolute;
  display: flex;
  right: 0;
  padding-right: 2rem;
  align-items: center;
  justify-content: flex-end;
`;

const RemainingTrophyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100px;
  padding: 0.5rem;
  color: #fefefe;
  cursor: pointer;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100px;
  padding: 0.5rem;
  color: #fefefe;
  cursor: pointer;
  background-color: rgba(48, 73, 209, 0.8);
  backdrop-filter: blur(6px);
  margin-left: 1rem;

  &:hover {
    background-color: rgba(30, 51, 166, 0.8);
    backdrop-filter: blur(6px);
  }
`;

const XPContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  top: 0;
  left: 150px;
  z-index: 8;
  padding: 0.25rem;
  color: ${(props) => (props.iconColor ? props.iconColor : "")};
  transition: all 0.5s;
`;

const XPIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  margin-right: 1rem;
  z-index: 8;
  justify-content: center;
`;

const XPData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 8;
  font-size: 2rem;
`;

const RefreshText = styled.div`
  display: flex;
  margin-left: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  z-index: 8;
  justify-content: center;
  font-size: 1.5rem;
  -webkit-animation: ${(props) =>
    props.rotate ? "rotating 0.25s linear infinite" : ""};
  -moz-animation: ${(props) =>
    props.rotate ? "rotating 0.25s linear infinite" : ""};
  -ms-animation: ${(props) =>
    props.rotate ? "rotating 0.25s linear infinite" : ""};
  -o-animation: ${(props) =>
    props.rotate ? "rotating 0.25s linear infinite" : ""};
  animation: ${(props) => (props.rotate ? "rotating 2s linear infinite" : "")};

  @-webkit-keyframes rotating /* Safari and Chrome */ {
    from {
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes rotating {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export const PLAYER_LEVEL_KEY = "PLAYER_LEVEL_KEY";

export default function GameHeader() {
  const dispatch = useDispatch();
  const router = useRouter();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings } = steamtracker;
  const { settingsPage } = settings;
  const { completionPercentageTarget } = settingsPage;
  const { gameId } = router.query;

  const [gameData, setGameData] = useState({
    achievements: [],
    percentageCompletion: 0,
  });
  const [xpInfo, setXPInfo] = useState({});
  const [levelInfo, setLevelInfo] = useState({});
  const [rarityInfo, setRarityInfo] = useState({});
  const [nextStage, setNextStage] = useState({
    next: 0,
    iconColor: COMMON_COLOR,
  });

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (games.length > 0) {
      if (gameId) {
        console.log("GAMEID and GAMES", { gameId, games });
        const game = games.length && games.find((game) => game.id == gameId);
        if (game) {
          const xpData = getAllXPFromAchievements(game.achievements);
          const xpInfo = calculateLevelFromAllGames(games);
          const rarityInfo = calculateRarityLeftFromAchievements(
            game.achievements
          );
          const nextStage = {
            next: Math.ceil(
              xpData.total * (completionPercentageTarget / 100) -
                xpData.completedTotal
            ),
            iconColor: COMMON_COLOR,
          };
          setGameData(game);
          setXPInfo(xpInfo);
          setLevelInfo(levelInfo);
          setRarityInfo(rarityInfo);
          setNextStage(nextStage);
        }
      }
    }
  }, [gameId, games]);

  const onSearchObtained = (searchTerm) => {
    dispatch(changeGamePageSearchTerm(searchTerm));
  };

  const refreshButtonClickHandler = async () => {
    dispatch(toggleJournalRightSidebar(false));
    if (typeof window !== "undefined") {
      localStorage.setItem(
        PLAYER_LEVEL_KEY,
        Math.floor(xpInfo.xpTotal / XP_FOR_LEVEL)
      );
    }
    setRefreshing(true);
    const response = await axios.get(`/api/refresh/${gameId}`);
    const gameRefreshedData = response.data.data;
    dispatch(setGameDataRefresh(gameId, gameRefreshedData));
    setRefreshing(false);
  };

  const filterAchievementsByRarity = (rarity) => {
    dispatch(setRarityFilterForGame({ gameId: gameData.id, rarity }));
  };

  return (
    <Container>
      <ClearTrophyFilter>
        <InnerContainer
          onClick={() => {
            dispatch(
              setRarityFilterForGame({ gameId: gameData.id, rarity: "ALL" })
            );
          }}
        >
          <Icon rotate={false}>
            <TbArrowsMaximize />
          </Icon>
          <RefreshText>SHOW ALL</RefreshText>
        </InnerContainer>
        <RemainingTrophyContainer>
          <XPContainer iconColor={nextStage.iconColor}>
            <XPIcon>{getIcon("trophy")}</XPIcon>
            <XPData>{nextStage.next > 0 ? nextStage.next : 0}</XPData>
          </XPContainer>
        </RemainingTrophyContainer>
      </ClearTrophyFilter>
      <RemainingContainer>
        <TrophyRemainingList>
          <TrophyContainer
            color={WASTE_COLOR}
            onClick={() => filterAchievementsByRarity(WASTE)}
          >
            <TrophyIcon>
              <FaTrophy />
            </TrophyIcon>
            <TrophyCount>{rarityInfo.waste}</TrophyCount>
          </TrophyContainer>
          <TrophyContainer
            color={COMMON_COLOR}
            onClick={() => filterAchievementsByRarity(COMMON)}
          >
            <TrophyIcon>
              <FaTrophy />
            </TrophyIcon>
            <TrophyCount>{rarityInfo.common}</TrophyCount>
          </TrophyContainer>
          <TrophyContainer
            color={UNCOMMON_COLOR}
            onClick={() => filterAchievementsByRarity(UNCOMMON)}
          >
            <TrophyIcon>
              <FaTrophy />
            </TrophyIcon>
            <TrophyCount>{rarityInfo.uncommon}</TrophyCount>
          </TrophyContainer>
          <TrophyContainer
            color={RARE_COLOR}
            onClick={() => filterAchievementsByRarity(RARE)}
          >
            <TrophyIcon>
              <FaTrophy />
            </TrophyIcon>
            <TrophyCount>{rarityInfo.rare}</TrophyCount>
          </TrophyContainer>
          <TrophyContainer
            color={EPIC_COLOR}
            onClick={() => filterAchievementsByRarity(EPIC)}
          >
            <TrophyIcon>
              <FaTrophy />
            </TrophyIcon>
            <TrophyCount>{rarityInfo.epic}</TrophyCount>
          </TrophyContainer>
          <TrophyContainer
            color={LEGENDARY_COLOR}
            onClick={() => filterAchievementsByRarity(LEGENDARY)}
          >
            <TrophyIcon>
              <FaTrophy />
            </TrophyIcon>
            <TrophyCount>{rarityInfo.legendary}</TrophyCount>
          </TrophyContainer>
          <TrophyContainer
            color={MARVEL_COLOR}
            onClick={() => filterAchievementsByRarity(MARVEL)}
          >
            <TrophyIcon>
              <FaTrophy />
            </TrophyIcon>
            <TrophyCount>{rarityInfo.marvel}</TrophyCount>
          </TrophyContainer>
        </TrophyRemainingList>
      </RemainingContainer>
      <SearchContainer>
        <Search onSearchObtained={onSearchObtained} />
        <InnerContainer onClick={refreshButtonClickHandler}>
          <Icon rotate={refreshing}>
            <TbRefresh />
          </Icon>
          <RefreshText>REFRESH</RefreshText>
        </InnerContainer>
      </SearchContainer>
    </Container>
  );
}
