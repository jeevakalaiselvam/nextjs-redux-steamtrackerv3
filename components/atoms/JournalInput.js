import React, { useEffect, useState } from "react";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  color: #f1b51b;
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
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0);

  & textarea {
    width: 100%;
    outline: none;
    flex: 1;
    height: 400px;
    border: none;
    background: rgba(0, 0, 0, 0);
    padding: 1rem;
    resize: none;
    font-weight: 600;
    font-size: 1.5rem;
  }
`;

export default function JournalInput({ onDataSaved, journalData }) {
  const [journal, setJournal] = useState(journalData);

  //   useEffect(() => {
  //     const timeoutId = setTimeout(() => {
  //       onDataSaved(journal);
  //     }, 100);
  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   }, [journal]);

  const journalChanged = (e) => {
    const data = e.target.value;
    setJournal((old) => data);
  };

  useEffect(() => {
    setJournal((old) => journalData);
  }, [journalData]);

  return (
    <Container>
      <Header>
        <Title>JOURNAL</Title>
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
          onChange={journalChanged}
          spellcheck="false"
        />
      </InputContainer>
    </Container>
  );
}
