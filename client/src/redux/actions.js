import axios from "axios";

export const GET_GAMES = "GET_GAMES",  POST_GAME = "POST_GAME", IS_LOADING="IS_LOADING", GET_GENRES="GET_GENRES", GET_PLATFORMS="GET_PLATFORMS", GET_DETAILS="GET_DETAILS"

export function getGames() {
  return async function (dispatch) {
    try {
      const games = (await axios.get("http://localhost:3001/videogames")).data;
      dispatch({ type: GET_GAMES, payload: games });
    } catch (error) {}
  };
}

export function getGameDetails(id) {
  return async function (dispatch) {
    try {
      const details = (await axios.get(`http://localhost:3001/videogame/${id}`)).data;
      dispatch({ type: GET_DETAILS, payload: details });
    } catch (error) {}
  };
}

export function getGenres() {
    return async function (dispatch) {
      try {
        const genres = (await axios.get("http://localhost:3001/genres")).data;
        dispatch({ type: GET_GENRES, payload: genres });
      } catch (error) {}
    };
  }
  export function getPlatforms() {
    return async function (dispatch) {
      try {
        const platforms = (await axios.get("http://localhost:3001/platforms")).data;
        dispatch({ type: GET_PLATFORMS, payload: platforms });
      } catch (error) {}
    };
  }

export function postGame(bodyData) {
    return async function(){
        try {
            let postGame = axios.post("http://localhost:3001/videogames",bodyData)
            alert("¡Videogame created!")
            return postGame
        } catch (error){
            alert("Error: " + error)
        }
    }
}

export function changeLoading(){
    return function(dispatch){
    dispatch({type: IS_LOADING, payload: true})}
}