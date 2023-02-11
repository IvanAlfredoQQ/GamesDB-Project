require("dotenv").config();
const axios = require("axios");
const { MY_KEY } = process.env;
const { Genre } = require("../db");

const getGenresApi = async function () {
  let results = [];
  const genresInDb = await Genre.findAll(); //get all games in Genre DB

  if (genresInDb.length !== 0) {
    //if it has data
    console.log("Genres data were loaded from DB")
    return (results = [...genresInDb]); //return data
  } else {//else get genres from API
    const genresApiResponse = (
      await axios(`https://api.rawg.io/api/genres?key=${MY_KEY}`)
    ).data.results; //save API data in
    const apiGenres = genresApiResponse.map((genre) => {
      return {
        id: genre.id,
        name: genre.name,
      };
    });
    await Genre.bulkCreate(apiGenres);
    results = await Genre.findAll();
    console.log("Genres data were loaded from API")
    return results;
  }
};

module.exports = { getGenresApi };
