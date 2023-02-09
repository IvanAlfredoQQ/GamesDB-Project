const { getGameById } = require("../controllers/gameControllers")

const gameHandler = async (req, res) => {
    const {id} = req.params;
    let inBddFlag = false;

    //Reconocer si el juego es de la API o de la BDD
    if(isNaN(id)){ //isNan retorna true cuando el parametro que se pasa no es un número, sino devuelve false => {BDD: id: UUIDv4 => fe89-nm84-f5a7....} {API id: 12454}
      inBddFlag = true; 
    }
    try {
      const getGame = await getGameById(id, inBddFlag) //Si el flag es true, es un juego en la bdd, sinó tendría que pedirlo a la API
      res.status(200).json(getGame);
    } catch (error) {
      res.status(400).send({error: error.message});
    }
  };

  module.exports={
    gameHandler
  }