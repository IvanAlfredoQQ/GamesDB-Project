require("dotenv").config();
const { MY_KEY } = process.env;
const { Videogame } = require("../db");

const getGameById = async function (id, inBddFlag) {
  //

  if (inBddFlag) {
    const gameInBdd = await Videogame.findByPk(id); //Search in BDD by PK
    return gameInBdd;
  } else {
    const gameApiResponse = await fetch(`https://api.rawg.io/api/games/${id}?key=${MY_KEY}`); //Get request to API with specified "id"
    const gameInApi = await gameApiResponse.json(); //Transform the Response to JSON 
    return gameInApi; //This was the first request of my proyect, after being approved i start using Axios library
  }
};
module.exports = { getGameById };
