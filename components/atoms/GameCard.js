import React from "react";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../helpers/urlHelper";
import { FaPinterest, FaTrophy } from "react-icons/fa";
import {
  HiArchive,
  HiClock,
  HiCollection,
  HiPresentationChartLine,
} from "react-icons/hi";
import {
  COMPLETION_TARGET,
  getAllXPFromAchievements,
  XP_FOR_LEVEL,
} from "../../helpers/xpHelper";
import { useRouter } from "next/router";
import { AiFillGold, AiFillPushpin } from "react-icons/ai";
import { getIcon } from "../../helpers/iconHelper";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 165px;
  margin: 1rem;
  position: relative;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Title = styled.div`
  position: absolute;
  width: 100%;
  display: "flex";
  bottom: 0;
  left: 0;
  padding: 1rem;
  font-size: 1.5rem;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 6;
`;

const ToGetContainer = styled.div`
  position: absolute;
  display: "flex";
  flex-direction: column;
  top: 0;
  left: 0;
  padding: 1rem;
  z-index: 8;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0.75);
  transform: translateX("0%");
`;

const ToGetIcon = styled.div`
  display: flex;
  align-items: center;
  color: #f1b51b;
  font-size: 2rem;
  z-index: 8;
  justify-content: center;
`;

const ToGetData = styled.div`
  display: flex;
  align-items: center;
  z-index: 8;
  justify-content: center;
  color: #f1b51b;
  font-size: 1.5rem;
`;

const XPContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  top: 0;
  left: 0;
  z-index: 8;
  padding: 1rem;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0.75);
  transform: translateX("0%");
`;

const XPIcon = styled.div`
  display: flex;
  align-items: center;
  color: #f5b81c;
  font-size: 1.75rem;
  margin-right: 0.5rem;
  z-index: 8;
  justify-content: center;
`;

const XPData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f5b81c;
  z-index: 8;
  font-size: 1.5rem;
`;

const CompletionOverlay = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: #f5b81c;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 7;
  font-size: 5rem;
`;

const PinIcon = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.9);
  color: ${(props) => (props.active ? "#f5b81c" : "#fefefe")};
  cursor: pointer;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 7;
  font-size: 2rem;

  &:hover {
    color: #f5b81c;
  }
`;

export default function GameCard({ game }) {
  const { id, playtime, name, version, achievements, completion, toGet } = game;

  const xpData = getAllXPFromAchievements(achievements);
  const { totalXP, completedXP, remainingXP } = xpData;

  const router = useRouter();

  const completed = completedXP / XP_FOR_LEVEL;
  const needed = (totalXP * COMPLETION_TARGET) / XP_FOR_LEVEL;

  return (
    <Container>
      <Overlay />
      <Image image={HEADER_IMAGE(id)} />
      {completed >= needed && (
        <CompletionOverlay>{getIcon("trophy")}</CompletionOverlay>
      )}
      <Title
        onClick={() => {
          if (typeof window !== "undefined") {
            localStorage.setItem("SELECTED_GAME", id);
          }
          router.push(`/planner/${id}`);
        }}
      >
        {name}
      </Title>
      {/* {completed < needed && (
        <ToGetContainer>
          <ToGetIcon>
            {getIcon("trophy")}
          </ToGetIcon>
          <ToGetData>{toGet}</ToGetData>
        </ToGetContainer>
      )} */}
      {completed <= needed && (
        <XPContainer>
          <XPIcon>{getIcon("xp")}</XPIcon>
          <XPData>
            {Math.floor(Math.floor(totalXP * COMPLETION_TARGET) - completedXP)}
          </XPData>
        </XPContainer>
      )}

      <PinIcon
        active={
          typeof window !== "undefined" &&
          JSON.parse(
            localStorage.getItem("GAMES_PINNED") || JSON.stringify([])
          ).includes(id)
        }
        onClick={() => {
          if (typeof window !== "undefined") {
            if (!localStorage.getItem("GAMES_PINNED")) {
              let alreadyPresentGames = [];
              alreadyPresentGames = [...alreadyPresentGames, id];
              localStorage.setItem(
                "GAMES_PINNED",
                JSON.stringify(alreadyPresentGames)
              );
            } else {
              let alreadyPresentGames = JSON.parse(
                localStorage.getItem("GAMES_PINNED") || JSON.stringify([])
              );
              alreadyPresentGames = [...alreadyPresentGames, id];
              localStorage.setItem(
                "GAMES_PINNED",
                JSON.stringify(alreadyPresentGames)
              );
            }
          }
        }}
      >
        <AiFillPushpin />
      </PinIcon>
    </Container>
  );
}
