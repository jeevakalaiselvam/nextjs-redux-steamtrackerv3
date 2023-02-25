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
import JournalInput from "../../atoms/JournalInput";
import { GAME_OPTION_PERCENTAGE_DESC } from "../../../helpers/filterHelper";
import {
  calculateRarityLeftFromAchievements,
  rarityPercentageMapper,
} from "../../../helpers/xpHelper";

const RootContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0.25rem;
  height: 95vh;
`;

const JournalContainer = styled.div`
  display: flex;
  transition: 0.5s all;
  align-items: flex-start;
  padding: 1rem;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #b0bec5;
  backdrop-filter: blur(2px);
  min-width: 400px;
  max-width: 400px;
  max-height: 100%;
  min-height: 100%;
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
  z-index: 10000000;
  border-radius: 0.25rem;
  padding: 2rem;
  flex-wrap: wrap;
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

const DataContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  max-height: 100%;
  min-height: 100%;
  padding: 0.5rem;
  position: relative;
`;

const AchievementContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  min-height: 95vh;
  background-color: rgba(0, 0, 0, 0.1);
  max-height: 95vh;
  overflow: scroll;
  margin-right: 0.25rem;
  flex: 3;
`;

const MissableAchievementContainer = styled.div`
  display: flex;
  align-content: center;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 10000;
  flex-direction: column;
  justify-content: flex-start;
  flex: 2;
  overflow: scroll;
  min-height: 95vh;
  max-height: 95vh;
`;

const AchievementInner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 100%;
  align-content: center;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  padding: 0.5rem 3rem;
  margin-top: 1rem;
  font-size: 2rem;
  align-content: center;
  justify-content: flex-start;
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
    z-index: 10000000;
  }
`;

export default function GameContent() {
  const [achCount, setAchCount] = useState(
    (game && game?.achievements?.length) ?? 0
  );

  const dispatch = useDispatch();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings, rarityFilters, pinnedAchievements, targetSettings } =
    steamtracker;
  const { gamePage } = settings;
  const {
    filterOption,
    searchTerm,
    showHistoryModal,
    historyModalAchievements,
    historyModalTitle,
    journalContainerVisible,
    selectedAchievement: achievement,
  } = gamePage;

  const {
    name,
    hidden,
    icon,
    icongray,
    percentage,
    achieved,
    unlocktime,
    displayName,
    description,
    phase,
  } = achievement;

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

  const getPinnedAchievementsCount = () => {
    return (game?.achievements ?? []).filter((achievement) => {
      if ((pinnedAchievements[game.id] ?? []).includes(achievement.name)) {
        return true;
      } else {
        return false;
      }
    }).length;
  };

  let rarityInfo = {};
  rarityInfo =
    game &&
    game?.achievements &&
    game?.achievements?.length &&
    calculateRarityLeftFromAchievements(game?.achievements, targetSettings);

  return (
    <RootContainer>
      {journalContainerVisible && false && (
        <JournalContainer show={true}>
          <JournalInput
            onDataSaved={onDataSaved}
            journalData={journalData}
            achievement={achievement}
            saveStatus={saveStatus}
          />
        </JournalContainer>
      )}
      <DataContainer>
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
              {historyModalAchievements.length > 0 &&
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
        <AchievementContainer>
          <AchievementInner>
            <Header>
              {(rarityFilters[game?.id] &&
                rarityFilters[game?.id][0] +
                  rarityFilters[game?.id].slice(1).toLowerCase() +
                  " ") ||
                "Achievements "}
              {false &&
                ` ${
                  (rarityFilters[game?.id] &&
                    rarityPercentageMapper[rarityFilters[game?.id]]) ??
                  ""
                } `}
              [
              {(rarityFilters[game?.id] &&
                rarityInfo &&
                rarityInfo[
                  rarityFilters[game?.id]?.toLowerCase() + "Remaining"
                ]) ??
                game?.achievements?.length ??
                0}
              ]
            </Header>
            <Achievements
              game={game}
              filterOption={GAME_OPTION_PERCENTAGE_DESC}
              searchTerm={searchTerm}
              showIgnore={true}
              activateCompletionOpacity={true}
              noWrap={false}
            />
          </AchievementInner>
        </AchievementContainer>
        <MissableAchievementContainer>
          <Header>Pinned [{getPinnedAchievementsCount()}]</Header>
          <Achievements
            game={game}
            filterOption={GAME_OPTION_PERCENTAGE_DESC}
            searchTerm={searchTerm}
            showIgnore={true}
            activateCompletionOpacity={true}
            noWrap={true}
            pinnedOnly={true}
          />
        </MissableAchievementContainer>
      </DataContainer>
    </RootContainer>
  );
}
