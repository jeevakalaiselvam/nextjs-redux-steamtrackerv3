import {
  GAME_OPTION_PERCENTAGE_ASC,
  GAME_OPTION_PERCENTAGE_ASC_LOCKED,
  GAME_OPTION_PERCENTAGE_ASC_UNLOCKED,
  GAME_OPTION_PERCENTAGE_ASC_UNLOCKTIME,
  GAME_OPTION_PERCENTAGE_DESC,
  GAME_OPTION_PERCENTAGE_DESC_IGNORED,
  GAME_OPTION_PERCENTAGE_DESC_LOCKED,
  GAME_OPTION_PERCENTAGE_DESC_UNLOCKED,
  GAME_OPTION_PERCENTAGE_DESC_UNLOCKTIME,
} from "./filterHelper";
import { getRarityTextFromPercentage } from "./xpHelper";

export const filterAchievementsByRarityFilter = (
  filteredAchievements,
  gameId,
  rarityFilters
) => {
  let newAchievements = [];
  const defaultRarity = "ALL";
  const selectedRarity = rarityFilters[gameId] || "ALL";

  newAchievements = filteredAchievements.filter((achievement) => {
    const achievementRarity = getRarityTextFromPercentage(
      achievement.percentage
    );
    if (selectedRarity == achievementRarity) {
      return true;
    } else {
      return false;
    }
  });

  return newAchievements;
};

export const sortAchievementsByFilterOption = (
  achievements,
  filterOption,
  gameId
) => {
  let newAchievements = [];
  switch (filterOption) {
    case GAME_OPTION_PERCENTAGE_DESC:
      newAchievements = achievements.sort(
        (ach1, ach2) => +ach2.percentage - +ach1.percentage
      );
      break;
    case GAME_OPTION_PERCENTAGE_ASC:
      newAchievements = achievements.sort(
        (ach1, ach2) => +ach1.percentage > +ach2.percentage
      );
      break;
    case GAME_OPTION_PERCENTAGE_DESC_UNLOCKED:
      newAchievements = achievements.filter(
        (achievement) => +achievement.achieved == 1
      );
      newAchievements = newAchievements.sort(
        (ach1, ach2) => +ach1.percentage < +ach2.percentage
      );
      break;
    case GAME_OPTION_PERCENTAGE_ASC_UNLOCKED:
      newAchievements = achievements.filter(
        (achievement) => +achievement.achieved == 1
      );
      newAchievements = newAchievements.sort(
        (ach1, ach2) => +ach1.percentage > +ach2.percentage
      );
      break;
    case GAME_OPTION_PERCENTAGE_DESC_LOCKED:
      newAchievements = achievements.filter(
        (achievement) => +achievement.achieved == 0
      );
      newAchievements = newAchievements.sort(
        (ach1, ach2) => +ach1.percentage < +ach2.percentage
      );
      break;
    case GAME_OPTION_PERCENTAGE_DESC_IGNORED:
      newAchievements = achievements.filter(
        (achievement) => +achievement.achieved == 0
      );
      newAchievements = newAchievements.sort(
        (ach1, ach2) => +ach1.percentage < +ach2.percentage
      );
      break;
    case GAME_OPTION_PERCENTAGE_ASC_LOCKED:
      newAchievements = achievements.filter(
        (achievement) => +achievement.achieved == 0
      );
      newAchievements = newAchievements.sort(
        (ach1, ach2) => +ach1.percentage > +ach2.percentage
      );
      break;
    case GAME_OPTION_PERCENTAGE_DESC_UNLOCKTIME:
      newAchievements = achievements.filter(
        (achievement) => +achievement.achieved == 1
      );
      newAchievements = newAchievements.sort(
        (ach1, ach2) => +ach1.unlocktime > +ach2.unlocktime
      );
      break;
    case GAME_OPTION_PERCENTAGE_ASC_UNLOCKTIME:
      newAchievements = achievements.filter(
        (achievement) => +achievement.achieved == 1
      );
      newAchievements = newAchievements.sort(
        (ach1, ach2) => +ach1.unlocktime < +ach2.unlocktime
      );
      break;
    default:
      newAchievements = achievements.sort(
        (ach1, ach2) => +ach1.percentage < +ach2.percentage
      );
      break;
  }
  return newAchievements;
};

export const getFormattedDate = (unlocktime) => {
  return new Date(unlocktime * 1000).toLocaleString("en-US");
};

export const searchFilteredAchievements = (achievements, searchTerm) =>
  achievements.filter((achievement) => {
    if (searchTerm == "") {
      return true;
    } else {
      if (achievement?.displayName && achievement?.description) {
        if (
          achievement.displayName
            .toLowerCase()
            .trim()
            .includes(searchTerm.toLowerCase().trim()) ||
          achievement.description
            .toLowerCase()
            .trim()
            .includes(searchTerm.toLowerCase().trim())
        ) {
          return true;
        }
      }
    }
  });

export const getPhaseFiltedAchievements = (gameId, achievements, phase) => {
  let newAchievements = [];
  if (achievements) {
    newAchievements = achievements.filter(
      (achievement) => achievement.phase == phase
    );
  }
  return newAchievements;
};

export const getaUnlockedAchievementsByType = (achievements, type) => {
  let newAchievements = [];
  if (achievements) {
    if (type == "TODAY") {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate());
      let timeUTC;
      timeUTC = date.getTime() / 1000;

      newAchievements = achievements.filter(
        (achievement) =>
          achievement.achieved == 1 && achievement.unlocktime > timeUTC
      );
    }

    if (type == "UNTILYESTERDAY") {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate());
      let timeUTC;
      timeUTC = date.getTime() / 1000;

      newAchievements = achievements.filter(
        (achievement) =>
          achievement.achieved == 1 && achievement.unlocktime <= timeUTC
      );
    }

    if (type == "WEEK") {
      let date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - 7);
      let timeUTC;
      timeUTC = date.getTime() / 1000;

      newAchievements = achievements.filter(
        (achievement) =>
          achievement.achieved == 1 && achievement.unlocktime > timeUTC
      );
    }

    if (type == "ALL") {
      newAchievements = achievements.filter(
        (achievement) => achievement.achieved == 1
      );
    }
  }

  return newAchievements;
};

export const getaUnlockedAchievementsByRecent30Days = (achievements) => {
  let newAchievements = [];
  let achievementMapper = {};

  if (achievements.length) {
    let last30Days = new Array(30).fill(0).map((item, index) => index);

    last30Days.forEach((dayIndex) => {
      let dateStart = new Date();
      let dateOld = new Date();

      dateStart.setHours(0, 0, 0, 0);
      dateOld.setHours(0, 0, 0, 0);

      dateStart.setDate(dateStart.getDate() - dayIndex);
      dateOld.setDate(dateStart.getDate() - dayIndex - 1);

      let timeUTCStart = dateStart.getTime() / 1000 + 40000;
      let timeUTCOld = dateOld.getTime() / 1000 + 40000;

      newAchievements = achievements.filter(
        (achievement) =>
          achievement.achieved == 1 &&
          achievement.unlocktime < timeUTCStart &&
          achievement.unlocktime >= timeUTCOld
      );
      achievementMapper[dayIndex] = newAchievements;
    });
  }

  return achievementMapper;
};

export const getAllUnlockedAchievementsTodayAndYesterday = (games) => {
  let unlockedAchievements = [];
  if (games.length) {
    games.forEach((game) => {
      game.achievements.forEach((achievement) => {
        if (achievement.achieved == 1) {
          unlockedAchievements.push(achievement);
        }
      });
    });

    unlockedAchievements = unlockedAchievements.sort(
      (ach1, ach2) => +ach1.unlocktime < +ach2.unlocktime
    );
  }

  return {
    allAchievementsToday: getaUnlockedAchievementsByType(
      unlockedAchievements,
      "TODAY"
    ),
    allAchievementsYesterday: getaUnlockedAchievementsByType(
      unlockedAchievements,
      "UNTILYESTERDAY"
    ),
  };
};

export const getAllUnlockedAchievements = (games) => {
  let unlockedAchievements = [];
  if (games.length) {
    games.forEach((game) => {
      game.achievements.forEach((achievement) => {
        if (achievement.achieved == 1) {
          unlockedAchievements.push(achievement);
        }
      });
    });

    unlockedAchievements = unlockedAchievements.sort(
      (ach1, ach2) => +ach1.unlocktime < +ach2.unlocktime
    );
  }
  return unlockedAchievements;
};

export const removeIgnoredAchievements = (games) => {
  return games;
};
