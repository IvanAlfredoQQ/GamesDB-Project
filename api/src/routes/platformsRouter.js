const { Router } = require("express");
const { platformsHandler } = require("../handlers/platformsHandler");


const platformsRouter = Router();

platformsRouter.get("/", platformsHandler )

module.exports = platformsRouter;