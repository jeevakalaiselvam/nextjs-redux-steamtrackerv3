import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  FILTER_OPTIONS_GAMES_PAGE,
  GAMES_OPTION_COMPLETION_DESC,
} from "../../../helpers/filterHelper";
import {
  changeGamesPageFilterOption,
  changeGamesPageSearchTerm,
} from "../../../store/actions/games.actions";
import Filter from "../../atoms/Filter";
import Search from "../../atoms/Search";

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

export default function GamesHeader() {
  const dispatch = useDispatch();

  const onFilterChanged = (filterOption) => {
    dispatch(changeGamesPageFilterOption(filterOption));
  };

  const onSearchObtained = (searchTerm) => {
    dispatch(changeGamesPageSearchTerm(searchTerm));
  };

  return (
    <Container>
      <FilterContainer>
        <Filter
          filterOptions={FILTER_OPTIONS_GAMES_PAGE}
          defaultSelected={GAMES_OPTION_COMPLETION_DESC}
          onFilterChanged={onFilterChanged}
        />
      </FilterContainer>
      <SearchContainer>
        <Search onSearchObtained={onSearchObtained} />
      </SearchContainer>
    </Container>
  );
}
