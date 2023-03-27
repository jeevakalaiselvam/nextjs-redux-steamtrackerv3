import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Loaders from "react-spinners";
import {
  filterAchievementsByRarityFilter,
  getaUnlockedAchievementsByType,
  sortAchievementsByFilterOption,
} from "../../helpers/achievementHelper";
import AchievementCard from "../atoms/AchievementCard";
import { HEADER_IMAGE } from "../../helpers/urlHelper";
import { useRouter } from "next/router";
import AchievementCardWithPhase from "../atoms/AchievementCardWithPhase";
import NoAchievements from "../atoms/NoAchievements";
import AchievementCardWithPhaseBig from "../atoms/AchievementCardWithPhaseBig";
import { useSelector } from "react-redux";
import { calculateRarityLeftFromAchievements } from "../../helpers/xpHelper";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (!props.noWrap ? "center" : "flex-start")};
  position: relative;
  width: 100%;
  max-height: 100%;
  min-height: 100%;
  overflow: scroll;
  flex-wrap: ${(props) => (props.noWrap ? "wrap" : "wrap")};
  position: relative;
  z-index: 3;
`;

export default function Achievements({
  game,
  filterOption,
  searchTerm,
  showPhase,
  phase,
  showIgnore,
  totalXP,
  activateCompletionOpacity,
  showOnly,
  noWrap,
  pinnedOnly,
  includeAll,
  animateRight,
  setAchCount,
  hidePinned,
  planner,
}) {
  const [searchFilteredAchievements, setSearchFilteredAchievements] = useState(
    []
  );

  const router = useRouter();
  const { gameId } = router.query;
  const steamtracker = useSelector((state) => state.steamtracker);
  const { rarityFilters, pinnedAchievements, targetSettings } = steamtracker;

  useEffect(() => {
    if (game?.id) {
      const searchFilteredAchievements = game.achievements.filter(
        (achievement) => {
          if (searchTerm == "") {
            return true;
          } else {
            if (achievement?.displayName && achievement?.description) {
              if (
                achievement.displayName
                  .toLowerCase()
                  .trim()
                  ?.includes(searchTerm.toLowerCase().trim()) ||
                achievement.description
                  .toLowerCase()
                  .trim()
                  ?.includes(searchTerm.toLowerCase().trim())
              ) {
                return true;
              }
            }
          }
        }
      );

      const filteredAchievements = sortAchievementsByFilterOption(
        searchFilteredAchievements,
        filterOption,
        gameId
      );

      const rarityInfo = calculateRarityLeftFromAchievements(
        game.achievements,
        targetSettings
      );

      let rarityFilteredAchievements = filterAchievementsByRarityFilter(
        filteredAchievements,
        gameId,
        rarityFilters,
        rarityInfo
      );

      let finalAchievementToSet = [];

      finalAchievementToSet = rarityFilteredAchievements;

      if (includeAll) {
        finalAchievementToSet = filteredAchievements;
      }

      if (showOnly) {
        finalAchievementToSet = getaUnlockedAchievementsByType(
          filteredAchievements,
          "TODAY"
        );
      }

      let pinnedOrNotAchievements = finalAchievementToSet;

      if (pinnedOnly) {
        pinnedOrNotAchievements = filteredAchievements.filter((achievement) => {
          if ((pinnedAchievements[game.id] ?? []).includes(achievement.name)) {
            return true;
          } else {
            return false;
          }
        });
      }

      pinnedOrNotAchievements = pinnedOrNotAchievements.sort(
        (ach1, ach2) => ach2.percentage - ach1.percentage
      );
      if (planner) {
        pinnedOrNotAchievements = pinnedOrNotAchievements.sort(
          (ach1, ach2) => ach1.unlocktime - ach2.unlocktime
        );
      }
      setSearchFilteredAchievements((old) => pinnedOrNotAchievements);
    }
  }, [
    searchTerm,
    filterOption,
    game,
    showIgnore,
    rarityFilters,
    pinnedOnly,
    pinnedAchievements,
    rarityFilters[game?.id],
  ]);

  return (
    <Container noWrap={noWrap}>
      {showOnly !== "TODAY" &&
        searchFilteredAchievements.length > 0 &&
        searchFilteredAchievements.map((achievement, index) => {
          let hiddenDescription = "HIDDEN";
          if (game?.hiddenAchievements) {
            hiddenDescription =
              game?.hiddenAchievements[
                achievement.displayName.toLowerCase().trim()
              ];
          }
          return (
            <AchievementCardWithPhase
              hidePinned={hidePinned}
              gameId={gameId}
              gameName={name}
              achievement={achievement}
              key={achievement.name}
              hiddenDescription={hiddenDescription}
              phase={phase}
              animateRight={animateRight}
              index={index}
              showIgnore={showIgnore}
              activateCompletionOpacity={activateCompletionOpacity}
              showPhase={showPhase}
            />
          );
        })}
      {showOnly == "TODAY" &&
        todayOnly.length > 0 &&
        todayOnly.map((achievement, index) => {
          let hiddenDescription = "HIDDEN";
          if (game?.hiddenAchievements) {
            hiddenDescription =
              game?.hiddenAchievements[
                achievement.displayName.toLowerCase().trim()
              ];
          }
          if (showPhase) {
            return (
              <AchievementCardWithPhase
                hidePinned={hidePinned}
                gameId={gameId}
                gameName={name}
                index={index}
                achievement={achievement}
                key={achievement.name}
                animateRight={animateRight}
                hiddenDescription={hiddenDescription}
                phase={phase}
                showIgnore={showIgnore}
                activateCompletionOpacity={false}
                showPhase={showPhase}
              />
            );
          } else {
            return (
              <AchievementCardWithPhase
                hidePinned={hidePinned}
                gameId={gameId}
                gameName={name}
                index={index}
                achievement={achievement}
                key={achievement.name}
                animateRight={animateRight}
                hiddenDescription={hiddenDescription}
                phase={phase}
                showIgnore={showIgnore}
                activateCompletionOpacity={false}
                showPhase={showPhase}
              />
            );
          }
        })}
      {!searchFilteredAchievements && <Loaders.HashLoader />}
      {searchFilteredAchievements.length === 0 && <NoAchievements />}
    </Container>
  );
}
