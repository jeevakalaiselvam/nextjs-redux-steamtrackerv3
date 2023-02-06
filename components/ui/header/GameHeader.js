import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { FILTER_OPTIONS_GAME_PAGE } from "../../../helpers/filterHelper";
import {
  changeGamePageFilterOption,
  changeGamePageSearchTerm,
  setGameDataRefresh,
} from "../../../store/actions/games.actions";
import Filter from "../../atoms/Filter";
import Search from "../../atoms/Search";
import { TbRefresh } from "react-icons/tb";
import { useRouter } from "next/router";
import axios from "axios";
import {
  calculateLevelFromAllGames,
  COMPLETION_TARGET,
  getAllXPFromAchievements,
  XP_FOR_LEVEL,
} from "../../../helpers/xpHelper";
import { getIcon } from "../../../helpers/iconHelper";
import { FaTrophy } from "react-icons/fa";
import chroma from "chroma-js";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0.25rem 1rem;
  flex: 1;
  width: 100%;
`;

const FilterContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

const RemainingContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TrophyContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const TrophyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: ${(props) => (props.color ? props.color : "#b55af2")};
`;

const TrophyCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.color ? props.color : "#b55af2")};
  font-size: 1.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const RefreshContainer = styled.div`
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

const RefreshText = styled.div`
  display: flex;
  margin-left: 0.5rem;
  align-items: center;
  justify-content: center;
`;

const ToGetContainer = styled.div`
  display: "flex";
  min-width: 100px;
  flex-direction: column;
  padding: 1rem;
  z-index: 8;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0.1);
  transform: translateX("0%");
`;

const ToGetIcon = styled.div`
  display: flex;
  align-items: center;
  color: #f1b51b;
  font-size: 2rem;
  z-index: 8;
  justify-content: center;
`;

const ToGetData = styled.div`
  display: flex;
  align-items: center;
  z-index: 8;
  justify-content: center;
  color: #f1b51b;
  font-size: 1.5rem;
`;

const RefreshIcon = styled.div`
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
  const [rotate, setRotate] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { gameId } = router.query;

  const [refreshing, setRefreshing] = useState(false);

  const onFilterChanged = (filterOption) => {
    dispatch(changeGamePageFilterOption(filterOption));
  };

  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, planner } = steamtracker;

  const { xpTotal, currentLevel, toNextLevel, unlockedAll } =
    calculateLevelFromAllGames(games);

  const onSearchObtained = (searchTerm) => {};

  const game = games.length && games.find((game) => game.id == gameId);
  const { id, playtime, name, version, achievements, completion, toGet } = game;

  const xpData = getAllXPFromAchievements(achievements);
  const {
    totalXP,
    completedXP,
    remainingXP,
    completedTotal,
    total,
    percentageCompletion,
  } = xpData;

  console.log("JEEVA - ", {
    totalXP,
    completedXP,
    remainingXP,
    completedTotal,
    total,
    percentageCompletion,
  });

  const refreshButtonClickHandler = async () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        PLAYER_LEVEL_KEY,
        Math.floor(xpTotal / XP_FOR_LEVEL)
      );
    }
    setRefreshing(true);
    const response = await axios.get(`/api/refresh/${gameId}`);
    const gameRefreshedData = response.data.data;
    dispatch(setGameDataRefresh(gameId, gameRefreshedData));
    setRefreshing(false);
  };

  const calculateTrophiesToNextStage = (percentageNow) => {
    if (percentageNow < 25) {
      return {
        next: Math.ceil(total * 0.25) - completedTotal,
        iconColor: "#B87333",
      };
    } else if (percentageNow >= 25 && percentageNow < 50) {
      return {
        next: Math.ceil(total * 0.5) - completedTotal,
        iconColor: "#C0C0C0",
      };
    } else if (percentageNow >= 50 && percentageNow < 75) {
      return {
        next: Math.ceil(total * 0.75) - completedTotal,
        iconColor: "#f5b81c",
      };
    } else if (percentageNow >= 75) {
      return {
        next: Math.ceil(total * 1) - completedTotal,
        iconColor: "#b55af2",
      };
    }
  };

  const { next, iconColor } =
    calculateTrophiesToNextStage(percentageCompletion);

  return (
    <Container>
      <FilterContainer>
        <Filter
          filterOptions={FILTER_OPTIONS_GAME_PAGE}
          onFilterChanged={onFilterChanged}
        />
      </FilterContainer>
      <RemainingContainer>
        <TrophyContainer>
          <TrophyIcon color={iconColor}>
            <FaTrophy />
          </TrophyIcon>
          <TrophyCount color={iconColor}>{next}</TrophyCount>
        </TrophyContainer>
      </RemainingContainer>
      <SearchContainer>
        <Search onSearchObtained={onSearchObtained} />
        <RefreshContainer onClick={refreshButtonClickHandler}>
          <RefreshIcon rotate={refreshing}>
            <TbRefresh />
          </RefreshIcon>
          <RefreshText>REFRESH</RefreshText>
        </RefreshContainer>
      </SearchContainer>
    </Container>
  );
}
