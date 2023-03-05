import { useRouter } from "next/router";
import React from "react";
import { useMemo } from "react";
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
  COMMON,
  COMMON_COLOR,
  EPIC,
  EPIC_COLOR,
  INFINITY_COLOR,
  LEGENDARY,
  LEGENDARY_COLOR,
  MARVEL_COLOR,
  RARE_COLOR,
  UNCOMMON_COLOR,
  WASTE_COLOR,
} from "../../helpers/colorHelper";
import { getIcon } from "../../helpers/iconHelper";
import {
  calculateRarityLeftFromAchievements,
  calculateRarityLeftFromGames,
  EPIC_TROPHY_PERCENTAGE,
  INFINITY_TROPHY_PERCENTAGE,
  LEGENDARY_TROPHY_PERCENTAGE,
  MARVEL_TROPHY_PERCENTAGE,
  RARE_TROPHY_PERCENTAGE,
  WASTE_TROPHY_PERCENTAGE,
} from "../../helpers/xpHelper";

const Container = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
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
  padding: 0.5rem 0rem 0rem 0rem;
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
  font-size: 1rem;
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
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.5rem")};
`;

const LevelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProfilePlatinum = (props) => {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings, targetSettings } = steamtracker;
  const { settingsPage } = settings;
  const { completionPercentageTarget } = settingsPage;

  let allCounts = useMemo(() => {
    let infinityCount = 0;
    let marvelCount = 0;
    let epicCount = 0;
    let legendaryCount = 0;
    let rareCount = 0;
    let commonCount = 0;
    let wasteCount = 0;
    let subPlatinum = 0;
    games.forEach((game) => {
      let total = game?.achievements?.length ?? 0;
      let toGet = game?.toGet ?? 0;
      let completed = total - toGet;
      let adjustedTotal = Math.ceil((completionPercentageTarget / 100) * total);

      if (completed >= 1) {
        if (game.completion == INFINITY_TROPHY_PERCENTAGE) {
          infinityCount++;
        } else if (
          game.completion < INFINITY_TROPHY_PERCENTAGE &&
          game.completion >= MARVEL_TROPHY_PERCENTAGE
        ) {
          marvelCount++;
        } else if (
          game.completion < MARVEL_TROPHY_PERCENTAGE &&
          game.completion >= LEGENDARY_TROPHY_PERCENTAGE
        ) {
          legendaryCount++;
        } else if (
          game.completion < LEGENDARY_TROPHY_PERCENTAGE &&
          game.completion >= EPIC_TROPHY_PERCENTAGE
        ) {
          epicCount++;
        } else if (
          game.completion < EPIC_TROPHY_PERCENTAGE &&
          game.completion >= RARE_TROPHY_PERCENTAGE
        ) {
          rareCount++;
        } else if (
          game.completion < RARE_TROPHY_PERCENTAGE &&
          game.completion >= WASTE_TROPHY_PERCENTAGE
        ) {
          wasteCount++;
        } else {
        }
      }
      const rarityInfo = calculateRarityLeftFromAchievements(
        game.achievements,
        targetSettings
      );

      if (rarityInfo.remainingInTarget <= 0) {
        subPlatinum++;
      }
    });
    return {
      infinityCount,
      marvelCount,
      epicCount,
      legendaryCount,
      rareCount,
      commonCount,
      wasteCount,
    };
  }, [games]);

  return (
    <Container
      onClick={() => {
        if (window !== "undefined") {
        }
      }}
    >
      <LevelFragment>
        <Header>
          <HiOutlineChevronDoubleUp
            style={{ marginRight: "0.5rem", color: "#6cff5c" }}
          />
          <Title>COLLECTION</Title>
          <HiOutlineChevronDoubleUp
            style={{ marginLeft: "0.5rem", color: "#6cff5c" }}
          />
        </Header>

        <LevelContainer>
          <Level>
            <Trophy color={INFINITY_COLOR}>
              <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
              <Text>{allCounts.infinityCount}</Text>
            </Trophy>
          </Level>
          <Level>
            <Trophy color={MARVEL_COLOR}>
              <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
              <Text>{allCounts.marvelCount}</Text>
            </Trophy>
          </Level>
          <Level>
            <Trophy color={LEGENDARY_COLOR}>
              <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
              <Text>{allCounts.epicCount}</Text>
            </Trophy>
          </Level>
        </LevelContainer>
        <LevelContainer>
          <Level>
            <Trophy color={EPIC_COLOR}>
              <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
              <Text>{allCounts.legendaryCount}</Text>
            </Trophy>
          </Level>
          <Level>
            <Trophy color={RARE_COLOR}>
              <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
              <Text>{allCounts.rareCount}</Text>
            </Trophy>
          </Level>
          <Level>
            <Trophy color={WASTE_COLOR}>
              <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
              <Text>{allCounts.wasteCount}</Text>
            </Trophy>
          </Level>
        </LevelContainer>
      </LevelFragment>
    </Container>
  );
};

export default ProfilePlatinum;
