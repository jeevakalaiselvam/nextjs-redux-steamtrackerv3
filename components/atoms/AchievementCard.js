import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 350px;
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  align-items: flex-start;
  justify-content: center;
  background: #171717;
  margin: 0.25rem;
  min-height: 100px;
`;

const IconContainer = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  flex-direction: row;
  padding: 0.5rem 0;
  align-items: flex-start;
  justify-content: center;
`;

const Icon = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  background: url(${(props) => props.icon});
  background-size: contain;
  background-repeat: no-repeat;
  flex-direction: row;
  padding: 0.5rem;
  align-items: flex-start;
  justify-content: center;
`;

const DataContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 0rem 1rem 0rem 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0.5rem;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 1.5rem;
`;

const Description = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 0.5rem;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  color: #b0bec5;
  font-size: 1.5rem;
`;

export default function AchievementCard(props) {
  const {
    name,
    hidden,
    icon,
    icongray,
    percentage,
    achieved,
    unlocktime,
    displayName,
    description,
  } = props.achievement;
  const hiddenDescription = props.hiddenDescription;

  console.log("HIDDEN", hiddenDescription);

  return (
    <Container>
      <IconContainer>
        <Icon icon={icon}></Icon>
      </IconContainer>
      <DataContainer>
        <Title>{displayName}</Title>
        <Description>{hiddenDescription}</Description>
      </DataContainer>
    </Container>
  );
}
