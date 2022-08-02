import { GAME_OPTION_PERCENTAGE_DESC } from "./filterHelper";

export const sortAchievementsByFilterOption = (achievements, filterOption) => {
  let newAchievements = [];
  switch (filterOption) {
    case GAME_OPTION_PERCENTAGE_DESC:
      newAchievements = achievements.sort(
        (ach1, ach2) => +ach1.percentage < +ach2.percentage
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
