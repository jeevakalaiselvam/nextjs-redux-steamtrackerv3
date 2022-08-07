import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  margin-right: 0.5rem;

  & input {
    background-color: rgba(0, 0, 0, 0.5);
    color: #61626d;
    outline: none;
    border: none;
    text-align: left;
    flex: 1;
    width: 150px;
    height: 100%;
    padding: 0.25rem;
  }
`;

const EditSave = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3049d1;
  height: 20px;
  padding: 0.5rem;
`;

export default function PhaseTitle({ gameId, phase, defaultTitle }) {
  const [editModeActive, setEditModeActive] = useState(false);
  const [titleData, setTitleData] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newTitle =
        localStorage.getItem(`${gameId}_PHASETITLE_${phase}`) || "...";
      console.log("SETTING TITLE");
      setTitleData(newTitle);
    }
  }, [gameId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const newTitle =
        localStorage.getItem(`${gameId}_PHASETITLE_${phase}`) || "...";
      console.log("SETTING TITLE");
      setTitleData(newTitle);
    }
  }, [editModeActive]);

  const titleDateChanged = (e) => {
    console.log("SETTING TITLE");
    const data = e.target.value;
    setTitleData((old) => data);
  };

  const saveClickHandler = (e) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`${gameId}_PHASETITLE_${phase}`, titleData);
    }
    setEditModeActive((old) => false);
  };

  return (
    <Container>
      {!editModeActive && (
        <Title
          onClick={() => {
            setEditModeActive((old) => true);
          }}
        >
          {titleData}
        </Title>
      )}
      {editModeActive && (
        <EditTitle>
          <EditText>
            <input type="text" value={titleData} onChange={titleDateChanged} />
          </EditText>
          <EditSave onClick={saveClickHandler}>
            <FaCheck />
          </EditSave>
        </EditTitle>
      )}
    </Container>
  );
}
