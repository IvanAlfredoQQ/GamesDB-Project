const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const gamesRouter = require("./gamesRouter");
const gameRouter = require("./gameRouter");
const genresRouter = require("./genresRouter");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", (req, res) => {
  res.status(200).send("Landing page");
});

router.use("/genres", genresRouter);
router.use("/videogame", gameRouter); // => gameRouter.js => videogameHandler.js => gameControllers.js
router.use("/videogames", gamesRouter); // => gamesRouter.js => videogamesHandler.js => gamesControllers.js


module.exports = router;
