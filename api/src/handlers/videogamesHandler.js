const { createGame, namedGame, allGames } = require("../controllers/gamesControllers");

const gamesHandler = async (req, res) => {
  let { name } = req.query;
  if(name){
    try {
      const getNamedGames = await namedGame(name);
      res.status(200).json(getNamedGames);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }
  else{
    const getAllGames = await allGames()
    res.status(200).json(getAllGames);
  }
};

const postGamesHandler = async (req, res) => {
  const { name, description, release, rating, platforms, background_image } = req.body;
  try {
    const newGame = await createGame(name, description, release, rating, platforms, background_image)
    res.status(201).json(newGame)
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};

module.exports = {
  postGamesHandler,
  gamesHandler,
};
