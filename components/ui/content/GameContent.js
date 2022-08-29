import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import Achievements from "../../organisms/Achievements";
import {
  setHiddenAchievementsForGame,
  setHideHistoryModal,
} from "../../../store/actions/games.actions";
import AchievementCardWithPhase from "../../atoms/AchievementCardWithPhase";
import AchievementCard from "../../atoms/AchievementCard";
import { HEADER_IMAGE } from "../../../helpers/urlHelper";
import { FaClosedCaptioning } from "react-icons/fa";
import { HiX, HiXCircle } from "react-icons/hi";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0.25rem;
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

export default function GameContent() {
  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings } = steamtracker;
  const { gamePage } = settings;
  const {
    filterOption,
    searchTerm,
    showHistoryModal,
    historyModalAchievements,
    historyModalTitle,
  } = gamePage;

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
    const getHidden = async () => {
      const hiddenResponse = await axios.get(`/api/hidden/${gameId}`);
      const hiddenData = hiddenResponse.data.hiddenMapper;
      dispatch(setHiddenAchievementsForGame(gameId, hiddenData));
    };
    if (game && !game.hiddenAchivements) {
      getHidden();
    }
  }, []);

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
            {historyModalAchievements.length &&
              Object.keys(historyModalAchievements).map((achievementKey) => {
                return (
                  <AchievementCard
                    achievement={historyModalAchievements[achievementKey]}
                  />
                );
              })}
          </HistoryContainer>
        </HistoryModal>
      )}
      <Achievements
        game={game}
        filterOption={filterOption}
        searchTerm={searchTerm}
        showIgnore={true}
        activateCompletionOpacity={true}
      />
    </Container>
  );
}
