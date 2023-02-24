import React from "react";
import styled from "styled-components";
import { GAMES_PAGE, GAME_PAGE } from "../../../helpers/constantHelper";
import SettingsCompletion from "../../settingsatoms/SettingsCompletion";
import SettingsOpacity from "../../settingsatoms/SettingsOpacity";
import SettingsTarget from "../../settingsatoms/SettingsTarget";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;

const SettingCard = styled.div`
  width: 70%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export default function SettingsContent() {
  return (
    <Container>
      <SettingCard>
        <SettingsOpacity type={GAME_PAGE} />
        <SettingsCompletion type={GAMES_PAGE} />
        <SettingsTarget type={GAME_PAGE} />
      </SettingCard>
    </Container>
  );
}
