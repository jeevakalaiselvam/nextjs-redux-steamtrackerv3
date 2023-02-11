import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Page from "../../components/organisms/Page";
import GamesLeftSidebar from "../../components/ui/leftsidebar/GamesLeftSidebar";
import GamesHeader from "../../components/ui/header/GamesHeader";
import GamesContent from "../../components/ui/content/GamesContent";
import GamesRightSidebar from "../../components/ui/rightsidebar/GamesRightSidebar";
import { useRouter } from "next/router";
import SettingsHeader from "../../components/ui/header/SettingsHeader";
import SettingsContent from "../../components/ui/content/SettingsContent";

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
      header={<SettingsHeader />}
      leftSidebar={<GamesLeftSidebar />}
      content={<SettingsContent />}
      leftSidebarOpen={leftSidebarOpen}
      rightSidebarOpen={rightSidebarOpen}
      leftSidebarWidth={leftSidebarWidth}
      headerHeight={"3vh"}
      contentHeight={"97vh"}
      rightSidebarWidth={rightSidebarWidth}
    />
  );
}
