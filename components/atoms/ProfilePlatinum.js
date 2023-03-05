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
  COMPLETION10_COLOR,
  COMPLETION1_COLOR,
  COPPER,
  EPIC,
  EPIC_COLOR,
  INFINITY,
  INFINITY_COLOR,
  LEGENDARY,
  LEGENDARY_COLOR,
  MARVEL,
  MARVEL_COLOR,
  RARE,
  RARE_COLOR,
  UNCOMMON_COLOR,
  WASTE,
  WASTE_COLOR,
} from "../../helpers/colorHelper";
import { getIcon } from "../../helpers/iconHelper";
import {
  calculateRarityLeftFromAchievements,
  calculateRarityLeftFromGames,
  COMPLETION100,
  COMPLETION90,
  COMPLETION75,
  COMPLETION50,
  COMPLETION25,
  COMPLETION10,
  COMPLETION1,
} from "../../helpers/xpHelper";
import { setSidebarGameFilter } from "../../store/actions/games.actions";

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
    let copperCount = 0;
    let subPlatinum = 0;
    games.forEach((game) => {
      let total = game?.achievements?.length ?? 0;
      let toGet = game?.toGet ?? 0;
      let completed = total - toGet;
      let adjustedTotal = Math.ceil((completionPercentageTarget / 100) * total);

      if (completed >= 1) {
        if (game.completion == COMPLETION100) {
          infinityCount++;
        } else if (
          game.completion < COMPLETION100 &&
          game.completion >= COMPLETION90
        ) {
          marvelCount++;
        } else if (
          game.completion < COMPLETION90 &&
          game.completion >= COMPLETION75
        ) {
          legendaryCount++;
        } else if (
          game.completion < COMPLETION75 &&
          game.completion >= COMPLETION50
        ) {
          epicCount++;
        } else if (
          game.completion < COMPLETION50 &&
          game.completion >= COMPLETION25
        ) {
          rareCount++;
        } else if (
          game.completion < COMPLETION25 &&
          game.completion >= COMPLETION10
        ) {
          wasteCount++;
        } else if (
          game.completion < COMPLETION10 &&
          game.completion >= COMPLETION1
        ) {
          copperCount++;
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
      copperCount,
    };
  }, [games]);

  const trophClickedHandler = (rarity) => {
    dispatch(setSidebarGameFilter(rarity));
  };

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
          <Title
            onClick={() => {
              trophClickedHandler("NONE");
            }}
          >
            COLLECTION
          </Title>
          <HiOutlineChevronDoubleUp
            style={{ marginLeft: "0.5rem", color: "#6cff5c" }}
          />
        </Header>

        <LevelContainer>
          <Level>
            <Trophy
              color={INFINITY_COLOR}
              onClick={() => {
                trophClickedHandler(INFINITY);
              }}
            >
              <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
              <Text>{allCounts.infinityCount}</Text>
            </Trophy>
          </Level>
          <Level>
            <Trophy
              color={MARVEL_COLOR}
              onClick={() => {
                trophClickedHandler(MARVEL);
              }}
            >
              <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
              <Text>{allCounts.marvelCount}</Text>
            </Trophy>
          </Level>
          <Level>
            <Trophy
              color={LEGENDARY_COLOR}
              onClick={() => {
                trophClickedHandler(LEGENDARY);
              }}
            >
              <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
              <Text>{allCounts.epicCount}</Text>
            </Trophy>
          </Level>
        </LevelContainer>
        <LevelContainer>
          <Level>
            <Trophy
              color={EPIC_COLOR}
              onClick={() => {
                trophClickedHandler(EPIC);
              }}
            >
              <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
              <Text>{allCounts.legendaryCount}</Text>
            </Trophy>
          </Level>
          <Level>
            <Trophy
              color={RARE_COLOR}
              onClick={() => {
                trophClickedHandler(RARE);
              }}
            >
              <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
              <Text>{allCounts.rareCount}</Text>
            </Trophy>
          </Level>
          <Level>
            <Trophy
              color={COMPLETION10_COLOR}
              onClick={() => {
                trophClickedHandler(WASTE);
              }}
            >
              <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
              <Text>{allCounts.wasteCount}</Text>
            </Trophy>
          </Level>
          <Level>
            <Trophy
              color={COMPLETION1_COLOR}
              onClick={() => {
                trophClickedHandler(COPPER);
              }}
            >
              <Icon fontSize={"2rem"}>{getIcon("trophy")}</Icon>
              <Text>{allCounts.copperCount}</Text>
            </Trophy>
          </Level>
        </LevelContainer>
      </LevelFragment>
    </Container>
  );
};

export default ProfilePlatinum;
