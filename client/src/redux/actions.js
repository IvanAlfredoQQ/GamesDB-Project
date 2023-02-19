import axios from "axios";

export const GET_GAMES = "GET_GAMES",
  POST_GAME = "POST_GAME",
  IS_LOADING = "IS_LOADING",
  GET_GENRES = "GET_GENRES",
  GET_PLATFORMS = "GET_PLATFORMS",
  GET_DETAILS = "GET_DETAILS",
  ORDER_GAMES_NAME="ORDER_GAMES_NAME",
  ORDER_GAMES_RATING="ORDER_GAMES_RATING",
  FILTER_GAMES="FILTER_GAMES",
  FILTER_GENRES="FILTER_GENRES",
  RESET="RESET";

export function getGames() {
  return async function (dispatch) {
    try {
      const games = await axios.get("http://localhost:3001/videogames");
      return dispatch({ type: GET_GAMES, payload: games.data });
    } catch (error) {}
  };
}

export function getGameDetails(id) {
  return async function (dispatch) {
    try {
      const details = await axios.get(`http://localhost:3001/videogame/${id}`);
      dispatch({ type: GET_DETAILS, payload: details.data });
    } catch (error) {}
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      const genres = await axios.get("http://localhost:3001/genres");
      dispatch({ type: GET_GENRES, payload: genres.data });
    } catch (error) {}
  };
}
export function getPlatforms() {
  return async function (dispatch) {
    try {
      const platforms = await axios.get("http://localhost:3001/platforms");
      dispatch({ type: GET_PLATFORMS, payload: platforms.data });
    } catch (error) {}
  };
}

export function postGame(bodyData) {
  return async function () {
    try {
      let postGame = axios.post("http://localhost:3001/videogames", bodyData);
      alert("Game created succesfully")
      return postGame;
    } catch (error) {
      alert("Error: " + error.postGame.data.error);
    }
  };
}

export function changeLoading() {
  return{ type: IS_LOADING, payload: true }
}

export function orderGamesByName(value){
  return function(dispatch){
    dispatch({ type:ORDER_GAMES_NAME, payload:value})
  }
}
export function orderGamesByRating(value){
  return function(dispatch){
    dispatch({ type:ORDER_GAMES_RATING, payload:value})
  }
}
export function filterGames(source){
  return function(dispatch){
    dispatch({ type:FILTER_GAMES, payload: source})
  }
}
export function filterByGenres(genre){
  return function(dispatch){
    dispatch({ type:FILTER_GENRES, payload: genre})
  }
}
export function reset(){
  return function(dispatch){
    dispatch({ type: RESET })
  }
}
