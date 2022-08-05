import React from "react";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../helpers/urlHelper";
import { FaTrophy } from "react-icons/fa";
import {
  HiArchive,
  HiClock,
  HiCollection,
  HiPresentationChartLine,
} from "react-icons/hi";
import { getAllXPFromAchievements, XP_FOR_LEVEL } from "../../helpers/xpHelper";
import { useRouter } from "next/router";

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
  flex-direction: column;
  top: 0;
  right: 0;
  z-index: 8;
  padding: 1rem;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0.75);
  transform: translateX("0%");
`;

const XPIcon = styled.div`
  display: flex;
  align-items: center;
  color: #fefefe;
  font-size: 1.75rem;
  margin-right: 0.5rem;
  z-index: 8;
  justify-content: center;
`;

const XPData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fefefe;
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

export default function GameCard({ game }) {
  const { id, playtime, name, version, achievements, completion, toGet } = game;

  const xpData = getAllXPFromAchievements(achievements);
  const { totalXP, completedXP, remainingXP } = xpData;

  const router = useRouter();

  const completed = completedXP / XP_FOR_LEVEL;
  const needed = (totalXP * 1) / XP_FOR_LEVEL;

  return (
    <Container
      onClick={() => {
        if (typeof window !== "undefined") {
          localStorage.setItem("SELECTED_GAME", id);
        }
        router.push(`/planner/${id}`);
      }}
    >
      <Overlay />
      <Image image={HEADER_IMAGE(id)} />
      {completed >= needed && (
        <CompletionOverlay>
          <FaTrophy />
        </CompletionOverlay>
      )}
      <Title>{name}</Title>
      {completed < needed && (
        <ToGetContainer>
          <ToGetIcon>
            <FaTrophy />
          </ToGetIcon>
          <ToGetData>{toGet}</ToGetData>
        </ToGetContainer>
      )}
      {completed <= needed && (
        <XPContainer>
          <XPIcon>
            <HiPresentationChartLine />
          </XPIcon>
          <XPData>
            {Math.floor(Math.floor(totalXP * 1) - completedXP)} XP
          </XPData>
        </XPContainer>
      )}
    </Container>
  );
}
