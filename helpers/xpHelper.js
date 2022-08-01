export const XP_FOR_LEVEL = 1000;

export const calculateXPFromPercentage = (percentage) => {
  if (percentage <= 5) {
    return 500;
  } else if (percentage <= 10 && percentage > 5) {
    return 250;
  } else if (percentage <= 25 && percentage > 10) {
    return 100;
  } else if (percentage <= 50 && percentage > 25) {
    return 75;
  } else if (percentage <= 75 && percentage > 50) {
    return 50;
  } else {
    return 25;
  }
};

export const getAllXPFromAchievements = (achievements) => {
  let xpData = { totalXP: 0, completedXP: 0, remainingXP: 0 };
  let { totalXP, completedXP, remainingXP } = xpData;
  achievements.forEach((achievement) => {
    totalXP = totalXP + +calculateXPFromPercentage(+achievement.percentage);
    if (+achievement.achieved == 0) {
      remainingXP =
        remainingXP + +calculateXPFromPercentage(+achievement.percentage);
    }
    if (+achievement.achieved == 1) {
      completedXP =
        completedXP + +calculateXPFromPercentage(+achievement.percentage);
    }
  });
  return { totalXP, completedXP, remainingXP };
};
