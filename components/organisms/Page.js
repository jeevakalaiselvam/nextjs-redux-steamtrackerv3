import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  min-height: 100vh;
  color: #ffffff;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  background-color: #1e1e1e;
`;

const LeftSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 200px;
  min-height: 100vh;
  max-height: 100vh;
  background-color: #171717;
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  max-height: 100vh;
`;

const RightSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 300px;
  min-height: 100vh;
  max-height: 100vh;
  background-color: #171717;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default function Page({ leftSidebar, header, rightSidebar, content }) {
  return (
    <Container>
      <LeftSidebarContainer>{leftSidebar}</LeftSidebarContainer>
      <MainContainer>
        <HeaderContainer>{header}</HeaderContainer>
        <ContentContainer>{content}</ContentContainer>
      </MainContainer>
      <RightSidebarContainer>{rightSidebar}</RightSidebarContainer>
    </Container>
  );
}
