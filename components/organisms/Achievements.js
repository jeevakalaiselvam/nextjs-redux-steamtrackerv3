import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Loaders from "react-spinners";
import { sortAchievementsByFilterOption } from "../../helpers/achievementHelper";
import AchievementCard from "../atoms/AchievementCard";
import { HEADER_IMAGE } from "../../helpers/urlHelper";
import { useRouter } from "next/router";
import AchievementCardWithPhase from "../atoms/AchievementCardWithPhase";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 100%;
  min-height: 100%;
  overflow: scroll;
  flex-wrap: wrap;
  position: relative;
  z-index: 3;
`;

export default function Achievements({
  game,
  filterOption,
  searchTerm,
  showPhase,
  phase,
}) {
  const { achievements, hiddenAchievements, name } = game || {
    hiddenAchievements: [],
  };
  const [searchFilteredAchievements, setSearchFilteredAchievements] = useState(
    []
  );

  const router = useRouter();
  const { gameId } = router.query;

  useEffect(() => {
    if (achievements) {
      const searchFilteredAchievements = achievements.filter((achievement) => {
        if (searchTerm == "") {
          return true;
        } else {
          if (
            achievement.displayName
              .toLowerCase()
              .trim()
              .includes(searchTerm.toLowerCase().trim()) ||
            achievement.description
              .toLowerCase()
              .trim()
              .includes(searchTerm.toLowerCase().trim())
          ) {
            return true;
          }
        }
      });

      const filteredAchievements = sortAchievementsByFilterOption(
        searchFilteredAchievements,
        filterOption
      );

      setSearchFilteredAchievements((old) => filteredAchievements);
    }
  }, [searchTerm, filterOption, game]);

  return (
    <Container>
      {searchFilteredAchievements.length > 0 &&
        searchFilteredAchievements.map((achievement) => {
          let hiddenDescription = "HIDDEN";
          if (hiddenAchievements) {
            hiddenDescription =
              hiddenAchievements[achievement.displayName.toLowerCase().trim()];
          }
          if (showPhase) {
            return (
              <AchievementCardWithPhase
                gameName={name}
                achievement={achievement}
                key={achievement.name}
                hiddenDescription={hiddenDescription}
                phase={phase}
              />
            );
          } else {
            return (
              <AchievementCard
                gameName={name}
                achievement={achievement}
                key={achievement.name}
                hiddenDescription={hiddenDescription}
              />
            );
          }
        })}
      {searchFilteredAchievements.length === 0 && (
        <h4 style={{ fontWeight: "500" }}>No Achievements</h4>
      )}
    </Container>
  );
}
