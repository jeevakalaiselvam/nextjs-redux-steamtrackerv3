import {
  GAMES_OPTION_COMPLETION_ASC,
  GAMES_OPTION_COMPLETION_DESC,
  GAMES_OPTION_COMPLETION_STARTED,
} from "./filterHelper";

export const sortGamesByFilterOption = (games, filterOption) => {
  let newGames = [];
  switch (filterOption) {
    case GAMES_OPTION_COMPLETION_DESC:
      newGames = games.sort(
        (game1, game2) => +game1.completion < +game2.completion
      );
      break;
    case GAMES_OPTION_COMPLETION_ASC:
      newGames = games.sort(
        (game1, game2) => +game1.completion > +game2.completion
      );
      break;
    case GAMES_OPTION_COMPLETION_STARTED:
      newGames = games.filter(
        (game) => game.achievements.length !== game.toGet
      );
      newGames = newGames.sort(
        (game1, game2) => +game1.completion < +game2.completion
      );
      break;
    default:
      newGames = games.sort(
        (game1, game2) => +game1.completion < +game2.completion
      );
      break;
  }
  return newGames;
};

export const sortGamesBySearchTerm = (games, searchTerm) => {
  let newGames = games;
  if (searchTerm !== "") {
    newGames = games.filter((game) =>
      game.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
    );
  }
  return newGames;
};

export const addHiddenToGames = (games, gameId, hiddenAchievements) => {
  let newGames = [];
  newGames = games.map((game) => {
    let newGame = { ...game };
    if (game.id == gameId) {
      newGame = { ...newGame, hiddenAchievements };
    }
    return newGame;
  });

  return newGames;
};

export const refreshGameDataByGameId = (games, gameId, gameRefreshedData) => {
  let newGames = [];
  newGames = games.map((game) => {
    let newGame = { ...game };
    if (game.id == gameId) {
      newGame = { ...newGame, ...gameRefreshedData, recentRefresh: new Date() };
    }
    return newGame;
  });

  return newGames;
};
