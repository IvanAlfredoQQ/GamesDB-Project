import {
  GET_GAMES,
  IS_LOADING,
  GET_PLATFORMS,
  GET_GENRES,
  GET_DETAILS,
  ORDER_GAMES_NAME,
  ORDER_GAMES_RATING,
  FILTER_GAMES,
  FILTER_GENRES,
  RESET,
} from "./actions";

const initialState = {
  games: [],
  allGames: [],
  gameDetails: {},
  genres: [],
  platforms: [],
  isLoading: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        games: action.payload,
        allGames: action.payload,
        isLoading: false,
      };

    case GET_DETAILS:
      return { ...state, gameDetails: { ...action.payload }, isLoading: false };

    case GET_GENRES:
      return { ...state, genres: action.payload };

    case GET_PLATFORMS:
      return { ...state, platforms: action.payload };

    // case ORDER_GAMES_NAME:
    //   const orderNameCopy = [...state.games];
    //   const orderName = orderNameCopy.sort((a, b) => {
    //     if (a.name > b.name) {
    //       return "A-Z" === action.payload ? 1 : -1;
    //     }
    //     if (a.name < b.name) {
    //       return "Z-A" === action.payload ? 1 : -1;
    //     }
    //     return 0;
    //   });
    //   return {
    //     ...state,
    //     games: orderName,
    //   };

    case ORDER_GAMES_NAME:
      let orderName = [...state.games]
      if(action.payload === "A-Z"){
        orderName.sort((a,b)=>a.name > b.name ? 1 : -1)
      }else if(action.payload === "Z-A"){
        orderName.sort((a,b)=>a.name < b.name ? 1 : -1)
      }
      return {
        ...state,
        games: orderName
      };
      
    case ORDER_GAMES_RATING:
      let orderRating = [...state.games]
      if(action.payload === "0-5"){
        // orderRating.sort((a,b)=>a.name > b.name ? 1 : -1)    //As we are ordering with .sort() method, it converts the elements in strings, because they are floats
        orderRating.sort(function(a,b) { return parseFloat(a.rating) - parseFloat(b.rating) })
      }else if(action.payload === "5-0"){
        // orderRating.sort((a,b)=>a.name < b.name ? 1 : -1)    //the results are unexpected, sort evaluates if  x>0 || x<0 || x === 0
        orderRating.sort(function(a,b) { return parseFloat(b.rating) - parseFloat(a.rating) })
      }
      return {
        ...state,
        games: orderRating
      };

    

    // case ORDER_GAMES_RATING:
    //   const orderRatingCopy = [...state.games];
    //   const orderRating = orderRatingCopy.sort((a, b) => {
    //     if (a.rating > b.rating) {
    //       return "0-5" === action.payload ? 1 : -1;
    //     }
    //     if (a.name < b.name) {
    //       return "5-0" === action.payload ? 1 : -1;
    //     }
    //     return 0;
    //   });
    //   return {
    //     ...state,
    //     games: orderRating,
    //   };


    case FILTER_GAMES:
      const filterGamesCopy = [...state.allGames];
      let filterGames = [];
      if (action.payload === "DB") {
        filterGames = filterGamesCopy.filter((e) => e.createdByUser);
      } else if(action.payload === "API"){
        filterGames = filterGamesCopy.filter((e) => !e.createdByUser);
      }else{
        return{...state, games:state.allGames}
      }
      return {
        ...state,
        games: filterGames,
      };

    case FILTER_GENRES:
      const displayGames = state.games;
      const filteredVideogame = displayGames.filter((game)=> game.genres.includes(action.payload));
      return {
        ...state,
        games: filteredVideogame,
      };


    case IS_LOADING:
      return { ...state, isLoading: action.payload };

    case RESET:
      return { ...state, games: state.allGames, isLoading: false };

    default:
      return { ...state };
  }
}
