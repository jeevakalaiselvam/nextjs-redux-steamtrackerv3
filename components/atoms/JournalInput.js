import React, { useEffect, useState } from "react";

import styled from "styled-components";
import AchievementCardWithPhase from "./AchievementCardWithPhase";

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-top: 1rem;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  flex-direction: column;
  transition: 0.5s all;
`;

const Header = styled.div`
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  color: #ffcc00;
`;

const SaveStatus = styled.div`
  display: flex;
  padding: 0rem 1rem;
  align-items: center;
  justify-content: flex-start;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3049d1;
  padding: 0rem 1rem;
  color: #fefefe;
  cursor: pointer;

  &:hover {
    background-color: #1e33a6;
  }
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  margin-top: 1rem;
  align-items: flex-start;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);

  & textarea {
    width: 100%;
    outline: none;
    flex: 1;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    padding: 1rem;
    resize: none;
    min-height: 1100px;
    overflow: scroll;
    font-size: 1.5rem;
  }
`;

export default function JournalInput({
  onDataSaved,
  journalData,
  achievement,
  saveStatus,
  hideJournal,
}) {
  const [journal, setJournal] = useState(journalData);

  const journalChanged = (e) => {
    const data = e.target.value;
    setJournal((old) => data);
  };

  useEffect(() => {
    setJournal((old) => journalData);
  }, [journalData]);

  return (
    <Container>
      {achievement && false && (
        <AchievementCardWithPhase achievement={achievement} />
      )}
      <Header>
        <Title
          onClick={() => {
            hideJournal();
          }}
        >
          JOURNAL
        </Title>
        <SaveStatus>{saveStatus}</SaveStatus>
        <Button
          onClick={() => {
            onDataSaved(journal);
          }}
        >
          SAVE
        </Button>
      </Header>
      <InputContainer>
        <textarea
          value={journal}
          placeholder="No Journal Data!"
          onChange={journalChanged}
          spellcheck="false"
        />
      </InputContainer>
    </Container>
  );
}
