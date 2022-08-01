import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FILTER_OPTIONS_GAMES_PAGE } from "../../../helpers/filterHelper";
import { changeGamesPageFilterOption } from "../../../store/actions/games.actions";
import Filter from "../../atoms/Filter";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0.25rem;
  flex: 1;
  width: 100%;
`;

const FilterContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SearchContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default function GamesHeader() {
  const dispatch = useDispatch();

  const onFilterChanged = (filterOption) => {
    dispatch(changeGamesPageFilterOption(filterOption));
  };

  return (
    <Container>
      <FilterContainer>
        <Filter
          filterOptions={FILTER_OPTIONS_GAMES_PAGE}
          onFilterChanged={onFilterChanged}
        />
      </FilterContainer>
      <SearchContainer></SearchContainer>
    </Container>
  );
}
