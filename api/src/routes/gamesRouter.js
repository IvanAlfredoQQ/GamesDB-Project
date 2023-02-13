//Traer Router de express y declaracion de gamesRouter para manejar /videogames
const { Router } = require("express");
const { postGamesHandler, gamesHandler} = require("../handlers/videogamesHandler");
const gamesRouter = Router();

//Middleware used to validate if all information required is given by user before the attempt to create a new game (Aligned to Videogame model)
const validate = (req, res, next) => {
  const { name, description, release, rating, platforms, genres, background_image } = req.body;
  if (!name) return res.status(400).json({ error: "Name is needed" });
  if (!release) return res.status(400).json({ error: "Release is needed" });
  if (!rating) return res.status(400).json({ error: "Rating is needed" });
  if (platforms.length !== 0) return res.status(400).json({ error: "Platforms are needed" }); //added
  if (genres.length !== 0) return res.status(400).json({ error: "Genres are needed" });       //added
  if (!description) return res.status(400).json({ error: "Description is needed" }); 
  if (!background_image) return res.status(400).json({ error: "Image is needed" });  
  next();
};

gamesRouter.get("/", gamesHandler);
gamesRouter.post("/", validate, postGamesHandler);

module.exports = gamesRouter;
