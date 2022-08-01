import React from "react";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../helpers/urlHelper";
import { FaTrophy } from "react-icons/fa";
import { HiClock, HiCollection } from "react-icons/hi";
import { getAllXPFromAchievements } from "../../helpers/xpHelper";

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
  background-color: rgba(0, 0, 0, 0.6);
`;

const Title = styled.div`
  position: absolute;
  width: 100%;
  display: "flex";
  bottom: 0;
  left: 0;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.75);
  &:hover {
    color: #3049d1;
  }
`;

const ToGetContainer = styled.div`
  position: absolute;
  display: "flex";
  flex-direction: column;
  top: 0;
  left: 0;
  padding: 1rem;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0.75);
  transform: translateX("0%");
`;

const ToGetIcon = styled.div`
  display: flex;
  align-items: center;
  color: #f1b51b;
  font-size: 2rem;
  justify-content: center;
`;

const ToGetData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f1b51b;
  font-size: 1.5rem;
`;

const XPContainer = styled.div`
  position: absolute;
  display: "flex";
  flex-direction: column;
  top: 0;
  right: 0;
  padding: 1rem;
  transition: all 0.5s;
  background-color: rgba(0, 0, 0, 0.75);
  transform: translateX("0%");
`;

const XPIcon = styled.div`
  display: flex;
  align-items: center;
  color: #fefefe;
  font-size: 2rem;
  justify-content: center;
`;

const XPData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fefefe;
  font-size: 1.5rem;
`;

export default function GameCard({ game }) {
  const { id, playtime, name, version, achievements, completion, toGet } = game;

  const xpData = getAllXPFromAchievements(achievements);
  const { totalXP, completedXP, remainingXP } = xpData;

  return (
    <Container>
      <Image image={HEADER_IMAGE(id)} />
      <Overlay />
      <Title>{name}</Title>
      <ToGetContainer>
        <ToGetIcon>
          <FaTrophy />
        </ToGetIcon>
        <ToGetData>{toGet}</ToGetData>
      </ToGetContainer>
      <XPContainer>
        <XPIcon>
          <HiCollection />
        </XPIcon>
        <XPData>{remainingXP} XP</XPData>
      </XPContainer>
    </Container>
  );
}
