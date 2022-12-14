export const calculateXPFromPercentage = (percentage) => {
  if (percentage <= 1) {
    return 1000;
  } else if (percentage <= 5 && percentage > 1) {
    return 500;
  } else if (percentage <= 10 && percentage > 5) {
    return 250;
  } else if (percentage <= 25 && percentage > 10) {
    return 125;
  } else if (percentage <= 50 && percentage > 25) {
    return 100;
  } else if (percentage <= 75 && percentage > 50) {
    return 50;
  } else {
    return 25;
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
  let completedTotal = 0,
    total = 0;
  let { totalXP, completedXP, remainingXP } = xpData;
  if (achievements) {
    achievements.forEach((achievement) => {
      total += 1;
      totalXP = totalXP + +calculateXPFromPercentage(+achievement.percentage);
      if (+achievement.achieved == 0) {
        remainingXP =
          remainingXP + +calculateXPFromPercentage(+achievement.percentage);
      }
      if (+achievement.achieved == 1) {
        completedTotal += 1;
        completedXP =
          completedXP + +calculateXPFromPercentage(+achievement.percentage);
      }
    });
  }
  return { totalXP, completedXP, remainingXP, completedTotal, total };
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

export const LEVEL_UP_XP = 1000;
export const XP_FOR_LEVEL = 1000;

export const COMPLETION_TARGET = 1.0;
export const calculateLevelFromAllGames = (games) => {
  let totalXP = 0;
  let unlockedToday = 0;
  let unlockedTodayCount = 0;
  let unlockedAll = 0;
  let date = new Date();
  date.setHours(0, 0, 0, 0);
  let timeUTC;
  timeUTC = date.getTime() / 1000;
  if (games.length > 0) {
    games.forEach((game) => {
      game.achievements.forEach((achievement) => {
        if (achievement.achieved == 1) {
          unlockedAll++;
          if (achievement.unlocktime > timeUTC) {
            unlockedTodayCount += 1;
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
  return {
    xpTotal,
    currentLevel,
    toNextLevel,
    unlockedToday,
    unlockedAll,
    unlockedTodayCount,
  };
};

export const calculateRecentHistory = (games) => {
  let recentHistory = {};

  let recent30Dates = new Array(60).fill(1).map((item, index) => index);

  recent30Dates.forEach((dayIndex) => {
    recentHistory[dayIndex] = [];
    let dateOld = new Date();
    dateOld.setHours(0, 0, 0, 0);
    dateOld.setDate(dateOld.getDate() - dayIndex);
    let timeUTCOld;
    timeUTCOld = dateOld.getTime() / 1000;

    let dateNew = new Date();
    dateNew.setHours(0, 0, 0, 0);
    dateNew.setDate(dateNew.getDate() - dayIndex + 1);
    let timeUTCNew;
    timeUTCNew = dateNew.getTime() / 1000;

    if (games.length > 0) {
      games.forEach((game) => {
        game.achievements.forEach((achievement) => {
          if (achievement.achieved == 1) {
            if (
              achievement.unlocktime > timeUTCOld &&
              achievement.unlocktime < timeUTCNew
            ) {
              recentHistory[dayIndex].push(achievement);
            }
          }
        });
      });
    }
  });

  console.log("RECENT DATESS", recentHistory);

  return { recentHistory };
};
