const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");

const handler = async (req, res) => {
  console.clear();
  if (req.method === "GET") {
    const { gameId } = req.query;
    const hiddenAchievements = [];

    const url = `https://completionist.me/steam/app/${gameId}/achievements?display=mosaic&sort=created&order=desc`;
    const hiddenResponse = [];
    await axios.get(url).then((data) => {
      const html = data.data;
      const $ = cheerio.load(html);
      let titles = [];
      let descriptions = [];

      $("span.title").each(function (i, e) {
        titles[i] = $(this).text().trim();
      });

      $("span.description").each(function (i, e) {
        descriptions[i] = $(this).text().trim();
      });

      titles.forEach((title, i) => {
        hiddenAchievements.push({
          name: titles[i],
          description: descriptions[i],
        });
      });

      let hiddenMapper = {};
      hiddenAchievements.forEach((achievement) => {
        hiddenMapper = {
          ...hiddenMapper,
          [achievement.name.toLowerCase().trim()]: achievement.description,
        };
      });

      res.status(200).json({
        status: "success",
        hiddenMapper,
      });
    });
  }
};

export default handler;
