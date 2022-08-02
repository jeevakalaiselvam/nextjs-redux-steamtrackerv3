import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Loaders from "react-spinners";
import { sortAchievementsByFilterOption } from "../../helpers/achievementHelper";
import AchievementCard from "../atoms/AchievementCard";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 100%;
  min-height: 100%;
  overflow: scroll;
  flex-wrap: wrap;
`;

export default function Achievements({ game, filterOption, searchTerm }) {
  const { achievements, hiddenAchievements } = game || {};
  const [searchFilteredAchievements, setSearchFilteredAchievements] = useState(
    []
  );

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
          return (
            <AchievementCard
              achievement={achievement}
              key={achievement.name}
              hiddenDescription={
                hiddenAchievements[
                  achievement.displayName.toLowerCase().trim()
                ] || "HIDDEN"
              }
            />
          );
        })}
      {searchFilteredAchievements.length === 0 && <Loaders.HashLoader />}
    </Container>
  );
}
