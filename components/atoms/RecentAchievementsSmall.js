import React from "react";
import styled from "styled-components";
import AchievementIcon from "./AchievementIcon";
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
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
          return <AchievementIcon achievement={achievement} />;
        })}
    </Container>
  );
}
