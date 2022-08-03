import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import {
  setHiddenAchievementsForGame,
  setPhaseAddedGames,
} from "../../../store/actions/games.actions";
import AchievementCardWithPhase from "../../atoms/AchievementCardWithPhase";
import Achievements from "../../organisms/Achievements";
import {
  ALL,
  EASY,
  getPhaseAddedGames,
  GRIND,
  HARD,
  MISSABLE,
  tranformGameToIncludeOnlyPhase,
  tranformGameToIncludeOnlyUnlockedRecent,
  UNLOCKED,
} from "../../../helpers/gameHelper";
import Search from "../../atoms/Search";

const Container = styled.div`
  display: flex;
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
  justify-content: flex-start;
  padding: 0.5rem 1.5rem;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0.5rem 1.5rem;
  justify-content: center;
`;

const PhaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  min-width: 300px;
  flex: 1;
  min-height: 95vw;
  max-height: 95vw;
  overflow: scroll;
`;

export default function PlannerContent() {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings, planner } = steamtracker;
  const { phaseAddedGame } = planner;
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

  useEffect(() => {
    const newGame = getPhaseAddedGames(game);
    dispatch(setPhaseAddedGames(newGame));
  }, [game]);

  const phaseAchievements = phaseAddedGame.achievements || [];
  const phase1InnerAchievements = tranformGameToIncludeOnlyPhase(
    phaseAchievements,
    ALL
  );
  const phase2InnerAchievements = tranformGameToIncludeOnlyPhase(
    phaseAchievements,
    EASY
  );
  const phase3InnerAchievements = tranformGameToIncludeOnlyPhase(
    phaseAchievements,
    HARD
  );
  const phase4InnerAchievements = tranformGameToIncludeOnlyPhase(
    phaseAchievements,
    GRIND
  );
  const phase5InnerAchievements = tranformGameToIncludeOnlyPhase(
    phaseAchievements,
    MISSABLE
  );
  const phase6InnerAchievements =
    tranformGameToIncludeOnlyUnlockedRecent(phaseAchievements);

  const phase1Game = {
    ...phaseAddedGame,
    achievements: phase1InnerAchievements,
  };
  const phase2Game = {
    ...phaseAddedGame,
    achievements: phase2InnerAchievements,
  };
  const phase3Game = {
    ...phaseAddedGame,
    achievements: phase3InnerAchievements,
  };
  const phase4Game = {
    ...phaseAddedGame,
    achievements: phase4InnerAchievements,
  };
  const phase5Game = {
    ...phaseAddedGame,
    achievements: phase5InnerAchievements,
  };
  const phase6Game = {
    ...phaseAddedGame,
    achievements: phase6InnerAchievements,
  };

  const phase1SearchObtained = () => {};
  const phase2SearchObtained = () => {};
  const phase3SearchObtained = () => {};
  const phase4SearchObtained = () => {};
  const phase5SearchObtained = () => {};
  const phase6SearchObtained = () => {};

  return (
    <Container>
      {phaseAddedGame && (
        <>
          <PhaseContainer>
            <SearchContainer>
              <HeaderContainer>ALL</HeaderContainer>
              <Search onSearchObtained={phase1SearchObtained} />
            </SearchContainer>
            <Achievements
              game={phase1Game}
              filterOption={phase1Filter}
              searchTerm={phase1Search}
              showPhase={true}
              phase={ALL}
            />
          </PhaseContainer>
          <PhaseContainer>
            <SearchContainer>
              <HeaderContainer>EASY</HeaderContainer>
              <Search onSearchObtained={phase2SearchObtained} />
            </SearchContainer>
            <Achievements
              game={phase2Game}
              filterOption={phase2Filter}
              searchTerm={phase2Search}
              showPhase={true}
              phase={EASY}
            />
          </PhaseContainer>
          <PhaseContainer>
            <SearchContainer>
              <HeaderContainer>HARD</HeaderContainer>
              <Search onSearchObtained={phase3SearchObtained} />
            </SearchContainer>
            <Achievements
              game={phase3Game}
              filterOption={phase3Filter}
              searchTerm={phase3Search}
              showPhase={true}
              phase={HARD}
            />
          </PhaseContainer>
          <PhaseContainer>
            <SearchContainer>
              <HeaderContainer>GRIND</HeaderContainer>
              <Search onSearchObtained={phase4SearchObtained} />
            </SearchContainer>
            <Achievements
              game={phase4Game}
              filterOption={phase4Filter}
              searchTerm={phase4Search}
              showPhase={true}
              phase={GRIND}
            />
          </PhaseContainer>
          <PhaseContainer>
            <SearchContainer>
              <HeaderContainer>MISSABLE</HeaderContainer>
              <Search onSearchObtained={phase5SearchObtained} />
            </SearchContainer>
            <Achievements
              game={phase5Game}
              filterOption={phase5Filter}
              searchTerm={phase5Search}
              showPhase={true}
              phase={MISSABLE}
            />
          </PhaseContainer>
          <PhaseContainer>
            <SearchContainer>
              <HeaderContainer>RECENTLY UNLOCKED</HeaderContainer>
              <Search onSearchObtained={phase6SearchObtained} width="100%" />
            </SearchContainer>
            <Achievements
              game={phase6Game}
              filterOption={phase6Filter}
              searchTerm={phase6Search}
              showPhase={false}
              phase={UNLOCKED}
            />
          </PhaseContainer>
        </>
      )}
    </Container>
  );
}
