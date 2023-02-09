require("dotenv").config();
const { MY_KEY } = process.env;
const { Videogame } = require("../db");
const axios = require("axios");

//Function used to filter API data
const relevantData = function (array) {
  const myData = array.map((element) => {
    return {
      id: element.id,
      name: element.name,
      description: element.description,
      release: element.release,
      rating: element.rating,
      platforms: element.platforms,
      background_image: element.background_image,
      createdByUser: false, // DB values have this property set as default = true, so... API's items will have this property created and setted as false;
    };
  });
  return myData;
};

//----------------------Create a game in DB----------------------
const createGame = async function (
  name,
  description,
  release,
  rating,
  platforms,
  background_image
) {
  const newGame = await Videogame.create({
    name,
    description,
    release,
    rating,
    platforms,
    background_image,
  });
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
  let index = 1; // This will be the first page in API request to get 100 games

  const databaseGames = await Videogame.findAll(); //This promise return an array of all items in DBB

  while (index <= 5) {
    // Each page has 20 games so i will bring 5 pages to get the first 100 games in the API
    const currentPage = (
      await axios.get(
        `https://api.rawg.io/api/games?key=${MY_KEY}&page=${index}`
      )
    ).data.results;
    const currentPageFilter = relevantData(currentPage); //filter data...
    apiGamesResults = [...apiGamesResults, ...currentPageFilter];
    index++;
  }

  //console.log(apiGamesResults.length)//checking if this gets 100 results

  const results = [...databaseGames, ...apiGamesResults]; //Concat data...
  //console.log(apiGames.length) The promise gives 20 elements in the array, per page, i can switch pages in data.next (That property is an URL, so i should make another promise)
  return results;
};

module.exports = { createGame, namedGame, allGames };
