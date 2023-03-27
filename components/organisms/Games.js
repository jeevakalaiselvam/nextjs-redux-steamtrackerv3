import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import GameCard from "../atoms/GameCard";
import * as Loaders from "react-spinners";
import {
  sortsearchFilteredGamesByFilterOption,
  sortGamesBySearchTerm,
  sortGamesByFilterOption,
} from "../../helpers/gameHelper";
import e from "cors";
import {
  GAMES_OPTION_COMPLETION_DESC,
  GAMES_OPTION_COMPLETION_PINNED,
  GAMES_OPTION_RECENT,
} from "../../helpers/filterHelper";
import { getIcon } from "../../helpers/iconHelper";
import {
  COMMON_COLOR,
  COMPLETION0_COLOR,
  COMPLETION100_COLOR,
  COMPLETION10_COLOR,
  COMPLETION25_COLOR,
  COMPLETION50_COLOR,
  COMPLETION75_COLOR,
  COMPLETION90_COLOR,
  MARVEL,
  MARVEL_COLOR,
} from "../../helpers/colorHelper";
import {
  calculateRarityLeftFromAchievements,
  COMPLETION0,
  COMPLETION1,
  COMPLETION10,
  COMPLETION100,
  COMPLETION25,
  COMPLETION50,
  COMPLETION75,
  COMPLETION90,
} from "../../helpers/xpHelper";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GamesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  max-height: 100vh;
  margin: 1rem 1.5rem;
  padding: 0 1rem;
  min-width: 300px;
  max-width: 300px;
  flex-direction: column;
`;

const XPContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 8;
  text-align: center;
  padding: 0.25rem;
  color: ${(props) => (props.iconColor ? props.iconColor : "")};
  transition: all 0.5s;
`;

const XPIcon = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  z-index: 8;
  justify-content: center;
`;

const XPData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 8;
  font-size: ${(props) => (props.complete ? "1.5rem" : "2rem")};
`;

const GamesList = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  overflow: scroll;
`;

export default function Games({ games, filterOption, searchTerm }) {
  const [searchFilteredGames, setSearchFilteredGames] = useState([]);
  const steamtracker = useSelector((state) => state.steamtracker);
  const { pinnedGames, settings, targetSettings, sidebarGameFilter } =
    steamtracker;
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
    let backlogCount = 0;
    games.forEach((game) => {
      let total = game?.achievements?.length ?? 0;
      let toGet = game?.toGet ?? 0;
      let completed = total - toGet;
      let adjustedTotal = Math.ceil((completionPercentageTarget / 100) * total);

      const adjustedCompletion = Math.ceil(game.completion);

      if (completed >= 1) {
        if (adjustedCompletion == COMPLETION100) {
          infinityCount++;
        } else if (
          adjustedCompletion < COMPLETION100 &&
          adjustedCompletion >= COMPLETION90
        ) {
          marvelCount++;
        } else if (
          adjustedCompletion < COMPLETION90 &&
          adjustedCompletion >= COMPLETION75
        ) {
          legendaryCount++;
        } else if (
          adjustedCompletion < COMPLETION75 &&
          adjustedCompletion >= COMPLETION50
        ) {
          epicCount++;
        } else if (
          adjustedCompletion < COMPLETION50 &&
          adjustedCompletion >= COMPLETION25
        ) {
          rareCount++;
        } else if (
          adjustedCompletion < COMPLETION25 &&
          adjustedCompletion >= COMPLETION10
        ) {
          wasteCount++;
        } else if (
          adjustedCompletion < COMPLETION10 &&
          adjustedCompletion >= COMPLETION1
        ) {
          copperCount++;
        } else {
        }
      } else {
        backlogCount += 1;
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
      backlogCount,
    };
  }, [games]);

  useEffect(() => {
    const searchFilteredGames = games.filter((game) => {
      if (searchTerm == "") {
        return true;
      } else {
        if (
          game.name
            .toLowerCase()
            .trim()
            ?.includes(searchTerm.toLowerCase().trim())
        ) {
          return true;
        }
      }
    });

    let filteredGames = [];

    if (searchTerm !== "") {
      filteredGames = searchFilteredGames;
    } else {
      filteredGames = sortGamesByFilterOption(
        searchFilteredGames,
        GAMES_OPTION_COMPLETION_DESC,
        pinnedGames ?? [],
        completionPercentageTarget ?? 100,
        targetSettings,
        sidebarGameFilter ?? "NONE"
      );
    }

    setSearchFilteredGames((old) => filteredGames);
  }, [
    searchTerm,
    filterOption,
    pinnedGames,
    sidebarGameFilter,
    games,
    GAMES_OPTION_RECENT,
  ]);

  return (
    <Container>
      <GamesContainer>
        <XPContainer iconColor={COMMON_COLOR}>
          <XPIcon>{getIcon("trophy")}</XPIcon>
          <XPData complete={true}>{allCounts.backlogCount}</XPData>
        </XPContainer>
        <GamesList>
          {searchFilteredGames.length > 0 &&
            searchFilteredGames
              .filter((game) => {
                return game.completion < COMPLETION10;
              })
              .map((game) => {
                return <GameCard game={game} key={game.id} />;
              })}
          {searchFilteredGames.length === 0 && <Loaders.HashLoader />}
        </GamesList>
      </GamesContainer>
      <GamesContainer>
        <XPContainer iconColor={COMPLETION100_COLOR}>
          <XPIcon>{getIcon("trophy")}</XPIcon>
          <XPData complete={true}>{allCounts.infinityCount}</XPData>
        </XPContainer>
        <GamesList>
          {searchFilteredGames.length > 0 &&
            searchFilteredGames
              .filter((game) => {
                return game.completion == COMPLETION100;
              })
              .map((game) => {
                return <GameCard game={game} key={game.id} />;
              })}
          {searchFilteredGames.length === 0 && <Loaders.HashLoader />}
        </GamesList>
      </GamesContainer>
      <GamesContainer>
        <XPContainer iconColor={COMPLETION90_COLOR}>
          <XPIcon>{getIcon("trophy")}</XPIcon>
          <XPData complete={true}>{allCounts.marvelCount}</XPData>
        </XPContainer>
        <GamesList>
          {searchFilteredGames.length > 0 &&
            searchFilteredGames
              .filter((game) => {
                return (
                  game.completion >= COMPLETION90 &&
                  game.completion < COMPLETION100
                );
              })
              .map((game) => {
                return <GameCard game={game} key={game.id} />;
              })}
          {searchFilteredGames.length === 0 && <Loaders.HashLoader />}
        </GamesList>
      </GamesContainer>
      <GamesContainer>
        <XPContainer iconColor={COMPLETION75_COLOR}>
          <XPIcon>{getIcon("trophy")}</XPIcon>
          <XPData complete={true}>{allCounts.legendaryCount}</XPData>
        </XPContainer>
        <GamesList>
          {searchFilteredGames.length > 0 &&
            searchFilteredGames
              .filter((game) => {
                return (
                  game.completion >= COMPLETION75 &&
                  game.completion < COMPLETION90
                );
              })
              .map((game) => {
                return <GameCard game={game} key={game.id} />;
              })}
          {searchFilteredGames.length === 0 && <Loaders.HashLoader />}
        </GamesList>
      </GamesContainer>
      <GamesContainer>
        <XPContainer iconColor={COMPLETION50_COLOR}>
          <XPIcon>{getIcon("trophy")}</XPIcon>
          <XPData complete={true}>{allCounts.epicCount}</XPData>
        </XPContainer>
        <GamesList>
          {searchFilteredGames.length > 0 &&
            searchFilteredGames
              .filter((game) => {
                return (
                  game.completion >= COMPLETION50 &&
                  game.completion < COMPLETION75
                );
              })
              .map((game) => {
                return <GameCard game={game} key={game.id} />;
              })}
          {searchFilteredGames.length === 0 && <Loaders.HashLoader />}
        </GamesList>
      </GamesContainer>
      <GamesContainer>
        <XPContainer iconColor={COMPLETION25_COLOR}>
          <XPIcon>{getIcon("trophy")}</XPIcon>
          <XPData complete={true}>{allCounts.copperCount}</XPData>
        </XPContainer>
        <GamesList>
          {searchFilteredGames.length > 0 &&
            searchFilteredGames
              .filter((game) => {
                return (
                  game.completion >= COMPLETION25 &&
                  game.completion < COMPLETION50
                );
              })
              .map((game) => {
                return <GameCard game={game} key={game.id} />;
              })}
          {searchFilteredGames.length === 0 && <Loaders.HashLoader />}
        </GamesList>
      </GamesContainer>
      <GamesContainer>
        <XPContainer iconColor={COMPLETION10_COLOR}>
          <XPIcon>{getIcon("trophy")}</XPIcon>
          <XPData complete={true}>{allCounts.wasteCount}</XPData>
        </XPContainer>
        <GamesList>
          {searchFilteredGames.length > 0 &&
            searchFilteredGames
              .filter((game) => {
                return (
                  game.completion >= COMPLETION10 &&
                  game.completion < COMPLETION25
                );
              })
              .map((game) => {
                return <GameCard game={game} key={game.id} />;
              })}
          {searchFilteredGames.length === 0 && <Loaders.HashLoader />}
        </GamesList>
      </GamesContainer>
    </Container>
  );
}
