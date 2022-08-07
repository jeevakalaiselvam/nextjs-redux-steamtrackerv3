import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getAllUnlockedAchievements,
  getaUnlockedAchievementsByRecent30Days,
} from "../../helpers/achievementHelper";
import {
  getAchievmentCountForADay,
  getLast30DaysUTCTimes,
} from "../../helpers/calendarHelper";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 1rem 0.5rem;
  justify-content: center;
`;

const AchievementDayCount = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  align-items: center;
  padding: 0.5rem;
  margin: 0.5rem 0.25rem;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
`;

export default function AchievementCalendarHistory() {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games } = steamtracker;

  const router = useRouter();
  const { gameId } = router.query;

  const game = games.find((game) => game.id == gameId);

  return (
    <Container>
      {games &&
        Object.keys(achievmentsMapper).map((key) => {
          return (
            <AchievementDayCount onClick={() => {}}>
              {achievmentsMapper[key].length || 0}
            </AchievementDayCount>
          );
        })}
    </Container>
  );
}
