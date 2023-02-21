import {
  COMMON_COLOR,
  EPIC_COLOR,
  LEGENDARY_COLOR,
  MARVEL_COLOR,
  RARE_COLOR,
  ULTRARARE_COLOR,
  UNCOMMON_COLOR,
  WASTE_COLOR,
} from "./colorHelper";

export const calculateRarityLeftFromGames = (games) => {
  let waste = 0,
    common = 0,
    uncommon = 0,
    rare = 0,
    epic = 0,
    legendary = 0,
    marvel = 0;

  let achievements = [];

  games.forEach((game) => {
    if (game.achievements.length > 0) {
      game.achievements.forEach((achievement) => {
        achievements.push(achievement);
      });
    }
  });

  if (achievements.length > 0) {
    achievements.forEach((achievement) => {
      if (achievement.achieved == 1) {
        if (achievement.percentage <= 1) {
          marvel++;
        } else if (achievement.percentage <= 5 && achievement.percentage > 1) {
          legendary++;
        } else if (achievement.percentage <= 10 && achievement.percentage > 5) {
          epic++;
        } else if (
          achievement.percentage <= 25 &&
          achievement.percentage > 10
        ) {
          rare++;
        } else if (
          achievement.percentage <= 50 &&
          achievement.percentage > 25
        ) {
          uncommon++;
        } else if (
          achievement.percentage <= 75 &&
          achievement.percentage > 50
        ) {
          common++;
        } else {
          waste++;
        }
      }
    });
  }

  return { waste, common, uncommon, rare, epic, legendary, marvel };
};

export const calculateRarityLeftFromAchievements = (achievements) => {
  let waste = 0,
    common = 0,
    uncommon = 0,
    rare = 0,
    epic = 0,
    legendary = 0,
    marvel = 0;
  let wastePercentage = 0,
    commonPercentage = 0,
    uncommonPercentage = 0,
    rarePercentage = 0,
    epicPercentage = 0,
    legendaryPercentage = 0,
    marvelPercentage = 0;
  let wasteCompleted = 0,
    commonCompleted = 0,
    uncommonCompleted = 0,
    rareCompleted = 0,
    epicCompleted = 0,
    legendaryCompleted = 0,
    marvelCompleted = 0;
  let wasteTarget = 0,
    commonTarget = 0,
    uncommonTarget = 0,
    rareTarget = 0,
    epicTarget = 0,
    legendaryTarget = 0,
    marvelTarget = 0;
  let remainingInTarget = 0;

  if (achievements.length > 0) {
    achievements.forEach((achievement) => {
      if (achievement.achieved == 1) {
        if (achievement.percentage <= 1) {
          marvelCompleted++;
        } else if (achievement.percentage <= 5 && achievement.percentage > 1) {
          legendaryCompleted++;
        } else if (achievement.percentage <= 10 && achievement.percentage > 5) {
          epicCompleted++;
        } else if (
          achievement.percentage <= 25 &&
          achievement.percentage > 10
        ) {
          rareCompleted++;
        } else if (
          achievement.percentage <= 50 &&
          achievement.percentage > 25
        ) {
          uncommonCompleted++;
        } else if (
          achievement.percentage <= 75 &&
          achievement.percentage > 50
        ) {
          commonCompleted++;
        } else {
          wasteCompleted++;
        }
      }
      if (achievement.percentage <= 1) {
        marvel++;
      } else if (achievement.percentage <= 5 && achievement.percentage > 1) {
        legendary++;
      } else if (achievement.percentage <= 10 && achievement.percentage > 5) {
        epic++;
      } else if (achievement.percentage <= 25 && achievement.percentage > 10) {
        rare++;
      } else if (achievement.percentage <= 50 && achievement.percentage > 25) {
        uncommon++;
      } else if (achievement.percentage <= 75 && achievement.percentage > 50) {
        common++;
      } else {
        waste++;
      }
    });
  }

  wastePercentage = Math.floor((wasteCompleted / waste) * 100);
  commonPercentage = Math.floor((commonCompleted / common) * 100);
  uncommonPercentage = Math.floor((uncommonCompleted / uncommon) * 100);
  rarePercentage = Math.floor((rareCompleted / rare) * 100);
  epicPercentage = Math.floor((epicCompleted / epic) * 100);
  legendaryPercentage = Math.floor((legendaryCompleted / legendary) * 100);
  marvelPercentage = Math.floor((marvelCompleted / marvel) * 100);

  if (waste === 0) {
    wasteTarget = 0;
  }
  if (common === 0) {
    commonTarget = 0;
  }
  if (uncommon === 0) {
    uncommonTarget = 0;
  }
  if (rare === 0) {
    rareTarget = 0;
  }
  if (epic === 0) {
    epicTarget = 0;
  }
  if (legendary === 0) {
    legendaryTarget = 0;
  }
  if (marvel === 0) {
    marvelTarget = 0;
  }

  wasteTarget = Math.ceil(waste * 1.0) - wasteCompleted;
  commonTarget = Math.ceil(common * 1.0) - commonCompleted;
  uncommonTarget = Math.ceil(uncommon * 1.0) - uncommonCompleted;
  rareTarget = Math.ceil(rare * 1.0) - rareCompleted;
  epicTarget = Math.ceil(epic * 0.75) - epicCompleted;
  legendaryTarget = Math.ceil(legendary * 0.5) - legendaryCompleted;
  marvelTarget = Math.ceil(marvel * 0.5) - marvelCompleted;

  remainingInTarget =
    wasteTarget +
    commonTarget +
    uncommonTarget +
    rareTarget +
    epicTarget +
    legendaryTarget +
    marvelTarget;

  return {
    waste,
    common,
    uncommon,
    rare,
    epic,
    legendary,
    marvel,
    wasteTarget,
    commonTarget,
    uncommonTarget,
    rareTarget,
    epicTarget,
    legendaryTarget,
    marvelTarget,
    remainingInTarget,
  };
};

export const getRarityColorFromPercentage = (percentage) => {
  if (percentage <= 1) {
    return MARVEL_COLOR;
  } else if (percentage <= 5 && percentage > 1) {
    return LEGENDARY_COLOR;
  } else if (percentage <= 10 && percentage > 5) {
    return EPIC_COLOR;
  } else if (percentage <= 25 && percentage > 10) {
    return RARE_COLOR;
  } else if (percentage <= 50 && percentage > 25) {
    return UNCOMMON_COLOR;
  } else if (percentage <= 75 && percentage > 50) {
    return COMMON_COLOR;
  } else {
    return WASTE_COLOR;
  }
};

export const calculateXPFromPercentage = (percentage) => {
  if (percentage <= 1) {
    return 250;
  } else if (percentage <= 5 && percentage > 1) {
    return 100;
  } else if (percentage <= 10 && percentage > 5) {
    return 75;
  } else if (percentage <= 25 && percentage > 10) {
    return 50;
  } else if (percentage <= 50 && percentage > 25) {
    return 25;
  } else if (percentage <= 75 && percentage > 50) {
    return 10;
  } else {
    return 5;
  }
};

export const getRarityTextFromPercentage = (percentage) => {
  if (percentage <= 1) {
    return "MARVEL";
  } else if (percentage <= 5 && percentage > 1) {
    return "LEGENDARY";
  } else if (percentage <= 10 && percentage > 5) {
    return "EPIC";
  } else if (percentage <= 25 && percentage > 10) {
    return "RARE";
  } else if (percentage <= 50 && percentage > 25) {
    return "UNCOMMON";
  } else if (percentage <= 75 && percentage > 50) {
    return "COMMON";
  } else {
    return "WASTE";
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

export const getAllXPFromAchievements = (
  achievements,
  completionPercentageTarget
) => {
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
  console.log("JEEVA -------------------------------------------------------");
  console.log("JEEVA - CALCULATION", {
    completedTotal,
    total,
    adjustedTotal: total * (completionPercentageTarget / 100),
  });

  let percentageCompletion = Math.floor(
    (completedTotal / (total * (completionPercentageTarget / 100))) * 100
  );

  return {
    totalXP,
    completedXP,
    remainingXP,
    completedTotal,
    total,
    percentageCompletion,
  };
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

  let recent30Dates = new Array(30).fill(1).map((item, index) => index);

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

  return { recentHistory };
};
