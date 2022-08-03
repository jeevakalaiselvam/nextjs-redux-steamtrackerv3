import {
  GAME_OPTION_PERCENTAGE_ASC,
  GAME_OPTION_PERCENTAGE_ASC_LOCKED,
  GAME_OPTION_PERCENTAGE_ASC_UNLOCKED,
  GAME_OPTION_PERCENTAGE_ASC_UNLOCKTIME,
  GAME_OPTION_PERCENTAGE_DESC,
  GAME_OPTION_PERCENTAGE_DESC_LOCKED,
  GAME_OPTION_PERCENTAGE_DESC_UNLOCKED,
  GAME_OPTION_PERCENTAGE_DESC_UNLOCKTIME,
} from "./filterHelper";

export const sortAchievementsByFilterOption = (achievements, filterOption) => {
  let newAchievements = [];
  switch (filterOption) {
    case GAME_OPTION_PERCENTAGE_DESC:
      newAchievements = achievements.sort(
        (ach1, ach2) => +ach1.percentage < +ach2.percentage
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
