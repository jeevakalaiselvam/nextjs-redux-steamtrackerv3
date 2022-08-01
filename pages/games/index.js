import React from "react";
import styled from "styled-components";
import Page from "../../components/organisms/Page";
import GamesLeftSidebar from "../../components/ui/leftsidebar/GamesLeftSidebar";
import GamesHeader from "../../components/ui/header/GamesHeader";
import GamesContent from "../../components/ui/content/GamesContent";
import GamesRightSidebar from "../../components/ui/rightsidebar/GamesRightSidebar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function GamesPage() {
  return (
    <Page
      leftSidebar={<GamesLeftSidebar />}
      header={<GamesHeader />}
      content={<GamesContent />}
      rightSidebar={<GamesRightSidebar />}
    />
  );
}
