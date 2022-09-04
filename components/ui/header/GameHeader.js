import React, { useEffect } from "react";
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
  COMPLETION_TARGET,
  getAllXPFromAchievements,
} from "../../../helpers/xpHelper";
import { getIcon } from "../../../helpers/iconHelper";

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

const SearchContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const TrophyContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
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

export default function GameHeader() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { gameId } = router.query;

  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings } = steamtracker;

  let game;

  if (gameId) {
    game = games.find((game) => game.id == gameId);
    const { id, playtime, name, version, achievements, completion, toGet } =
      game;

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

    const xpData = getAllXPFromAchievements(newAchievements);
    const { totalXP, completedXP, remainingXP, completedTotal, total } = xpData;

    const onFilterChanged = (filterOption) => {
      dispatch(changeGamePageFilterOption(filterOption));
    };

    const onSearchObtained = (searchTerm) => {
      dispatch(changeGamePageSearchTerm(searchTerm));
    };

    const refreshButtonClickHandler = async () => {
      const response = await axios.get(`/api/refresh/${gameId}`);
      const gameRefreshedData = response.data.data;
      dispatch(setGameDataRefresh(gameId, gameRefreshedData));
    };

    return (
      <Container>
        <FilterContainer>
          <Filter
            filterOptions={FILTER_OPTIONS_GAME_PAGE}
            onFilterChanged={onFilterChanged}
          />
        </FilterContainer>
        {gameId && (
          <TrophyContainer>
            <ToGetContainer>
              <ToGetIcon>{getIcon("trophy")}</ToGetIcon>
              <ToGetData>
                {Math.floor(total * COMPLETION_TARGET) - completedTotal > 0
                  ? Math.floor(total * COMPLETION_TARGET) - completedTotal
                  : 0}
              </ToGetData>
            </ToGetContainer>
          </TrophyContainer>
        )}
        <SearchContainer>
          <Search onSearchObtained={onSearchObtained} />
          <RefreshContainer onClick={refreshButtonClickHandler}>
            <TbRefresh />
            <RefreshText>REFRESH</RefreshText>
          </RefreshContainer>
        </SearchContainer>
      </Container>
    );
  }
}
