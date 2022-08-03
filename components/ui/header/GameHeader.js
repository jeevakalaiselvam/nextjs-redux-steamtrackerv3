import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FILTER_OPTIONS_GAME_PAGE } from "../../../helpers/filterHelper";
import {
  changeGamePageFilterOption,
  changeGamePageSearchTerm,
} from "../../../store/actions/games.actions";
import Filter from "../../atoms/Filter";
import Search from "../../atoms/Search";
import { TbRefresh } from "react-icons/tb";

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

const RefreshText = styled.div`
  display: flex;
  margin-left: 0.5rem;
  align-items: center;
  justify-content: center;
`;

export default function GameHeader() {
  const dispatch = useDispatch();

  const onFilterChanged = (filterOption) => {
    dispatch(changeGamePageFilterOption(filterOption));
  };

  const onSearchObtained = (searchTerm) => {
    dispatch(changeGamePageSearchTerm(searchTerm));
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
        <RefreshContainer>
          <TbRefresh />
          <RefreshText>REFRESH</RefreshText>
        </RefreshContainer>
      </SearchContainer>
    </Container>
  );
}
