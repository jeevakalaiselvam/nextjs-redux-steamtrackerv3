import axios from "axios";
import {
  FETCH_ALL_ACHIEVEMENTS_PLAYER,
  FETCH_ALL_GAMES,
} from "../../../helpers/urlHelper";

const handler = async (req, res) => {
  console.clear();
  if (req.method === "GET") {
    axios
      .get(FETCH_ALL_GAMES)
      .then((response) => {
        const games = response.data.response.games;

        Promise.all(
          games.map(async (game) => {
            try {
              const playerResponse = await axios.get(
                FETCH_ALL_ACHIEVEMENTS_PLAYER(game.appid)
              );
              const playerAchievements = playerResponse.data;

              const total = playerAchievements.playerstats.achievements.length;
              const completed =
                playerAchievements.playerstats.achievements.reduce(
                  (acc, achievement) => {
                    return acc + (achievement.achieved == 1 ? 1 : 0);
                  },
                  0
                );
              const remaining = total - completed;

              const newGame = {
                ...game,
                gameName: playerAchievements.playerstats.gameName,
                playerAchievements: playerAchievements.playerstats.achievements,
                completed,
                total,
                remaining,
              };
              return newGame;
            } catch (error) {
              const newGame = {
                ...game,
                gameName: "",
                playerAchievements: [],
                completed: 0,
                total: 0,
                remaining: 0,
              };
              return newGame;
            }
          })
        ).then((data) => {
          res.status(200).json({
            status: "success",
            data: data,
          });
        });
      })
      .catch((error) => {
        console.error(error.message);
        res.status(500).json({
          status: "error",
        });
      });
  }
};

export default handler;
