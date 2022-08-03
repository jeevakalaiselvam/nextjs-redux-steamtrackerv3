import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 365px;
  display: flex;
  flex-direction: row;
  padding: 0.5rem 1rem;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  margin: 0.5rem;
  min-height: 120px;
  border-radius: 4px;
  font-size: 1.5rem;
  position: relative;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

export default function NoAchievements() {
  return <Container>No Achievements</Container>;
}
