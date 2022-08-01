import { GAMES_OPTION_COMPLETION_DESC } from "../../helpers/filterHelper";
import {
  FETCH_ALL_GAMES_ERROR,
  FETCH_ALL_GAMES_REQUEST,
  FETCH_ALL_GAMES_SUCCESS,
  GAMES_FILTER_CHANGED,
} from "../types/games.types";

const INITIAL_STATE = {
  games: {},
  settings: {
    gamesPage: {
      filterOption: GAMES_OPTION_COMPLETION_DESC,
    },
  },
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

    case GAMES_FILTER_CHANGED:
      return {
        ...state,
        settings: {
          ...state.settings,
          gamesPage: {
            filterOption: payload,
          },
        },
      };

    default:
      return state;
  }
};

export default reducer;
