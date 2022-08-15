import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import ProfileHistory from "../../atoms/ProfileHistory";
import ProfileHistoryTrophies from "../../atoms/ProfileHistoryTrophies";
import ProfileImage from "../../atoms/ProfileImage";
import ProfileLevel from "../../atoms/ProfileLevel";
import ProfileLevelUp from "../../atoms/ProfileLevelUp";
import ProfileToGet from "../../atoms/ProfileToGet";
import ProfileToTotal from "../../atoms/ProfileToTotal";
import ProfileTrophies from "../../atoms/ProfileTrophies";
import ProfileTrophyProgress from "../../atoms/ProfileTrophyProgress";
import ProfileXPToday from "../../atoms/ProfileXPToday";
import GamesPageMenu from "../menu/GamesPageMenu";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  padding: 0.25rem;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
`;

export default function GamesLeftSidebar() {
  const router = useRouter();
  const { gameId } = router.query;

  return (
    <Container>
      <ProfileImage
        profileLink="https://steamcommunity.com/id/notreallogan"
        profileImageLink="https://avatars.cloudflare.steamstatic.com/3984d41a867b9b4eca056cdfcd1134bd591d9100_full.jpg"
      />
      <GamesPageMenu />
      <ProfileLevel />
      {/* {gameId && <ProfileToGet />} */}
      {/* {gameId && <ProfileToTotal />} */}
      {/* <ProfileHistoryTrophies /> */}
      <ProfileTrophies />
      <ProfileTrophyProgress />
      {/* <ProfileLevelUp /> */}
      {/* <ProfileHistory /> */}
    </Container>
  );
}
