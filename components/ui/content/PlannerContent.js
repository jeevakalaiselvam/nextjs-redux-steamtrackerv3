import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { setHiddenAchievementsForGame } from "../../../store/actions/games.actions";
import AchievementCardWithPhase from "../../atoms/AchievementCardWithPhase";
import Achievements from "../../organisms/Achievements";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 0.25rem;
  height: 100%;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const PhaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  min-height: 95vw;
  max-height: 95vw;
  overflow: scroll;
`;

export default function PlannerContent() {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings } = steamtracker;
  const { plannerPage } = settings;
  const {
    phase1Filter,
    phase1Search,
    phase2Filter,
    phase2Search,
    phase3Filter,
    phase3Search,
    phase4Filter,
    phase4Search,
    phase5Filter,
    phase5Search,
    phase6Filter,
    phase6Search,
  } = plannerPage;

  const router = useRouter();
  const { gameId } = router.query;

  const game = games.find((game) => game.id == gameId);

  useEffect(() => {
    const getHidden = async () => {
      const hiddenResponse = await axios.get(`/api/hidden/${gameId}`);
      const hiddenData = hiddenResponse.data.hiddenMapper;
      dispatch(setHiddenAchievementsForGame(gameId, hiddenData));
    };
    if (game && !game.hiddenAchivements) {
      getHidden();
    }
  }, [gameId]);

  return (
    <Container>
      <PhaseContainer>
        <HeaderContainer>ALL</HeaderContainer>
        <Achievements
          game={game}
          filterOption={phase1Filter}
          searchTerm={phase1Search}
          showPhase={true}
        />
      </PhaseContainer>
      <PhaseContainer>
        <HeaderContainer>EASY</HeaderContainer>
        <Achievements
          game={game}
          filterOption={phase2Filter}
          searchTerm={phase2Search}
          showPhase={true}
        />
      </PhaseContainer>
      <PhaseContainer>
        <HeaderContainer>HARD</HeaderContainer>
        <Achievements
          game={game}
          filterOption={phase3Filter}
          searchTerm={phase3Search}
          showPhase={true}
        />
      </PhaseContainer>
      <PhaseContainer>
        <HeaderContainer>GRIND</HeaderContainer>
        <Achievements
          game={game}
          filterOption={phase4Filter}
          searchTerm={phase4Search}
          showPhase={true}
        />
      </PhaseContainer>
      <PhaseContainer>
        <HeaderContainer>MISSABLE</HeaderContainer>
        <Achievements
          game={game}
          filterOption={phase5Filter}
          searchTerm={phase5Search}
          showPhase={true}
        />
      </PhaseContainer>
      <PhaseContainer>
        <HeaderContainer>RECENTLY UNLOCKED</HeaderContainer>
        <Achievements
          game={game}
          filterOption={phase6Filter}
          searchTerm={phase6Search}
          showPhase={true}
        />
      </PhaseContainer>
    </Container>
  );
}
