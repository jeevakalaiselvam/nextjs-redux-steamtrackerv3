import next from "next";
import {
  BELOW_WASTE_COLOR,
  COMMON_COLOR,
  COMPLETION0_COLOR,
  COMPLETION100_COLOR,
  COMPLETION10_COLOR,
  COMPLETION1_COLOR,
  COMPLETION25_COLOR,
  COMPLETION50_COLOR,
  COMPLETION75_COLOR,
  COMPLETION90_COLOR,
  COPPER,
  EPIC,
  EPIC_COLOR,
  INFINITY,
  INFINITY_COLOR,
  LEGENDARY,
  LEGENDARY_COLOR,
  MARVEL,
  MARVEL_COLOR,
  RARE,
  RARE_COLOR,
  UNCOMMON_COLOR,
  WASTE,
  WASTE_COLOR,
} from "./colorHelper";
import {
  GAMES_OPTION_COMPLETION_ASC,
  GAMES_OPTION_COMPLETION_DESC,
  GAMES_OPTION_COMPLETION_PINNED,
  GAMES_OPTION_COMPLETION_STARTED,
  GAMES_OPTION_RECENT,
} from "./filterHelper";
import {
  calculateRarityLeftFromAchievements,
  COMPLETION100,
  COMPLETION90,
  COMPLETION75,
  COMPLETION50,
  COMPLETION25,
  COMPLETION10,
  COMPLETION1,
} from "./xpHelper";

export const calculaNextStageForGame = (game) => {
  let nextStage = {
    next: 0,
    to1: 0,
    to10: 0,
    to25: 0,
    to50: 0,
    to75: 0,
    to90: 0,
    to100: 0,
    iconColor: COMPLETION10_COLOR,
  };

  let completion = +game.completion;
  nextStage.to100 =
    Math.ceil(game.total * (COMPLETION100 / 100)) - game.completed;
  nextStage.to90 =
    Math.ceil(game.total * (COMPLETION90 / 100)) - game.completed;
  nextStage.to75 =
    Math.ceil(game.total * (COMPLETION75 / 100)) - game.completed;
  nextStage.to50 =
    Math.ceil(game.total * (COMPLETION50 / 100)) - game.completed;
  nextStage.to25 =
    Math.ceil(game.total * (COMPLETION25 / 100)) - game.completed;
  nextStage.to10 =
    Math.ceil(game.total * (COMPLETION10 / 100)) - game.completed;
  nextStage.to1 = Math.ceil(game.total * (COMPLETION1 / 100)) - game.completed;
  if (completion == COMPLETION100) {
    nextStage.next = 0;
    nextStage.iconColor = COMPLETION100_COLOR;
  } else if (completion >= COMPLETION90 && completion < COMPLETION100) {
    nextStage.next =
      Math.ceil(game.total * (COMPLETION100 / 100)) - game.completed;
    nextStage.iconColor = COMPLETION100_COLOR;
  } else if (completion >= COMPLETION75 && completion < COMPLETION90) {
    nextStage.next =
      Math.ceil(game.total * (COMPLETION90 / 100)) - game.completed;
    nextStage.iconColor = COMPLETION90_COLOR;
  } else if (completion >= COMPLETION50 && completion < COMPLETION75) {
    nextStage.next =
      Math.ceil(game.total * (COMPLETION75 / 100)) - game.completed;
    nextStage.iconColor = COMPLETION75_COLOR;
  } else if (completion >= COMPLETION25 && completion < COMPLETION50) {
    nextStage.next =
      Math.ceil(game.total * (COMPLETION50 / 100)) - game.completed;
    nextStage.iconColor = COMPLETION50_COLOR;
  } else if (completion >= COMPLETION10 && completion < COMPLETION25) {
    nextStage.next =
      Math.ceil(game.total * (COMPLETION25 / 100)) - game.completed;
    nextStage.iconColor = COMPLETION25_COLOR;
  } else if (completion >= COMPLETION1 && completion < COMPLETION10) {
    nextStage.next =
      Math.ceil(game.total * (COMPLETION10 / 100)) - game.completed;
    nextStage.iconColor = COMPLETION10_COLOR;
  } else {
    nextStage.next =
      Math.ceil(game.total * (COMPLETION1 / 100)) - game.completed;
    nextStage.iconColor = COMPLETION1_COLOR;
  }

  return nextStage;
};

export const sortGamesByFilterOption = (
  games,
  filterOption,
  pinnedGames,
  completionPercentageTarget,
  targetSettings,
  sidebarGameFilter
) => {
  let newGames = [];
  switch (filterOption) {
    case GAMES_OPTION_RECENT:
      newGames = games.sort((game1, game2) => {
        if (+game2.lastPlayed < +game1.lastPlayed) {
          return -1;
        }
      });
      break;
    case GAMES_OPTION_COMPLETION_PINNED:
      let allCompletedGames = [];
      let allPinnedGames = [];
      let allStartedGames = [];
      let completedGameIds = [];
      let pinnedGameIds = [];
      let startedGameIds = [];

      allCompletedGames = allCompletedGames.sort((game1, game2) => {
        return game2.completion - game1.completion;
      });

      allPinnedGames = games.filter((game) => {
        if (
          pinnedGames?.includes(game.id) &&
          !completedGameIds?.includes(game.id)
        ) {
          pinnedGameIds.push(game.id);
          return true;
        }
      });

      allStartedGames = games.filter((game) => {
        if (
          !completedGameIds?.includes(game.id) &&
          !pinnedGameIds?.includes(game.id) &&
          game.completed > 1
        ) {
          console.log("STARTED GAME", game.name);
          startedGameIds.push(game.id);
          return true;
        }
      });

      newGames = [...allCompletedGames, ...allStartedGames, ...allPinnedGames];

      newGames = newGames.sort((game1, game2) => {
        return game2.completion - game1.completion;
      });

      console.log("CHECKING SIDEBAR", { sidebarGameFilter });
      if (sidebarGameFilter == INFINITY) {
        newGames = newGames.filter((game) => {
          if (game.completion == COMPLETION100) {
            return true;
          }
        });
      } else if (sidebarGameFilter == MARVEL) {
        newGames = newGames.filter((game) => {
          if (
            game.completion < COMPLETION100 &&
            game.completion >= COMPLETION90
          ) {
            return true;
          }
        });
      } else if (sidebarGameFilter == LEGENDARY) {
        newGames = newGames.filter((game) => {
          if (
            game.completion < COMPLETION90 &&
            game.completion >= COMPLETION75
          ) {
            return true;
          }
        });
      } else if (sidebarGameFilter == EPIC) {
        newGames = newGames.filter((game) => {
          if (
            game.completion < COMPLETION75 &&
            game.completion >= COMPLETION50
          ) {
            return true;
          }
        });
      } else if (sidebarGameFilter == RARE) {
        newGames = newGames.filter((game) => {
          if (
            game.completion < COMPLETION50 &&
            game.completion >= COMPLETION25
          ) {
            return true;
          }
        });
      } else if (sidebarGameFilter == WASTE) {
        newGames = newGames.filter((game) => {
          if (
            game.completion < COMPLETION25 &&
            game.completion >= COMPLETION10
          ) {
            return true;
          }
        });
      } else if (sidebarGameFilter == COPPER) {
        newGames = newGames.filter((game) => {
          if (
            game.completion < COMPLETION10 &&
            game.completion >= COMPLETION1
          ) {
            return true;
          }
        });
      } else {
        if (sidebarGameFilter == "NONE") {
          newGames = newGames.filter((game) => {
            return true;
          });
        } else {
        }
      }
      break;
    case GAMES_OPTION_COMPLETION_DESC:
      newGames = games.sort(
        (game1, game2) => +game2.completion < +game1.completion
      );
      newGames = newGames.sort(
        (game1, game2) => +game2.lastPlayed > +game1.lastPlayed
      );
      break;
    case GAMES_OPTION_COMPLETION_ASC:
      newGames = games.sort(
        (game1, game2) => +game1.completion > +game2.completion
      );
      break;
    case GAMES_OPTION_COMPLETION_STARTED:
      newGames = games.filter((game) => {
        let total = game?.achievements?.length ?? 0;
        let toGet = game?.toGet ?? 0;
        let completed = total - toGet;
        return completed > 1;
      });
      newGames = newGames.sort(
        (game1, game2) => +game2.completion < +game1.completion
      );
      break;
    default:
      newGames = games.sort(
        (game1, game2) => +game1.completion < +game2.completion
      );
      break;
  }
  console.log("JEEVA - NEW GAMES", { newGames, filterOption });
  return newGames;
};

export const sortGamesBySearchTerm = (games, searchTerm) => {
  let newGames = games;
  if (searchTerm !== "") {
    newGames = games.filter((game) =>
      game.name.toLowerCase().trim()?.includes(searchTerm.toLowerCase().trim())
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
      let completed = 0,
        toGet = 0,
        total = 0;
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
    phaseAddedAchievements = phaseAddedAchievements.filter((achievement) => {
      if (typeof window !== "undefined") {
        let ignoredAchievementsInStorage =
          localStorage.getItem(`${game.id}_IGNORE`) || JSON.stringify([]);
        let ignoredAchievements = JSON.parse(ignoredAchievementsInStorage);
        if (!ignoredAchievements?.includes(achievement.name)) {
          return true;
        }
      }
    });
    newGame = { ...newGame, achievements: phaseAddedAchievements };
  }
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
