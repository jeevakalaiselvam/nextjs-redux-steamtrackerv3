import { GAMES_OPTION_COMPLETION_DESC } from "./filterHelper";

export const sortGamesByFilterOption = (games, filterOption) => {
  let newGames = [];
  switch (filterOption) {
    case GAMES_OPTION_COMPLETION_DESC:
      newGames = games.sort(
        (game1, game2) => +game1.completion < +game2.completion
      );
      break;
    default:
      newGames = games.sort(
        (game1, game2) => +game1.completion < +game2.completion
      );
  }
  return newGames;
};
