require("dotenv").config();
const { MY_KEY } = process.env;
const { Videogame } = require("../db");
const axios = require("axios");
const {getApiGames} = require("../utils/getApiData")


//----------------------Create a game in DB----------------------

const createGame = async function (name,description,release,rating,platforms,background_image) {
  const newGame = await Videogame.create({name,description,release,rating,platforms,background_image,});

  return relevantData(newGame);
};


//----------------------Get entries with same name as parameter "name" from DB and API----------------------

const namedGame = async function (name) {
  const gamesSearched = await Videogame.findAll({ where: { name } }); //This promise return an array of all items wich property "name" is name equal as the parameter given
  const apiGamesResults = (
    await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${MY_KEY}`
    )
  ).data.results; //This promise return an object with a property "results" that is an array of games(objects) in the API
  const apiGames = relevantData(apiGamesResults); //Define a function at the beginning to filter data
  const results = [...gamesSearched, ...apiGames]; //Both of them are arrays, so i can use distructuring to asign all data from DB + all data from API to "results"
  return results;
};


//----------------------Get all games (Prioritize data in my DB)----------------------

const allGames = async function () {
  let apiGamesResults = [];

  const databaseGames = await Videogame.findAll();    //This promise return an array of all items in DB
  apiGamesResults = await getApiGames(5)              //This function brings 100 filtered games from API with specified data for my APP
  //console.log(apiGamesResults.length)               //checking if this gets 100 results

  const results = [...databaseGames, ...apiGamesResults]; //Concat data...
  //console.log(results)
  return results;
};

module.exports = { createGame, namedGame, allGames };
