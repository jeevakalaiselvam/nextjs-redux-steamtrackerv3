import {
  GAMES_OPTION_COMPLETION_DESC,
  GAMES_OPTION_COMPLETION_STARTED,
  GAME_OPTION_PERCENTAGE_DESC,
  GAME_OPTION_PERCENTAGE_DESC_LOCKED,
} from "../../helpers/filterHelper";
import { addHiddenToGames } from "../../helpers/gameHelper";
import {
  FETCH_ALL_GAMES_ERROR,
  FETCH_ALL_GAMES_REQUEST,
  FETCH_ALL_GAMES_SUCCESS,
  GAMES_FILTER_CHANGED,
  GAMES_SEARCH_CHANGED,
  GAME_FILTER_CHANGED,
  GAME_SEARCH_CHANGED,
  SET_HIDDEN_DATA,
} from "../types/games.types";

const INITIAL_STATE = {
  games: [],
  settings: {
    gamesPage: {
      filterOption: GAMES_OPTION_COMPLETION_DESC,
      searchTerm: "",
      leftSidebarOpen: true,
      rightSidebarOpen: false,
      leftSidebarWidth: "200px",
      rightSidebarWidth: "450px",
    },
    gamePage: {
      filterOption: GAME_OPTION_PERCENTAGE_DESC_LOCKED,
      searchTerm: "",
      leftSidebarOpen: true,
      rightSidebarOpen: true,
      leftSidebarWidth: "200px",
      rightSidebarWidth: "450px",
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

    case GAME_FILTER_CHANGED:
      return {
        ...state,
        settings: {
          ...state.settings,
          gamePage: {
            ...state.settings.gamePage,
            filterOption: payload,
          },
        },
      };
    case GAME_SEARCH_CHANGED:
      return {
        ...state,
        settings: {
          ...state.settings,
          gamePage: {
            ...state.settings.gamePage,
            searchTerm: payload,
          },
        },
      };

    case SET_HIDDEN_DATA:
      return {
        ...state,
        games: addHiddenToGames(
          state.games,
          payload.gameId,
          payload.hiddenAchievements
        ),
      };

    default:
      return state;
  }
};

export default reducer;
