export const calculateXPFromPercentage = (percentage) => {
  if (percentage <= 5) {
    return 100;
  } else if (percentage <= 10 && percentage > 5) {
    return 95;
  } else if (percentage <= 15 && percentage > 10) {
    return 90;
  } else if (percentage <= 20 && percentage > 15) {
    return 85;
  } else if (percentage <= 25 && percentage > 20) {
    return 80;
  } else if (percentage <= 30 && percentage > 25) {
    return 75;
  } else if (percentage <= 35 && percentage > 30) {
    return 70;
  } else if (percentage <= 40 && percentage > 35) {
    return 65;
  } else if (percentage <= 45 && percentage > 40) {
    return 60;
  } else if (percentage <= 50 && percentage > 45) {
    return 55;
  } else if (percentage <= 55 && percentage > 50) {
    return 50;
  } else if (percentage <= 60 && percentage > 55) {
    return 45;
  } else if (percentage <= 65 && percentage > 60) {
    return 40;
  } else if (percentage <= 70 && percentage > 65) {
    return 35;
  } else if (percentage <= 75 && percentage > 70) {
    return 30;
  } else if (percentage <= 80 && percentage > 75) {
    return 25;
  } else if (percentage <= 85 && percentage > 80) {
    return 20;
  } else if (percentage <= 90 && percentage > 85) {
    return 15;
  } else if (percentage <= 95 && percentage > 90) {
    return 10;
  } else {
    return 5;
  }
};

export const getXPFromAchievements = (achievements) => {
  let totalXP = 0;
  if (achievements) {
    achievements.forEach((achievement) => {
      totalXP = totalXP + +calculateXPFromPercentage(+achievement.percentage);
    });
  }
  return totalXP;
};

export const getAllXPFromAchievements = (achievements) => {
  let xpData = { totalXP: 0, completedXP: 0, remainingXP: 0 };
  let { totalXP, completedXP, remainingXP } = xpData;
  if (achievements) {
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
  }
  return { totalXP, completedXP, remainingXP };
};

export const calculateTotalXPForAllGames = (games) => {
  let totalXP = 0;
  if (games.length > 0) {
    games.forEach((game) => {
      game.achievements.forEach((achievement) => {
        if (achievement.achieved == 1) {
          totalXP += calculateXPFromPercentage(achievement.percentage);
        }
      });
    });
  }
  return totalXP;
};

export const LEVEL_UP_XP = 500;
export const XP_FOR_LEVEL = 500;

export const COMPLETION_TARGET = 1;
export const calculateLevelFromAllGames = (games) => {
  let totalXP = 0;
  let unlockedToday = 0;
  let date = new Date();
  date.setHours(0, 0, 0, 0);
  let timeUTC;
  timeUTC = date.getTime() / 1000;
  if (games.length > 0) {
    games.forEach((game) => {
      game.achievements.forEach((achievement) => {
        if (achievement.achieved == 1) {
          if (achievement.unlocktime > timeUTC) {
            unlockedToday += calculateXPFromPercentage(achievement.percentage);
          }
          totalXP += calculateXPFromPercentage(achievement.percentage);
        }
      });
    });
  }
  const xpTotal = totalXP;
  const currentLevel = Math.floor(totalXP / LEVEL_UP_XP);
  const toNextLevel = xpTotal % LEVEL_UP_XP;
  return { xpTotal, currentLevel, toNextLevel, unlockedToday };
};
