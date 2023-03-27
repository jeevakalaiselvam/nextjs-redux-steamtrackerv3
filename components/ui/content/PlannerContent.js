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
  sortAchievementsByFilterOption,
} from "../../../helpers/achievementHelper";
import PhaseTitle from "../../atoms/PhaseTitle";
import {
  calculateTotalXPForAllGames,
  getAllXPFromAchievements,
  getXPFromAchievements,
} from "../../../helpers/xpHelper";
import { getIcon } from "../../../helpers/iconHelper";
import RecentAchievementsSmall from "../../atoms/RecentAchievementsSmall";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  height: 100%;
`;

const RecentSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0.25rem;
  overflow: scroll;
  min-height: 95vh;
  max-height: 95vh;
  flex: 1;
`;

const AchievementSection = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
  justify-content: center;
  padding: 0.25rem;
  overflow: hidden;
  flex: 1;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 1.5rem;
`;

const RecentTitle = styled.div`
  display: flex;
  width: 100%;
  cursor: pointer;
  align-items: flex-start;
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

const TitleIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
  color: #ffcc00;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function PlannerContent() {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, planner } = steamtracker;
  const game = games.find((game) => game.id == gameId);
  const { phaseAddedGame, plannerViewActive } = planner;
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
    unlockedShowToday,
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
  }, [gameId, games, game]);

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
    gameId,
    phaseAddedGame.achievements,
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

  return (
    <Container>
      {false && (
        <RecentSection>
          <RecentAchievementsSmall
            games={games}
            unlockedShowToday={unlockedShowToday}
          />
        </RecentSection>
      )}

      {true && (
        <AchievementSection>
          {phaseAddedGame && (
            <>
              <PhaseContainer>
                <SearchContainer>
                  <HeaderContainer>
                    <PhaseTitle
                      gameId={gameId}
                      phase={1}
                      defaultTitle="ALL"
                      totalXP={getXPFromAchievements(
                        sortAchievementsByFilterOption(
                          phase1Achievements,
                          phase1Filter,
                          gameId
                        )
                      )}
                    />
                  </HeaderContainer>
                  <Search onSearchObtained={phase1SearchObtained} />
                </SearchContainer>
                <Achievements
                  hidePinned={true}
                  game={{
                    ...phaseAddedGame,
                    achievements: phase1Achievements,
                  }}
                  filterOption={phase1Filter}
                  searchTerm={phase1Search}
                  showPhase={true}
                  phase={ALL}
                  showIgnore={false}
                />
              </PhaseContainer>
              <PhaseContainer>
                <SearchContainer>
                  <HeaderContainer>
                    <PhaseTitle
                      gameId={gameId}
                      phase={2}
                      defaultTitle="EASY"
                      totalXP={getXPFromAchievements(
                        sortAchievementsByFilterOption(
                          phase2Achievements,
                          phase2Filter,
                          gameId
                        )
                      )}
                    />
                  </HeaderContainer>
                  <Search onSearchObtained={phase2SearchObtained} />
                </SearchContainer>
                <Achievements
                  hidePinned={true}
                  game={{
                    ...phaseAddedGame,
                    achievements: phase2Achievements,
                  }}
                  filterOption={phase2Filter}
                  searchTerm={phase2Search}
                  showPhase={true}
                  phase={EASY}
                  showIgnore={false}
                />
              </PhaseContainer>
              <PhaseContainer>
                <SearchContainer>
                  <HeaderContainer>
                    <PhaseTitle
                      gameId={gameId}
                      phase={3}
                      defaultTitle="MISSABLE"
                      totalXP={getXPFromAchievements(
                        sortAchievementsByFilterOption(
                          phase3Achievements,
                          phase3Filter,
                          gameId
                        )
                      )}
                    />
                  </HeaderContainer>
                  <Search onSearchObtained={phase5SearchObtained} />
                </SearchContainer>
                <Achievements
                  hidePinned={true}
                  game={{
                    ...phaseAddedGame,
                    achievements: phase5Achievements,
                  }}
                  filterOption={phase5Filter}
                  searchTerm={phase5Search}
                  showPhase={true}
                  phase={MISSABLE}
                  showIgnore={false}
                />
              </PhaseContainer>
              <PhaseContainer>
                <SearchContainer>
                  <HeaderContainer>
                    <PhaseTitle
                      gameId={gameId}
                      phase={4}
                      defaultTitle="GRIND"
                      totalXP={getXPFromAchievements(
                        sortAchievementsByFilterOption(
                          phase4Achievements,
                          phase4Filter,
                          gameId
                        )
                      )}
                    />
                  </HeaderContainer>
                  <Search onSearchObtained={phase3SearchObtained} />
                </SearchContainer>
                <Achievements
                  hidePinned={true}
                  game={{
                    ...phaseAddedGame,
                    achievements: phase3Achievements,
                  }}
                  filterOption={phase3Filter}
                  searchTerm={phase3Search}
                  showPhase={true}
                  phase={HARD}
                  showIgnore={false}
                />
              </PhaseContainer>
              <PhaseContainer>
                <SearchContainer>
                  <HeaderContainer>
                    <PhaseTitle
                      gameId={gameId}
                      phase={5}
                      defaultTitle="HARD"
                      totalXP={getXPFromAchievements(
                        sortAchievementsByFilterOption(
                          phase5Achievements,
                          phase5Filter,
                          gameId
                        )
                      )}
                    />
                  </HeaderContainer>
                  <Search onSearchObtained={phase4SearchObtained} />
                </SearchContainer>
                <Achievements
                  hidePinned={true}
                  game={{
                    ...phaseAddedGame,
                    achievements: phase4Achievements,
                  }}
                  filterOption={phase4Filter}
                  searchTerm={phase4Search}
                  showPhase={true}
                  phase={GRIND}
                  showIgnore={false}
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
                      UNLOCKED TODAY{" "}
                      <TitleIcon>
                        <Icon>{getIcon("xp")}</Icon>
                        <IconCount>
                          {getXPFromAchievements(
                            sortAchievementsByFilterOption(
                              phase6Achievements,
                              phase6Filter,
                              gameId
                            )
                          )}
                        </IconCount>
                      </TitleIcon>
                    </HeaderContainer>
                  )}
                  {unlockType == "WEEK" && (
                    <HeaderContainer
                      onClick={() => {
                        setUnlockType((old) => "ALL");
                      }}
                    >
                      UNLOCKED THIS WEEK{" "}
                      <TitleIcon>
                        <Icon>{getIcon("xp")}</Icon>
                        <IconCount>
                          {getXPFromAchievements(
                            sortAchievementsByFilterOption(
                              phase6Achievements,
                              phase6Filter,
                              gameId
                            )
                          )}
                        </IconCount>
                      </TitleIcon>
                    </HeaderContainer>
                  )}
                  {unlockType == "ALL" && (
                    <HeaderContainer
                      onClick={() => {
                        setUnlockType((old) => "TODAY");
                      }}
                    >
                      UNLOCKED ALL TIME{" "}
                      <TitleIcon>
                        <Icon>{getIcon("xp")}</Icon>
                        <IconCount>
                          {getXPFromAchievements(
                            sortAchievementsByFilterOption(
                              phase6Achievements,
                              phase6Filter,
                              gameId
                            )
                          )}
                        </IconCount>
                      </TitleIcon>
                    </HeaderContainer>
                  )}
                  <Search
                    onSearchObtained={phase6SearchObtained}
                    width="100%"
                  />
                </SearchContainer>
                <Achievements
                  hidePinned={true}
                  game={{
                    ...phaseAddedGame,
                    achievements: phase6Achievements,
                  }}
                  filterOption={phase6Filter}
                  searchTerm={phase6Search}
                  showPhase={false}
                  phase={UNLOCKED}
                  showIgnore={false}
                />
              </PhaseContainer>
            </>
          )}
        </AchievementSection>
      )}
    </Container>
  );
}
