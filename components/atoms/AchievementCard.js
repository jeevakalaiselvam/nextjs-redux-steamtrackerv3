import React from "react";
import { FaCheck, FaGlobe } from "react-icons/fa";
import styled from "styled-components";
import { IoEyeOff } from "react-icons/io5";
import { getFormattedDate } from "../../helpers/achievementHelper";

const Container = styled.div`
  width: 365px;
  display: flex;
  flex-direction: row;
  padding: 0.5rem 1rem;
  align-items: flex-start;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  margin: 0.5rem;
  min-height: 120px;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

const IconContainer = styled.div`
  display: flex;
  width: 60px;
  height: 60px;
  flex-direction: row;
  padding: 0.5rem 0;
  align-items: flex-start;
  justify-content: center;
  position: relative;
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
  max-width: 150px;
  align-self: flex-start;
  padding: 0.5rem;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 1.5rem;
  word-wrap: break-word;

  &:hover {
    color: #ffffff;
  }
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

const HiddenContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  padding: 0rem 1rem 1rem 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const UnlockedContainer = styled.div`
  position: absolute;
  bottom: 0;
  color: #b0bec5;
  right: 0;
  display: flex;
  padding: 0rem 1rem 1rem 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  opacity: 0.5;
`;

const PercentageContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  padding: 0rem 1rem 1rem 1rem;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const PercentageText = styled.div`
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

const PercentageIcon = styled.div`
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

const CheckContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
  color: #6cff5c;
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
  const gameName = props.gameName;
  return (
    <Container>
      <IconContainer>
        <Icon icon={icon}></Icon>
        {achieved == 1 && false && (
          <CheckContainer>
            <FaCheck />
          </CheckContainer>
        )}
      </IconContainer>
      <DataContainer>
        <Title
          onClick={() => {
            if (window !== "undefined") {
              const searchQuery = `${displayName} achievement ${gameName} `;
              window.open(`https://www.google.com/search?q=${searchQuery}`);
              // window.open(`https://www.youtube.com/results?search_query=${searchQuery}`);
            }
          }}
        >
          {displayName}
        </Title>
        <Description>{description || hiddenDescription}</Description>
      </DataContainer>
      <PercentageContainer>
        <PercentageIcon>
          <FaGlobe />
        </PercentageIcon>
        <PercentageText>{percentage.toFixed(2)}%</PercentageText>
      </PercentageContainer>
      {hidden == "1" && (
        <HiddenContainer>
          <IoEyeOff />
        </HiddenContainer>
      )}
      <UnlockedContainer>
        {`${new Date(unlocktime * 1000).toString().slice(0, -40)}, ${new Date(
          unlocktime * 1000
        ).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}`}
      </UnlockedContainer>
    </Container>
  );
}
