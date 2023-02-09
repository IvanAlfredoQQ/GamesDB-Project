//Traer Router de express y declaracion de gamesRouter para manejar /videogames
const { Router } = require("express");
const { gameHandler } = require("../handlers/videogameHandler");
const gameRouter = Router();


gameRouter.get("/:id", gameHandler);


module.exports = gameRouter;
