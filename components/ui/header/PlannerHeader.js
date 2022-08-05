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
import { FaTrophy } from "react-icons/fa";
import {
  getAllXPFromAchievements,
  XP_FOR_LEVEL,
} from "../../../helpers/xpHelper";

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
  align-items: center;
  flex: 1;
  justify-content: center;
  width: 100%;
`;

const XPDataContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
`;

const SearchContainer = styled.div`
  display: flex;
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

const XPContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  z-index: 8;
  padding: 1rem;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0.5);
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

const RefreshText = styled.div`
  display: flex;
  margin-left: 0.5rem;
  align-items: center;
  justify-content: center;
`;

export default function PlannerHeader() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { gameId } = router.query;

  const refreshButtonClickHandler = async () => {
    const response = await axios.get(`/api/refresh/${gameId}`);
    const gameRefreshedData = response.data.data;
    dispatch(setGameDataRefresh(gameId, gameRefreshedData));
  };

  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, planner } = steamtracker;

  return (
    <Container>
      <FilterContainer>
        {/* <XPDataContainer>
          TO GET
          <XPContainer>
            <XPIcon>
              <FaTrophy />
            </XPIcon>
            <XPData>
              {Math.floor(Math.floor(totalXP * 0.5) - completedXP)} XP
            </XPData>
          </XPContainer>
        </XPDataContainer> */}
      </FilterContainer>
      <SearchContainer>
        <RefreshContainer onClick={refreshButtonClickHandler}>
          <TbRefresh />
          <RefreshText>REFRESH</RefreshText>
        </RefreshContainer>
      </SearchContainer>
    </Container>
  );
}