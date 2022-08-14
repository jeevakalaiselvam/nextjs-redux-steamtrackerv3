import React from "react";
import { FaCheck, FaGlobe } from "react-icons/fa";
import styled from "styled-components";
import { IoEyeOff } from "react-icons/io5";
import { getFormattedDate } from "../../helpers/achievementHelper";
import { HEADER_IMAGE } from "../../helpers/urlHelper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  position: relative;
  padding: 1rem;
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
  align-items: center;
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
  align-items: center;
  justify-content: center;
`;

const DataContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 0rem 1rem 0rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex: 1;
  padding: 0.5rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  word-wrap: break-word;
  color: #ffffff;

  &:hover {
    color: #ffffff;
  }
`;

const Description = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 1rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #b0bec5;
  font-weight: 700;
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

const GameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
`;

const Image = styled.div`
  width: 200px;
  height: 100px;
  background: url(${(props) => props.gameURL});
  background-size: contain;
  background-repeat: no-repeat;
`;

export default function AchievementCardTooltip(props) {
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
    gameId,
  } = props.achievement;
  const hiddenDescription = props.hiddenDescription;
  const gameName = props.gameName;
  return (
    <Container>
      <IconContainer>
        <Icon icon={icon}></Icon>
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

      {hidden == "1" && (
        <HiddenContainer>
          <IoEyeOff />
        </HiddenContainer>
      )}
      <GameContainer>
        <Image gameURL={HEADER_IMAGE(gameId)}></Image>
      </GameContainer>
    </Container>
  );
}
