const { getGenresApi } = require ("../controllers/genresControllers")

const genresHandler = async (req, res) => {
    try {
      const genres = await getGenresApi()
      res.status(200).json(genres);
    } catch (error) {
      res.status(400).send({error: error.message});
    }
  };

  module.exports={
    genresHandler
  }