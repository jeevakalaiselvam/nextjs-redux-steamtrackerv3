export const getLast30DaysUTCTimes = () => {
  const last30DaysUTCStartTimes = new Array(31).fill(1).map((_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - index);
    let timeUTC = date.getTime() / 1000;
    return timeUTC;
  });
  return last30DaysUTCStartTimes;
};

export const getAchievmentCountForADay = (games, last30DaysUTCStartTimes) => {
  let allUnlockedAchievements = [];
  let achievementCounts = {};

  last30DaysUTCStartTimes.forEach((startUtcTime) => {
    achievementCounts[startUtcTime] = [];
  });

  games.forEach((game) => {
    game.achievements.forEach((achievement) => {
      if (achievement.achieved == 1) {
        allUnlockedAchievements.push(achievement);
      }
    });
  });

  allUnlockedAchievements = allUnlockedAchievements.sort(
    (ach1, ach2) => +ach1.unlocktime < +ach2.unlocktime
  );

  last30DaysUTCStartTimes.forEach((utcStartInDay, index) => {
    if (index < 30) {
      const endTime = utcStartInDay;
      const startTime = last30DaysUTCStartTimes[index + 1];
      allUnlockedAchievements.forEach((achievement, indexInner) => {
        if (
          achievement.unlocktime >= startTime &&
          achievement.unlocktime < endTime
        ) {
          achievementCounts[endTime] = [
            ...achievementCounts[endTime],
            achievement,
          ];
        }
      });
    }
  });

  return achievementCounts;
};
