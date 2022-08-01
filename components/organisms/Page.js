import React from "react";
import styled from "styled-components";

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

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  max-height: 100vh;
`;

const HeaderContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 5vh;
  max-height: 5vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 90vh;
  max-height: 90vh;
`;

export default function Page({ leftSidebar, header, rightSidebar, content }) {
  return (
    <Container>
      {leftSidebar && (
        <LeftSidebarContainer>{leftSidebar}</LeftSidebarContainer>
      )}
      {(header || content) && (
        <MainContainer>
          <HeaderContainer>{header}</HeaderContainer>
          <ContentContainer>{content}</ContentContainer>
        </MainContainer>
      )}
      {rightSidebar && (
        <RightSidebarContainer>{rightSidebar}</RightSidebarContainer>
      )}
    </Container>
  );
}
