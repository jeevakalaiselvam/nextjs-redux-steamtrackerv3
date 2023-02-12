import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getAllUnlockedAchievements,
  getaUnlockedAchievementsByType,
} from "../../../helpers/achievementHelper";
import {
  GAME_OPTION_PERCENTAGE_ASC_UNLOCKTIME,
  GAME_OPTION_PERCENTAGE_DESC,
  GAME_OPTION_PERCENTAGE_DESC_UNLOCKED,
  GAME_OPTION_PERCENTAGE_DESC_UNLOCKTIME,
} from "../../../helpers/filterHelper";
import { getIcon } from "../../../helpers/iconHelper";
import { calculateXPFromPercentage } from "../../../helpers/xpHelper";
import {
  addJournalGameAchievement,
  toggleJournalRightSidebar,
} from "../../../store/actions/games.actions";
import AchievementCardWithPhase from "../../atoms/AchievementCardWithPhase";
import JournalInput from "../../atoms/JournalInput";
import Achievements from "../../organisms/Achievements";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 0.25rem 0;
  min-height: 100vh;
  max-height: 100vh;
  padding: 1rem;
  overflow: hidden;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.15rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  justify-content: center;
`;

const Data = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffcc00;
`;

const Icon = styled.div`
  display: flex;
  margin-right: 0.25rem;
  align-items: center;
  color: #ffcc00;
  justify-content: center;
`;

const Text = styled.div`
  color: #ffcc00;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const JournalContainer = styled.div`
  display: flex;
  transition: 0.5s all;
  align-items: flex-start;
  flex-direction: column;
  padding: 1rem;
  justify-content: center;
  color: #b0bec5;
  width: 100%;
`;

export default function GameRightSidebar() {
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings, journalMap } = steamtracker;
  const { gamePage } = settings;
  const { selectedAchievement: achievement, journalContainerVisible } =
    gamePage;

  const router = useRouter();
  const { gameId } = router.query;
  const dispatch = useDispatch();

  const [game, setGame] = useState({});
  const [todayOnly, setTodayOnly] = useState([]);

  useEffect(() => {
    if (gameId) {
      let game = games.find((game) => game.id == gameId);
      let todayOnly = getaUnlockedAchievementsByType(
        game?.achievements,
        "TODAY"
      );
      setGame(game);
      setTodayOnly(todayOnly);
    }
  }, [gameId, game]);

  const onDataSaved = (journalInfo) => {
    const data = dispatch(
      addJournalGameAchievement({
        gameId: gameId,
        achievementId: achievement.name,
        journal: journalInfo,
      })
    );

    if (data.payload.journal) {
      setSaveStatus("SAVING...");
      setTimeout(() => {
        setSaveStatus("SAVED!");
        setTimeout(() => {
          setSaveStatus("");
        }, 500);
      }, 500);
    }
  };

  const [saveStatus, setSaveStatus] = useState("");

  return (
    <Container>
      {game && !journalContainerVisible && (
        <>
          <TitleContainer>
            <Title
              onClick={() => {
                dispatch(toggleJournalRightSidebar(true));
              }}
            >
              UNLOCKED TODAY
            </Title>
            <Data>
              <Icon>{getIcon("gold")}</Icon>
              <Text>
                {todayOnly.reduce(
                  (acc, item) =>
                    acc + calculateXPFromPercentage(item.percentage),
                  0
                )}
              </Text>
            </Data>
          </TitleContainer>
          <Achievements
            game={game}
            filterOption={GAME_OPTION_PERCENTAGE_ASC_UNLOCKTIME}
            searchTerm={""}
            showOnly="TODAY"
            includeAll={true}
          />
        </>
      )}

      {journalContainerVisible && (
        <JournalContainer show={true}>
          <AchievementCardWithPhase
            achievement={achievement}
            width={"100%"}
            hideUnlock={true}
          />
          <JournalInput
            hideJournal={() => {
              dispatch(toggleJournalRightSidebar(false));
            }}
            onDataSaved={onDataSaved}
            journalData={
              (journalMap &&
                gameId &&
                journalMap[gameId] &&
                journalMap[gameId][achievement.name]) ??
              ""
            }
            achievement={achievement}
            saveStatus={saveStatus}
          />
        </JournalContainer>
      )}
    </Container>
  );
}
