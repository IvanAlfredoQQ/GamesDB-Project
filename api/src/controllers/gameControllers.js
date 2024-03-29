require("dotenv").config();
const { MY_KEY } = process.env;
const { Videogame, Genre, Platforms } = require("../db");

const getGameById = async function (id, inBddFlag) {
  if (inBddFlag) {
    const gameInDb = await Videogame.findByPk(id, {
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: { attributes: [] },
        },
        {
          model: Platforms,
          attributes: ["name"],
          through: { attributes: [] },
        },
      ],
    }); //Search in BDD by PK

    return gameInDb;
  } else {
    const gameApiResponse = await fetch(
      `https://api.rawg.io/api/games/${id}?key=${MY_KEY}`
    ); //Get request to API with specified "id"
    const gameInApi = await gameApiResponse.json(); //Transform the Response to JSON
    return gameInApi; //This was the first request of my proyect, after being approved i start using Axios library
  }
};
module.exports = { getGameById };
