//Traer Router de express y declaracion de gamesRouter para manejar /videogames
const { Router } = require("express");
const {
  postGamesHandler,
  gamesHandler,
} = require("../handlers/videogamesHandler");
const gamesRouter = Router();

//Middleware used to validate if all information required is given by user before the attempt to create a new game (Aligned to Videogame model)
const validate = (req, res, next) => {
  const { name, description, background_image } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name" });
  if (!description) return res.status(400).json({ error: "Missing description" }); 
  if (!background_image) return res.status(400).json({ error: "Missing image" });  
  next();
};

gamesRouter.get("/", gamesHandler);
gamesRouter.post("/", validate, postGamesHandler);

module.exports = gamesRouter;
