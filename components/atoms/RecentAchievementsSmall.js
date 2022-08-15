import React from "react";
import styled from "styled-components";
import AchievementCard from "./AchievementCard";
import AchievementCardWithPhase from "./AchievementCardWithPhase";
import AchievementIcon from "./AchievementIcon";
const Container = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  overflow: scroll;
  height: 100%;
`;

export default function RecentAchievementsSmall({ games }) {
  let unlockedAchievements = [];
  games.forEach((game) => {
    game.achievements.forEach((achievement) => {
      if (achievement.achieved == 1) {
        unlockedAchievements.push({ ...achievement, gameId: game.id });
      }
    });
  });
  unlockedAchievements = unlockedAchievements.sort(
    (ach1, ach2) => +ach1.unlocktime < +ach2.unlocktime
  );

  return (
    <Container>
      {unlockedAchievements.length &&
        unlockedAchievements.map((achievement) => {
          return <AchievementCardWithPhase achievement={achievement} />;
        })}
    </Container>
  );
}
