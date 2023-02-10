import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Games from "../../organisms/Games";
import {
  setHiddenAchievementsForGame,
  setHideHistoryModal,
} from "../../../store/actions/games.actions";
import { HEADER_IMAGE } from "../../../helpers/urlHelper";
import { useRouter } from "next/router";
import { HiXCircle } from "react-icons/hi";
import AchievementCard from "../../atoms/AchievementCard";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0.25rem;
  height: 100%;
  overflow: scroll;
  position: relative;
`;

const HistoryModal = styled.div`
  position: absolute;
  top: 15%;
  left: 5%;
  width: 90%;
  background-color: rgba(0, 0, 0, 0.5);
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  z-index: 100;
  border-radius: 0.25rem;
  padding: 2rem;
  justify-content: center;
  backdrop-filter: blur(20px);
  transition: all 0.5s;
`;

const HistoryContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  z-index: 1000;
  overflow: scroll;
`;

const HistoryTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: 1.75rem;
  color: #b0bec5;
  padding: 1rem;
  justify-content: center;
`;

const CloseButton = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  align-self: center;
  justify-self: center;
  justify-content: center;
  z-index: 1000;
  right: 1rem;
  top: 1rem;
  font-size: 2.25rem;
  cursor: pointer;

  &:hover {
    color: #fb617f;
  }
`;

export default function GamesContent() {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings } = steamtracker;
  const { gamesPage, gamePage } = settings;
  const {
    showHistoryModal,
    historyModalAchievements,
    historyModalTitle,
    journalContainerVisible,
    selectedAchievement: achievement,
  } = gamePage;

  const { filterOption, searchTerm } = gamesPage;

  const router = useRouter();
  const { gameId } = router.query;

  return (
    <Container>
      {showHistoryModal && (
        <HistoryModal image={HEADER_IMAGE(gameId || "381210")}>
          <CloseButton
            onClick={() => {
              dispatch(setHideHistoryModal());
            }}
          >
            <HiXCircle />
          </CloseButton>
          {/* <HistoryTitle>Unlocked Achievements</HistoryTitle> */}
          <HistoryContainer>
            {historyModalAchievements &&
              historyModalAchievements.length > 0 &&
              Object.keys(historyModalAchievements).map((achievementKey) => {
                return (
                  <AchievementCard
                    achievement={historyModalAchievements[achievementKey]}
                  />
                );
              })}
            {historyModalAchievements &&
              historyModalAchievements.length === 0 && (
                <h3>{"No Achievements"}</h3>
              )}
          </HistoryContainer>
        </HistoryModal>
      )}

      <Games
        filterOption={filterOption}
        searchTerm={searchTerm}
        games={games}
      />
    </Container>
  );
}
