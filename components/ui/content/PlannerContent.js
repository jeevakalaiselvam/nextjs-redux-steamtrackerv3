import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import {
  setHiddenAchievementsForGame,
  setPhase1Achievments,
  setPhase1Search,
  setPhase2Achievments,
  setPhase2Search,
  setPhase3Achievments,
  setPhase3Search,
  setPhase4Achievments,
  setPhase4Search,
  setPhase5Achievments,
  setPhase5Search,
  setPhase6Achievments,
  setPhase6Search,
  setPhaseAddedGames,
} from "../../../store/actions/games.actions";
import Achievements from "../../organisms/Achievements";
import {
  ALL,
  EASY,
  getPhaseAddedGames,
  GRIND,
  HARD,
  MISSABLE,
  UNLOCKED,
} from "../../../helpers/gameHelper";
import Search from "../../atoms/Search";
import {
  getaUnlockedAchievementsByType,
  getPhaseFiltedAchievements,
  searchFilteredAchievements,
} from "../../../helpers/achievementHelper";
import PhaseTitle from "../../atoms/PhaseTitle";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  padding: 0.25rem;
  height: 100%;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
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
  flex: 1;
  min-width: 300px;
  min-height: 94vh;
  max-height: 94vh;
  overflow: scroll;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  margin: 0.25rem;
`;

export default function PlannerContent() {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, planner } = steamtracker;
  const game = games.find((game) => game.id == gameId);
  const { phaseAddedGame } = planner;
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
    phase1Achievements,
    phase2Achievements,
    phase3Achievements,
    phase4Achievements,
    phase5Achievements,
    phase6Achievements,
  } = planner;

  const router = useRouter();
  const { gameId } = router.query;

  useEffect(() => {
    const getHidden = async () => {
      const hiddenResponse = await axios.get(`/api/hidden/${gameId}`);
      const hiddenData = hiddenResponse.data.hiddenMapper;
      dispatch(setHiddenAchievementsForGame(gameId, hiddenData));
    };
    if (gameId) {
      getHidden();
    }
  }, [gameId]);

  useEffect(() => {
    const game = games.find((game) => game.id == gameId);
    const phaseAddedGames = getPhaseAddedGames(game);
    dispatch(setPhaseAddedGames(phaseAddedGames));
  }, [gameId]);

  const [unlockType, setUnlockType] = useState("TODAY");

  useEffect(() => {
    if (phaseAddedGame.achievements) {
      let phase1FilteredAchievements = getPhaseFiltedAchievements(
        gameId,
        phaseAddedGame.achievements,
        ALL
      );
      let phase2FilteredAchievements = getPhaseFiltedAchievements(
        gameId,
        phaseAddedGame.achievements,
        EASY
      );
      let phase3FilteredAchievements = getPhaseFiltedAchievements(
        gameId,
        phaseAddedGame.achievements,
        HARD
      );
      let phase4FilteredAchievements = getPhaseFiltedAchievements(
        gameId,
        phaseAddedGame.achievements,
        GRIND
      );
      let phase5FilteredAchievements = getPhaseFiltedAchievements(
        gameId,
        phaseAddedGame.achievements,
        MISSABLE
      );

      let phase6FilteredAchievements = getaUnlockedAchievementsByType(
        phaseAddedGame.achievements,
        unlockType
      );

      let searchPhase1Achievements = searchFilteredAchievements(
        phase1FilteredAchievements,
        phase1Search
      );

      let searchPhase2Achievements = searchFilteredAchievements(
        phase2FilteredAchievements,
        phase2Search
      );

      let searchPhase3Achievements = searchFilteredAchievements(
        phase3FilteredAchievements,
        phase3Search
      );

      let searchPhase4Achievements = searchFilteredAchievements(
        phase4FilteredAchievements,
        phase4Search
      );

      let searchPhase5Achievements = searchFilteredAchievements(
        phase5FilteredAchievements,
        phase5Search
      );

      let searchPhase6Achievements = searchFilteredAchievements(
        phase6FilteredAchievements,
        phase6Search
      );

      dispatch(setPhase1Achievments(searchPhase1Achievements));
      dispatch(setPhase2Achievments(searchPhase2Achievements));
      dispatch(setPhase3Achievments(searchPhase3Achievements));
      dispatch(setPhase4Achievments(searchPhase4Achievements));
      dispatch(setPhase5Achievments(searchPhase5Achievements));
      dispatch(setPhase6Achievments(searchPhase6Achievements));
    }
  }, [
    phaseAddedGame,
    phase1Search,
    phase2Search,
    phase3Search,
    phase4Search,
    phase5Search,
    phase6Search,
  ]);

  useEffect(() => {
    let phase6FilteredAchievements = getaUnlockedAchievementsByType(
      phaseAddedGame.achievements,
      unlockType
    );

    let searchPhase6Achievements = searchFilteredAchievements(
      phase6FilteredAchievements,
      phase6Search
    );

    dispatch(setPhase6Achievments(searchPhase6Achievements));
  }, [unlockType]);

  const phase1SearchObtained = (searchTerm) => {
    dispatch(setPhase1Search(searchTerm));
  };
  const phase2SearchObtained = (searchTerm) => {
    dispatch(setPhase2Search(searchTerm));
  };
  const phase3SearchObtained = (searchTerm) => {
    dispatch(setPhase3Search(searchTerm));
  };
  const phase4SearchObtained = (searchTerm) => {
    dispatch(setPhase4Search(searchTerm));
  };
  const phase5SearchObtained = (searchTerm) => {
    dispatch(setPhase5Search(searchTerm));
  };
  const phase6SearchObtained = (searchTerm) => {
    dispatch(setPhase6Search(searchTerm));
  };

  const [phase1Title, setPhase1Title] = useState("");
  const [phase2Title, setPhase2Title] = useState("");
  const [phase3Title, setPhase3Title] = useState("");
  const [phase4Title, setPhase4Title] = useState("");
  const [phase5Title, setPhase5Title] = useState("");

  return (
    <Container>
      {phaseAddedGame && (
        <>
          <PhaseContainer>
            <SearchContainer>
              <HeaderContainer>
                <PhaseTitle gameId={gameId} phase={1} defaultTitle="ALL" />
              </HeaderContainer>
              <Search onSearchObtained={phase1SearchObtained} />
            </SearchContainer>
            <Achievements
              game={{
                ...phaseAddedGame,
                achievements: phase1Achievements,
              }}
              filterOption={phase1Filter}
              searchTerm={phase1Search}
              showPhase={true}
              phase={ALL}
            />
          </PhaseContainer>
          <PhaseContainer>
            <SearchContainer>
              <HeaderContainer>{phase2Title}</HeaderContainer>
              <Search onSearchObtained={phase2SearchObtained} />
            </SearchContainer>
            <Achievements
              game={{
                ...phaseAddedGame,
                achievements: phase2Achievements,
              }}
              filterOption={phase2Filter}
              searchTerm={phase2Search}
              showPhase={true}
              phase={EASY}
            />
          </PhaseContainer>
          <PhaseContainer>
            <SearchContainer>
              <HeaderContainer>{phase3Title}</HeaderContainer>
              <Search onSearchObtained={phase3SearchObtained} />
            </SearchContainer>
            <Achievements
              game={{
                ...phaseAddedGame,
                achievements: phase3Achievements,
              }}
              filterOption={phase3Filter}
              searchTerm={phase3Search}
              showPhase={true}
              phase={HARD}
            />
          </PhaseContainer>
          <PhaseContainer>
            <SearchContainer>
              <HeaderContainer>{phase4Title}</HeaderContainer>
              <Search onSearchObtained={phase4SearchObtained} />
            </SearchContainer>
            <Achievements
              game={{
                ...phaseAddedGame,
                achievements: phase4Achievements,
              }}
              filterOption={phase4Filter}
              searchTerm={phase4Search}
              showPhase={true}
              phase={GRIND}
            />
          </PhaseContainer>
          <PhaseContainer>
            <SearchContainer>
              <HeaderContainer>{phase5Title}</HeaderContainer>
              <Search onSearchObtained={phase5SearchObtained} />
            </SearchContainer>
            <Achievements
              game={{
                ...phaseAddedGame,
                achievements: phase5Achievements,
              }}
              filterOption={phase5Filter}
              searchTerm={phase5Search}
              showPhase={true}
              phase={MISSABLE}
            />
          </PhaseContainer>
          <PhaseContainer>
            <SearchContainer>
              {unlockType == "TODAY" && (
                <HeaderContainer
                  onClick={() => {
                    setUnlockType((old) => "WEEK");
                  }}
                >
                  UNLOCKED TODAY
                </HeaderContainer>
              )}
              {unlockType == "WEEK" && (
                <HeaderContainer
                  onClick={() => {
                    setUnlockType((old) => "ALL");
                  }}
                >
                  UNLOCKED THIS WEEK
                </HeaderContainer>
              )}
              {unlockType == "ALL" && (
                <HeaderContainer
                  onClick={() => {
                    setUnlockType((old) => "TODAY");
                  }}
                >
                  UNLOCKED ALL TIME
                </HeaderContainer>
              )}
              <Search onSearchObtained={phase6SearchObtained} width="100%" />
            </SearchContainer>
            <Achievements
              game={{
                ...phaseAddedGame,
                achievements: phase6Achievements,
              }}
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
