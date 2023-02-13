import { GET_GAMES, IS_LOADING, GET_PLATFORMS, GET_GENRES, GET_DETAILS } from "./actions";

const initialState = {
  games: [],
  gameDetails: {},
  genres: [],
  platforms: [],
  isLoading: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GAMES:
      return { ...state, games: action.payload, isLoading:false };

    case GET_DETAILS:
      return { ...state, gameDetails: {...action.payload}, isLoading:false};

    case GET_GENRES:
      return { ...state, genres: action.payload };

    case GET_PLATFORMS:
      return { ...state, platforms: action.payload };

    case IS_LOADING:
      return { ...state, isLoading: action.payload };
      
    default:
      return { ...state };
  }
}
