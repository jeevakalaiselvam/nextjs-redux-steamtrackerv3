import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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

const RefreshIcon = styled.div`
  display: flex;
  margin-left: 0.5rem;
  align-items: center;
  justify-content: center;
  animation: ${(props) => (props.refreshing ? "rotate 5s infinite" : "")};

  @keyframes rotate {
    50% {
      transform: rotate(180deg);
    }
  }
`;

const RefreshText = styled.div`
  display: flex;
  margin-left: 0.5rem;
  align-items: center;
  justify-content: center;
`;

export default function GameHeader() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { gameId } = router.query;

  const [refreshing, setRefreshing] = useState(false);

  const onFilterChanged = (filterOption) => {
    dispatch(changeGamePageFilterOption(filterOption));
  };

  const onSearchObtained = (searchTerm) => {
    dispatch(changeGamePageSearchTerm(searchTerm));
  };

  const refreshButtonClickHandler = async () => {
    setRefreshing(true);
    const response = await axios.get(`/api/refresh/${gameId}`);
    const gameRefreshedData = response.data.data;
    dispatch(setGameDataRefresh(gameId, gameRefreshedData));
    setRefreshing(false);
  };

  return (
    <Container>
      <FilterContainer>
        <Filter
          filterOptions={FILTER_OPTIONS_GAME_PAGE}
          onFilterChanged={onFilterChanged}
        />
      </FilterContainer>
      <SearchContainer>
        <Search onSearchObtained={onSearchObtained} />
        <RefreshContainer onClick={refreshButtonClickHandler}>
          <RefreshIcon refreshing={refreshing}>
            <TbRefresh />
          </RefreshIcon>
          <RefreshText>REFRESH</RefreshText>
        </RefreshContainer>
      </SearchContainer>
    </Container>
  );
}
