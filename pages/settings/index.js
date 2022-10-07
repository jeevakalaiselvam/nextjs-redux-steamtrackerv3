import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Page from "../../components/organisms/Page";
import GamesLeftSidebar from "../../components/ui/leftsidebar/GamesLeftSidebar";
import GamesHeader from "../../components/ui/header/GamesHeader";
import GamesContent from "../../components/ui/content/GamesContent";
import GamesRightSidebar from "../../components/ui/rightsidebar/GamesRightSidebar";
import { useRouter } from "next/router";

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
  const { gamesPage } = settings;
  const {
    leftSidebarOpen,
    rightSidebarOpen,
    leftSidebarWidth,
    rightSidebarWidth,
  } = gamesPage;

  useEffect(() => {
    if (!Object.keys(games).length > 0) {
      router.push("/");
    }
  }, []);

  return (
    <Page
      leftSidebar={<GamesLeftSidebar />}
      header={<GamesHeader />}
      content={<GamesContent />}
      rightSidebar={<GamesRightSidebar />}
      leftSidebarOpen={leftSidebarOpen}
      rightSidebarOpen={rightSidebarOpen}
      leftSidebarWidth={leftSidebarWidth}
      rightSidebarWidth={rightSidebarWidth}
    />
  );
}
