import {
  FETCH_ALL_GAMES_ERROR,
  FETCH_ALL_GAMES_REQUEST,
  FETCH_ALL_GAMES_SUCCESS,
} from "../types/games.types";

const INITIAL_STATE = {
  games: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_GAMES_REQUEST:
      return {
        ...state,
        games: [],
      };
    case FETCH_ALL_GAMES_SUCCESS:
      return {
        ...state,
        games: payload,
      };
    case FETCH_ALL_GAMES_ERROR:
      return {
        ...state,
        games: [],
      };

    default:
      return state;
  }
};

export default reducer;
