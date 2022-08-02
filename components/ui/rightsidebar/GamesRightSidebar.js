import React from "react";
import styled from "styled-components";
import { GAME_OPTION_PERCENTAGE_DESC } from "../../../helpers/filterHelper";
import Achievements from "../../organisms/Achievements";

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

export default function GamesRightSidebar() {
  const steamtracker = useSelector((state) => state.steamtracker);
  const { games, settings } = steamtracker;

  const router = useRouter();
  const { gameId } = router.query;

  const game = games.find((game) => game.id == gameId);

  return (
    <Container>
      <Achievements
        game={game}
        filterOption={GAME_OPTION_PERCENTAGE_DESC}
        searchTerm={""}
      />
    </Container>
  );
}
