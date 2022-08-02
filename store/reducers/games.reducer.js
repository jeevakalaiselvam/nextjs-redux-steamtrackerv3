import {
  GAMES_OPTION_COMPLETION_DESC,
  GAMES_OPTION_COMPLETION_STARTED,
} from "../../helpers/filterHelper";
import {
  FETCH_ALL_GAMES_ERROR,
  FETCH_ALL_GAMES_REQUEST,
  FETCH_ALL_GAMES_SUCCESS,
  GAMES_FILTER_CHANGED,
  GAMES_SEARCH_CHANGED,
} from "../types/games.types";

const INITIAL_STATE = {
  games: [],
  settings: {
    gamesPage: {
      filterOption: GAMES_OPTION_COMPLETION_STARTED,
      searchTerm: "",
      leftSidebarOpen: true,
      rightSidebarOpen: false,
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
            ...state.settings.gamesPage,
            filterOption: payload,
          },
        },
      };
    case GAMES_SEARCH_CHANGED:
      return {
        ...state,
        settings: {
          ...state.settings,
          gamesPage: {
            ...state.settings.gamesPage,
            searchTerm: payload,
          },
        },
      };

    default:
      return state;
  }
};

export default reducer;
