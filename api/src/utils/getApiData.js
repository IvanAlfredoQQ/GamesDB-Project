require("dotenv").config();
const { MY_KEY } = process.env;
const axios = require("axios");


const getApiGames = async function (pages) {
    let apiGamesResults = [];
    let index = 1; // This will be the first page in API request to get 100 games
  
    while (index <= pages) {
      // Each page has 20 games so i will bring 5 pages to get the first 100 games in the API
      const currentPage = (await axios.get(`https://api.rawg.io/api/games?key=${MY_KEY}&page=${index}`)).data.results;
      const currentPageFilter = relevantData(currentPage); //filter data...
      apiGamesResults = [...apiGamesResults, ...currentPageFilter];
      index++;
    }  
    const results = [...apiGamesResults]; //Concat data...
    return results;}

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

  module.exports = {getApiGames}