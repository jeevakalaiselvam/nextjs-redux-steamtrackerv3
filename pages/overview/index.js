import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Page from "../../components/organisms/Page";
import GamesLeftSidebar from "../../components/ui/leftsidebar/GamesLeftSidebar";
import { useRouter } from "next/router";
import GameHeader from "../../components/ui/header/GameHeader";
import GameContent from "../../components/ui/content/GameContent";
import GameRightSidebar from "../../components/ui/rightsidebar/GameRightSidebar";
import OverviewContent from "../../components/ui/content/OverviewContent";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function GamesPage() {
  const router = useRouter();
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings } = steamtracker;
  const { gamePage } = settings;
  const {
    leftSidebarOpen,
    rightSidebarOpen,
    leftSidebarWidth,
    rightSidebarWidth,
  } = gamePage;

  useEffect(() => {
    if (!Object.keys(games).length > 0) {
      router.push("/");
    }
  }, []);

  return (
    <Page
      leftSidebar={<GamesLeftSidebar />}
      header={<GameHeader />}
      content={<OverviewContent />}
      rightSidebar={<GameRightSidebar />}
      leftSidebarOpen={leftSidebarOpen}
      rightSidebarOpen={rightSidebarOpen}
      leftSidebarWidth={leftSidebarWidth}
      rightSidebarWidth={rightSidebarWidth}
    />
  );
}
