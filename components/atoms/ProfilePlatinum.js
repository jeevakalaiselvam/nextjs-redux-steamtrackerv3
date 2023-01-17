import { useRouter } from "next/router";
import React from "react";
import { FaTrophy } from "react-icons/fa";
import {
  HiFastForward,
  HiOutlineChevronDoubleUp,
  HiOutlineChevronUp,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { openLinkInNewTab } from "../../helpers/browserHelper";
import { getIcon } from "../../helpers/iconHelper";
import {
  calculateLevelFromAllGames,
  calculateTotalXPForAllGames,
  COMPLETION_TARGET,
  XP_FOR_LEVEL,
} from "../../helpers/xpHelper";

const Container = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  align-items: center;
  padding: 1rem;
  justify-content: center;
  margin-top: 0.5rem;
  flex-direction: column;
  width: 95%;
  cursor: pointer;
  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

const LevelFragment = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: center;
  font-size: 1.5rem;
`;

const LevelContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 1rem;
  margin-top: "1rem";
`;

const LevelContainerRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 1rem;
`;

const GoldTrophy = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #f1b51b;
  font-size: 2rem;
`;

const PurpleTrophy = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #b55af2;
  font-size: 2rem;
  margin-right: 3rem;
`;

const SilverTrophy = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #c0c0c0;
  font-size: 3rem;
  margin-right: 3rem;
`;

const BronzeTrophy = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #b87333;
  font-size: 3rem;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "2.1rem")};
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "2.1rem")};
`;

const ProfilePlatinum = (props) => {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, planner } = steamtracker;

  const router = useRouter();
  const { gameId } = router.query;

  const game = games.find((game) => game.id == gameId);

  const { xpTotal, currentLevel, toNextLevel, unlockedAll } =
    calculateLevelFromAllGames(games);

  const platinumCount = games.reduce((acc, game) => {
    if (+game.completion == COMPLETION_TARGET * 100) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const goldCount = games.reduce((acc, game) => {
    if (
      +game.completion >= COMPLETION_TARGET * 75 &&
      +game.completion < COMPLETION_TARGET * 100
    ) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const silverCount = games.reduce((acc, game) => {
    if (
      +game.completion >= COMPLETION_TARGET * 50 &&
      +game.completion < COMPLETION_TARGET * 75
    ) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const bronzeCount = games.reduce((acc, game) => {
    if (
      +game.completion >= COMPLETION_TARGET * 25 &&
      +game.completion < COMPLETION_TARGET * 50
    ) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  return (
    <Container
      onClick={() => {
        if (window !== "undefined") {
          const searchQuery = `${game.name} trophy guide `;
          window.open(`https://www.google.com/search?q=${searchQuery}`);
          // window.open(`https://www.youtube.com/results?search_query=${searchQuery}`);
        }
      }}
    >
      <LevelFragment>
        <Header>
          <HiOutlineChevronDoubleUp
            style={{ marginRight: "0.5rem", color: "#6cff5c" }}
          />
          <Title>PLATINUM</Title>
          <HiOutlineChevronDoubleUp
            style={{ marginLeft: "0.5rem", color: "#6cff5c" }}
          />
        </Header>
        <LevelContainer>
          <PurpleTrophy>
            <Icon fontSize={"2.5rem"}>{getIcon("trophy")}</Icon>
            <Text>{platinumCount}</Text>
          </PurpleTrophy>
          <GoldTrophy>
            <Icon fontSize={"2.5rem"}>{getIcon("trophy")}</Icon>
            <Text>{goldCount}</Text>
          </GoldTrophy>
        </LevelContainer>
        <LevelContainerRow>
          <SilverTrophy>
            <Icon fontSize={"2.5rem"}>{getIcon("trophy")}</Icon>
            <Text>{silverCount}</Text>
          </SilverTrophy>
          <BronzeTrophy>
            <Icon fontSize={"2.5rem"}>{getIcon("trophy")}</Icon>
            <Text>{silverCount}</Text>
          </BronzeTrophy>
        </LevelContainerRow>
      </LevelFragment>
    </Container>
  );
};

export default ProfilePlatinum;
