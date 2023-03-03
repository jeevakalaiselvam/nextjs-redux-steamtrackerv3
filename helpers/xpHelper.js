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

export const MARVEL_LOWER = 0;
export const MARVEL_HIGHER = 5;
export const LEGENDARY_LOWER = 5;
export const LEGENDARY_HIGHER = 10;
export const EPIC_LOWER = 10;
export const EPIC_HIGHER = 20;
export const RARE_LOWER = 20;
export const RARE_HIGHER = 40;
export const UNCOMMON_LOWER = 40;
export const UNCOMMON_HIGHER = 60;
export const COMMON_LOWER = 60;
export const COMMON_HIGHER = 80;
export const WASTE_LOWER = 80;
export const WASTE_HIGHER = 100;

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
        if (achievement.percentage <= MARVEL_HIGHER) {
          marvel++;
        } else if (
          achievement.percentage <= LEGENDARY_HIGHER &&
          achievement.percentage > LEGENDARY_LOWER
        ) {
          legendary++;
        } else if (
          achievement.percentage <= EPIC_HIGHER &&
          achievement.percentage > EPIC_LOWER
        ) {
          epic++;
        } else if (
          achievement.percentage <= RARE_HIGHER &&
          achievement.percentage > RARE_LOWER
        ) {
          rare++;
        } else if (
          achievement.percentage <= UNCOMMON_HIGHER &&
          achievement.percentage > UNCOMMON_LOWER
        ) {
          uncommon++;
        } else if (
          achievement.percentage <= COMMON_HIGHER &&
          achievement.percentage > COMMON_LOWER
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

export const calculateRarityLeftFromAchievements = (
  achievements,
  targetSettings
) => {
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
        if (achievement.percentage <= MARVEL_HIGHER) {
          marvelCompleted++;
        } else if (
          achievement.percentage <= LEGENDARY_HIGHER &&
          achievement.percentage > LEGENDARY_LOWER
        ) {
          legendaryCompleted++;
        } else if (
          achievement.percentage <= EPIC_HIGHER &&
          achievement.percentage > EPIC_LOWER
        ) {
          epicCompleted++;
        } else if (
          achievement.percentage <= RARE_HIGHER &&
          achievement.percentage > RARE_LOWER
        ) {
          rareCompleted++;
        } else if (
          achievement.percentage <= UNCOMMON_HIGHER &&
          achievement.percentage > UNCOMMON_LOWER
        ) {
          uncommonCompleted++;
        } else if (
          achievement.percentage <= COMMON_HIGHER &&
          achievement.percentage > COMMON_LOWER
        ) {
          commonCompleted++;
        } else {
          wasteCompleted++;
        }
      }
      if (achievement.percentage <= MARVEL_HIGHER) {
        marvel++;
      } else if (
        achievement.percentage <= LEGENDARY_HIGHER &&
        achievement.percentage > LEGENDARY_LOWER
      ) {
        legendary++;
      } else if (
        achievement.percentage <= EPIC_HIGHER &&
        achievement.percentage > EPIC_LOWER
      ) {
        epic++;
      } else if (
        achievement.percentage <= RARE_HIGHER &&
        achievement.percentage > RARE_LOWER
      ) {
        rare++;
      } else if (
        achievement.percentage <= UNCOMMON_HIGHER &&
        achievement.percentage > UNCOMMON_LOWER
      ) {
        uncommon++;
      } else if (
        achievement.percentage <= COMMON_HIGHER &&
        achievement.percentage > COMMON_LOWER
      ) {
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

  // WASTE - 75 - 100
  // COMMON - 50 - 75
  // UNCOMMON - 25 - 50
  // RARE - 10 - 25
  // EPIC - 5 - 10
  // LEGENDARY 1 - 5
  // MARVEL - < 1

  let percentageSettings = targetSettings
    ? targetSettings
    : {
        WASTE_TARGET: 50,
        COMMON_TARGET: 50,
        UNCOMMON_TARGET: 50,
        RARE_TARGET: 50,
        EPIC_TARGET: 50,
        LEGENDARY_TARGET: 50,
        MARVEL_TARGET: 50,
      };

  wasteTarget =
    Math.floor((waste * percentageSettings.WASTE_TARGET) / 100) -
    wasteCompleted;
  commonTarget =
    Math.floor((common * percentageSettings.COMMON_TARGET) / 100) -
    commonCompleted;
  uncommonTarget =
    Math.floor((uncommon * percentageSettings.UNCOMMON_TARGET) / 100) -
    uncommonCompleted;
  rareTarget =
    Math.floor((rare * percentageSettings.RARE_TARGET) / 100) - rareCompleted;
  epicTarget =
    Math.floor((epic * percentageSettings.EPIC_TARGET) / 100) - epicCompleted;
  legendaryTarget =
    Math.floor((legendary * percentageSettings.LEGENDARY_TARGET) / 100) -
    legendaryCompleted;
  marvelTarget =
    Math.floor((marvel * percentageSettings.MARVEL_TARGET) / 100) -
    marvelCompleted;

  wasteTarget = wasteTarget < 0 ? 0 : wasteTarget;
  commonTarget = commonTarget < 0 ? 0 : commonTarget;
  uncommonTarget = uncommonTarget < 0 ? 0 : uncommonTarget;
  rareTarget = rareTarget < 0 ? 0 : rareTarget;
  epicTarget = epicTarget < 0 ? 0 : epicTarget;
  legendaryTarget = legendaryTarget < 0 ? 0 : legendaryTarget;
  marvelTarget = marvelTarget < 0 ? 0 : marvelTarget;

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
    wasteRemaining: waste - wasteCompleted,
    commonRemaining: common - commonCompleted,
    uncommonRemaining: uncommon - uncommonCompleted,
    rareRemaining: rare - rareCompleted,
    epicRemaining: epic - epicCompleted,
    legendaryRemaining: legendary - legendaryCompleted,
    marvelRemaining: marvel - marvelCompleted,
    remainingInTarget,
  };
};

export const getRarityColorFromPercentage = (percentage) => {
  if (percentage <= MARVEL_HIGHER) {
    return MARVEL_COLOR;
  } else if (percentage <= LEGENDARY_HIGHER && percentage > LEGENDARY_LOWER) {
    return LEGENDARY_COLOR;
  } else if (percentage <= EPIC_HIGHER && percentage > EPIC_LOWER) {
    return EPIC_COLOR;
  } else if (percentage <= RARE_HIGHER && percentage > RARE_LOWER) {
    return RARE_COLOR;
  } else if (percentage <= UNCOMMON_HIGHER && percentage > UNCOMMON_LOWER) {
    return UNCOMMON_COLOR;
  } else if (percentage <= COMMON_HIGHER && percentage > COMMON_LOWER) {
    return COMMON_COLOR;
  } else {
    return WASTE_COLOR;
  }
};

export const rarityPercentageMapper = {
  MARVEL: `(${MARVEL_LOWER} - ${MARVEL_HIGHER})`,
  LEGENDARY: `(${LEGENDARY_LOWER} - ${LEGENDARY_HIGHER})`,
  EPIC: `(${EPIC_LOWER} - ${EPIC_HIGHER})`,
  RARE: `(${RARE_LOWER} - ${RARE_HIGHER})`,
  UNCOMMON: `(${UNCOMMON_LOWER} - ${UNCOMMON_HIGHER})`,
  COMMON: `(${COMMON_LOWER} - ${COMMON_HIGHER})`,
  WASTE: `(${WASTE_LOWER} - ${WASTE_HIGHER})`,
};

export const calculateXPFromPercentage = (percentage) => {
  if (percentage <= MARVEL_HIGHER) {
    return 100;
  } else if (percentage <= LEGENDARY_HIGHER && percentage > LEGENDARY_LOWER) {
    return 75;
  } else if (percentage <= EPIC_HIGHER && percentage > EPIC_LOWER) {
    return 50;
  } else if (percentage <= RARE_HIGHER && percentage > RARE_LOWER) {
    return 25;
  } else if (percentage <= UNCOMMON_HIGHER && percentage > UNCOMMON_LOWER) {
    return 15;
  } else if (percentage <= COMMON_HIGHER && percentage > COMMON_LOWER) {
    return 10;
  } else {
    return 5;
  }
};

export const getRarityTextFromPercentage = (percentage) => {
  if (percentage <= MARVEL_HIGHER) {
    return "MARVEL";
  } else if (percentage <= LEGENDARY_HIGHER && percentage > LEGENDARY_LOWER) {
    return "LEGENDARY";
  } else if (percentage <= EPIC_HIGHER && percentage > EPIC_LOWER) {
    return "EPIC";
  } else if (percentage <= RARE_HIGHER && percentage > RARE_LOWER) {
    return "RARE";
  } else if (percentage <= UNCOMMON_HIGHER && percentage > UNCOMMON_LOWER) {
    return "UNCOMMON";
  } else if (percentage <= COMMON_HIGHER && percentage > COMMON_LOWER) {
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
