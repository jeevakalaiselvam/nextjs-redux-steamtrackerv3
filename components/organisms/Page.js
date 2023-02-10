import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { HEADER_IMAGE } from "../../helpers/urlHelper";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-height: 100vh;
  color: #ffffff;
  max-width: 100vw;
  min-width: 100vw;
  overflow: hidden;
  background-color: #1e1e1e;
  position: relative;
  z-index: 1;
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${(props) => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  filter: blur(30px);
  z-index: 2;
`;

const LeftSidebarContainer = styled.div`
  display: ${(props) => (props.leftSidebarOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: ${(props) =>
    props.leftSidebarWidth ? props.leftSidebarWidth : "200px"};
  min-height: 100vh;
  max-height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  z-index: 3;
`;

const RightSidebarContainer = styled.div`
  display: ${(props) => (props.rightSidebarOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: ${(props) =>
    props.rightSidebarWidth ? props.rightSidebarWidth : "300px"};
  min-height: 100vh;
  max-height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  z-index: 3;
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  max-height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  z-index: 3;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 5vh;
  max-height: 5vh;
  z-index: 3;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 95vh;
  max-height: 95vh;
  z-index: 3;
`;

export default function Page({
  leftSidebar,
  header,
  rightSidebar,
  content,
  leftSidebarOpen,
  rightSidebarOpen,
  rightSidebarWidth,
  leftSidebarWidth,
}) {
  const router = useRouter();
  const { gameId } = router.query;
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games } = steamtracker;

  const [gameIdForImage, setGameIdForImage] = useState("");

  useEffect(() => {
    if (gameId) {
      localStorage.setItem("GAMES_RECENT_ID", gameId);
      setGameIdForImage(gameId);
    } else {
      let recentGameId = localStorage.getItem("GAMES_RECENT_ID");
      if (recentGameId) {
        setGameIdForImage(recentGameId);
      }
    }
  }, [gameId]);

  return (
    <Container>
      <ImageOverlay
        image={HEADER_IMAGE(games[Math.floor(Math.random() * games.length)].id)}
      />
      {leftSidebar && (
        <LeftSidebarContainer
          leftSidebarOpen={leftSidebarOpen}
          leftSidebarWidth={leftSidebarWidth}
        >
          {leftSidebar}
        </LeftSidebarContainer>
      )}
      {(header || content) && (
        <MainContainer>
          <HeaderContainer>{header}</HeaderContainer>
          <ContentContainer>{content}</ContentContainer>
        </MainContainer>
      )}
      {rightSidebar && (
        <RightSidebarContainer
          rightSidebarOpen={rightSidebarOpen}
          rightSidebarWidth={rightSidebarWidth}
        >
          {rightSidebar}
        </RightSidebarContainer>
      )}
    </Container>
  );
}
