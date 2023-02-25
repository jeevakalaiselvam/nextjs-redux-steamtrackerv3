import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HiSearch, HiX } from "react-icons/hi";
import { useDispatch } from "react-redux";

const Container = styled.div`
  display: flex;
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 4px 0px 0px 4px;
  cursor: pointer;

  &:hover {
  }
`;

const SearchCross = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5rem 1rem;
  border-radius: 0px 4px 4px 0px;
  cursor: pointer;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & input {
    outline: none;
    padding: 0.5rem;
    width: ${(props) => props.width || "150px"};
    background: rgba(0, 0, 0, 0.5);
    color: #9caabe;
    border: none;
    border-radius: 0px 0px 0px 0px;

    &::placeholder {
      color: #9caabe;
    }
  }
`;

const Search = (props) => {
  const dispatch = useDispatch();
  const { onSearchObtained, width, userSearchTerm, dispatchClearIfNeeded } =
    props;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchObtained(searchTerm);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  const searchTermChanged = (e) => {
    const data = e.target.value;
    setSearchTerm((old) => data);
  };

  return (
    <Container>
      <SearchIcon>
        <HiSearch />
      </SearchIcon>
      <SearchInput width={width}>
        <input
          type="text"
          value={searchTerm ?? ""}
          onChange={searchTermChanged}
          placeholder="Search..."
        />
      </SearchInput>
      <SearchCross
        onClick={() => {
          setSearchTerm((old) => "");
          if (dispatchClearIfNeeded) {
            dispatch(dispatchClearIfNeeded(""));
          }
        }}
      >
        <HiX />
      </SearchCross>
    </Container>
  );
};

export default Search;
