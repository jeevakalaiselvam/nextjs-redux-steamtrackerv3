import next from "next";
import {
  EPIC_COLOR,
  LEGENDARY_COLOR,
  MARVEL_COLOR,
  RARE_COLOR,
  UNCOMMON_COLOR,
  WASTE_COLOR,
} from "./colorHelper";
import {
  GAMES_OPTION_COMPLETION_ASC,
  GAMES_OPTION_COMPLETION_DESC,
  GAMES_OPTION_COMPLETION_PINNED,
  GAMES_OPTION_COMPLETION_STARTED,
  GAMES_OPTION_RECENT,
} from "./filterHelper";
import { calculateRarityLeftFromAchievements } from "./xpHelper";

export const sortGamesByFilterOption = (
  games,
  filterOption,
  pinnedGames,
  completionPercentageTarget,
  targetSettings
) => {
  let newGames = [];
  switch (filterOption) {
    case GAMES_OPTION_RECENT:
      newGames = games.sort(
        (game1, game2) => +game1.lastPlayed < +game2.lastPlayed
      );
      break;
    case GAMES_OPTION_COMPLETION_PINNED:
      let allCompletedGames = [];
      let allPinnedGames = [];
      let allStartedGames = [];
      let completedGameIds = [];
      let pinnedGameIds = [];
      let startedGameIds = [];
      allCompletedGames = games.filter((game) => {
        const rarityInfo = calculateRarityLeftFromAchievements(
          game.achievements,
          targetSettings
        );

        if (game.completion >= 50) {
          completedGameIds.push(game.id);
          return true;
        }
      });

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
          game.playtime > 0 &&
          !completedGameIds?.includes(game.id) &&
          !pinnedGameIds?.includes(game.id) &&
          game.completion != 0
        ) {
          startedGameIds.push(game.id);
          return true;
        }
      });

      newGames = [...allCompletedGames, ...allStartedGames, ...allPinnedGames];

      newGames = newGames.sort((game1, game2) => {
        return game2.completion - game1.completion;
      });

      // newGames = newGames.filter((game) => {
      //   const rarityInfo = calculateRarityLeftFromAchievements(
      //     game.achievements,
      //     targetSettings
      //   );

      //   return pinnedGames?.includes(game.id);
      // });

      break;
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

export const calculaNextStageForGame = (game) => {
  let nextStage = {
    next: 0,
    iconColor: WASTE_COLOR,
  };

  let completion = game.completion;

  if (completion === 100) {
    nextStage.next = 0;
    nextStage.iconColor = MARVEL_COLOR;
  } else if (completion >= 80 && completion < 100) {
    nextStage.next = Math.floor(game.total * 1) - game.completed;
    nextStage.iconColor = MARVEL_COLOR;
  } else if (completion >= 50 && completion < 80) {
    nextStage.next = Math.floor(game.total * 0.8) - game.completed;
    nextStage.iconColor = EPIC_COLOR;
  } else if (completion >= 25 && completion < 50) {
    nextStage.next = Math.floor(game.total * 0.5) - game.completed;
    nextStage.iconColor = LEGENDARY_COLOR;
  } else if (completion >= 10 && completion < 25) {
    nextStage.next = Math.floor(game.total * 0.25) - game.completed;
    nextStage.iconColor = RARE_COLOR;
  } else {
    nextStage.next = Math.floor(game.total * 0.1) - game.completed;
    nextStage.iconColor = UNCOMMON_COLOR;
  }

  console.log("JEEVA - NEXT STAGE ", game.name, completion, nextStage);
  return nextStage;
};
