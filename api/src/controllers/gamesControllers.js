require("dotenv").config();
const { MY_KEY } = process.env;
const { Videogame,Genre,Platforms } = require("../db");
const axios = require("axios");
const {getApiGames} = require("../utils/getApiData")
const {relevantData} = require("../utils/filterAllData")


//----------------------Create a game in DB----------------------

const createGame = async function (name, description, release, rating, genres, platforms, background_image) {
  //Exists?
  let gameNameExist = await Videogame.findOne( {where: { name } } );
  if (gameNameExist) {
    throw new Error("This game already exists");
  }

  //Look for genres/platforms into DB values
  let genresDb = await Genre.findAll({ where: { name: genres } });
  let platformsDb = await Platforms.findAll( {where: { name: platforms }} );

  //Game create
  let newGame = await Videogame.create({name,description,release,rating,background_image,});

  //Asign Genre / Platforms
  newGame.addGenre(genresDb);
  newGame.addPlatforms(platformsDb);

  return "Game created succesfully";
};


//----------------------Get entries with same name as parameter "name" from DB and API----------------------

const namedGame = async function (name) {
  const gamesSearched = await Videogame.findAll({ where: { name } }); //This promise return an array of all items wich property "name" is name equal as the parameter given
  const apiGamesResults = (
    await axios.get(
      `https://api.rawg.io/api/games?search=${name}&key=${MY_KEY}`
    )
  ).data.results; //This promise return an object with a property "results" that is an array of games(objects) in the API
  const apiGames = relevantData(apiGamesResults); //Define a function helper to get Data
  const results = [...gamesSearched, ...apiGames]; //Both of them are arrays, so i can use distructuring to asign all data from DB + all data from API to "results"
  return results;
};


//----------------------Get all games (Prioritize data in my DB)----------------------

const allGames = async function () {
  let apiGamesResults = [];

  const databaseGames = await Videogame.findAll({
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
  });    //This promise return an array of all items in DB


  apiGamesResults = await getApiGames(2)              //This function brings 100 filtered games from API with specified data for my APP
  //console.log(apiGamesResults.length)               //checking if this gets 100 results

  let results = [...databaseGames, ...apiGamesResults]; //Concat data...
  //console.log(results)
  results = relevantData(results)
  return results;
};

module.exports = { createGame, namedGame, allGames };
