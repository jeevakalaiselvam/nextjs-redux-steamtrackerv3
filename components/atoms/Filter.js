import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: "100%";
  align-items: center;
  padding: 0.5rem;
  color: #fefefe;
  justify-content: "center";
  z-index: 100;
  margin: 0.25rem;

  & select {
    border: none;
    outline: none;
    color: #9caabe;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(6px);
  }
  & option {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(6px);
    border: none;
    outline: none;
    color: #9caabe;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export default function Filter({
  filterOptions,
  onFilterChanged,
  defaultSelected,
}) {
  const [selected, setSelected] = useState(defaultSelected);

  useEffect(() => {
    setSelected((old) => defaultSelected);
  }, [defaultSelected]);

  const optionChangeHandler = (event) => {
    const selectedValue = event.target.value;
    setSelected((old) => selectedValue);
    onFilterChanged(selectedValue);
  };

  console.log("SELECTED OPTION", defaultSelected);

  return (
    <Container>
      <select
        name="sort"
        key="sort"
        onChange={optionChangeHandler}
        value={selected}
      >
        {filterOptions &&
          filterOptions.length > 0 &&
          filterOptions.map((filterOption) => {
            return (
              <option
                key={filterOption.id}
                value={filterOption.id}
                selected={filterOption.id == defaultSelected}
              >
                {filterOption.title}
              </option>
            );
          })}
      </select>
    </Container>
  );
}
