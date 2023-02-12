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
import {
  COMMON_COLOR,
  EPIC_COLOR,
  LEGENDARY,
  LEGENDARY_COLOR,
  MARVEL_COLOR,
  RARE_COLOR,
  UNCOMMON_COLOR,
  WASTE_COLOR,
} from "../../helpers/colorHelper";
import { getIcon } from "../../helpers/iconHelper";
import { calculateRarityLeftFromGames } from "../../helpers/xpHelper";

const Container = styled.div`
  display: flex;
  backdrop-filter: blur(10px);
  align-items: center;
  padding: 1rem;
  justify-content: center;
  margin-top: 0.5rem;
  background-color: rgba(0, 0, 0, 0.3);
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

const Level = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  padding: 1rem 0rem 0rem 0rem;
  margin-top: "0.5rem";
  flex-wrap: wrap;
`;

const Trophy = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 50px;
  justify-content: center;
  color: ${(props) => (props.color ? props.color : "")};
  margin-top: 0.5rem;
  font-size: 2rem;
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
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.75rem")};
`;

const ProfilePlatinum = (props) => {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games } = steamtracker;

  const { waste, common, uncommon, rare, epic, legendary, marvel } =
    calculateRarityLeftFromGames(games);

  return (
    <Container
      onClick={() => {
        if (window !== "undefined") {
          const searchQuery = `${game.name} trophy guide `;
          window.open(`https://www.google.com/search?q=${searchQuery}`);
        }
      }}
    >
      <LevelFragment>
        <Header>
          <HiOutlineChevronDoubleUp
            style={{ marginRight: "0.5rem", color: "#6cff5c" }}
          />
          <Title>RARITY</Title>
          <HiOutlineChevronDoubleUp
            style={{ marginLeft: "0.5rem", color: "#6cff5c" }}
          />
        </Header>
        <Level>
          <Trophy color={MARVEL_COLOR}>
            <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
            <Text>{marvel}</Text>
          </Trophy>
        </Level>
        <Level>
          <Trophy color={LEGENDARY_COLOR}>
            <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
            <Text>{legendary}</Text>
          </Trophy>
          <Trophy color={EPIC_COLOR}>
            <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
            <Text>{epic}</Text>
          </Trophy>
        </Level>
        <Level>
          <Trophy color={RARE_COLOR}>
            <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
            <Text>{rare}</Text>
          </Trophy>
          <Trophy color={UNCOMMON_COLOR}>
            <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
            <Text>{uncommon}</Text>
          </Trophy>
        </Level>
        <Level>
          <Trophy color={COMMON_COLOR}>
            <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
            <Text>{common}</Text>
          </Trophy>
          <Trophy color={WASTE_COLOR}>
            <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
            <Text>{waste}</Text>
          </Trophy>
        </Level>
      </LevelFragment>
    </Container>
  );
};

export default ProfilePlatinum;
