import {
  GAME_OPTION_PERCENTAGE_ASC,
  GAME_OPTION_PERCENTAGE_ASC_LOCKED,
  GAME_OPTION_PERCENTAGE_ASC_UNLOCKED,
  GAME_OPTION_PERCENTAGE_DESC,
  GAME_OPTION_PERCENTAGE_DESC_LOCKED,
  GAME_OPTION_PERCENTAGE_DESC_UNLOCKED,
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
      newAchievements = achievements.sort(
        (ach1, ach2) => +ach1.percentage < +ach2.percentage
      );
      break;
    case GAME_OPTION_PERCENTAGE_ASC_LOCKED:
      newAchievements = achievements.filter(
        (achievement) => +achievement.achieved == 0
      );
      newAchievements = achievements.sort(
        (ach1, ach2) => +ach1.percentage > +ach2.percentage
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
