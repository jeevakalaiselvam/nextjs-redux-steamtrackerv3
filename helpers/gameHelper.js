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

export const ALL = "1";
export const EASY = "2";
export const HARD = "3";
export const GRIND = "4";
export const MISSABLE = "5";
export const UNLOCKED = "UNLOCKED";

export const getPhaseAddedGames = (game) => {
  let newGame = { ...game };
  if (game && game.achievements) {
    let phaseAddedAchievements = game.achievements.map((achievement) => {
      let newAchievement = { ...achievement };
      if (typeof window !== "undefined") {
        newAchievement = {
          ...achievement,
          phase: localStorage.getItem(`${game.id}_${achievement.name}_PHASE`)
            ? localStorage.getItem(`${game.id}_${achievement.name}_PHASE`)
            : ALL,
        };
      }
      return newAchievement;
    });
    newGame = { ...newGame, achievements: phaseAddedAchievements };
  }
  console.log("RETURNING NEW GAME", newGame);
  return newGame;
};

export const updateAchievementPhaseForGame = (game, achievementName, phase) => {
  let newGame = { ...game };

  let newAchievements = game.achievements.map((achievement) => {
    let newAchievement = { ...achievement };
    if (achievement.name == achievementName) {
      newAchievement = { ...achievement, phase };
    }
    return newAchievement;
  });

  newGame = { ...game, achievements: newAchievements };

  return newGame;
};

export const tranformGameToIncludeOnlyPhase = (achievements, phaseFilter) => {
  let newAchievements = [];
  if (achievements.length > 0) {
    newAchievements = achievements.filter(
      (achievement) => achievement.phase == phaseFilter
    );
  }
  return newAchievements;
};

export const tranformGameToIncludeOnlyUnlockedRecent = (achievements) => {
  let newAchievements = [];
  if (achievements) {
    newAchievements = achievements.filter(
      (achievement) => +achievement.achieved == 1
    );
    newAchievements = newAchievements.sort(
      (ach1, ach2) => +ach1.unlocktime < +ach2.unlocktime
    );
  }
  return newAchievements;
};
