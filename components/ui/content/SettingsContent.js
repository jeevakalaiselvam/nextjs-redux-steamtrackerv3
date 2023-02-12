import React from "react";
import styled from "styled-components";
import { GAME_PAGE } from "../../../helpers/constantHelper";
import SettingsCompletion from "../../settingsatoms/SettingsCompletion";
import SettingsOpacity from "../../settingsatoms/SettingsOpacity";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;

const SettingCard = styled.div`
  width: 30%;
  min-height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function SettingsContent() {
  return (
    <Container>
      <SettingCard>
        <SettingsOpacity type={GAME_PAGE} />
        <SettingsCompletion type={GAME_PAGE} />
      </SettingCard>
    </Container>
  );
}
