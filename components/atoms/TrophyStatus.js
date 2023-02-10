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
import { getIcon } from "../../helpers/iconHelper";
import {
  calculateLevelFromAllGames,
  COMPLETION_TARGET,
} from "../../helpers/xpHelper";

const Container = styled.div`
  display: flex;
  backdrop-filter: blur(10px);
  align-items: center;
  padding: 1rem;
  justify-content: center;
  flex-direction: column;
  width: 95%;
  cursor: pointer;
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

const PurpleTrophy = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 2rem;
  margin-right: 3rem;
  margin-left: 3rem;
`;

const GoldTrophy = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  color: #f1b51b;
  font-size: 2rem;
  margin-right: 3rem;
`;

const SilverTrophy = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  color: #c0c0c0;
  font-size: 3rem;
  margin-right: 3rem;
`;

const BronzeTrophy = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  color: #b87333;
  font-size: 3rem;
  margin-right: 3rem;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 60px;
  height: 60px;
  justify-content: center;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "2.1rem")};
  background: url("/platinumNew.png");
  background-size: contain;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.75rem")};
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
        <LevelContainer>
          <PurpleTrophy>
            <Icon fontSize={"2rem"}></Icon>
            <Text>{platinumCount}</Text>
          </PurpleTrophy>
          {/* <GoldTrophy>
            <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
            <Text>{goldCount}</Text>
          </GoldTrophy>
          <SilverTrophy>
            <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
            <Text>{silverCount}</Text>
          </SilverTrophy>
          <BronzeTrophy>
            <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
            <Text>{bronzeCount}</Text>
          </BronzeTrophy> */}
        </LevelContainer>
      </LevelFragment>
    </Container>
  );
};

export default ProfilePlatinum;
