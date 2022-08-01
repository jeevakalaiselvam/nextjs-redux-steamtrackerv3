import {
  FETCH_ALL_GAMES_ERROR,
  FETCH_ALL_GAMES_REQUEST,
  FETCH_ALL_GAMES_SUCCESS,
} from "../types/games.types";

const INITIAL_STATE = {
  games: [],
  axios: {
    fetchAllGames: {
      status: "",
      error: "",
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
        axios: {
          ...state.axios,
          fetchAllGames: { ...state.axios.fetchAllGames, status: "REQUEST" },
        },
      };
    case FETCH_ALL_GAMES_SUCCESS:
      return {
        ...state,
        games: payload,
        axios: {
          ...state.axios,
          fetchAllGames: { ...state.axios.fetchAllGames, status: "SUCCESS" },
        },
      };
    case FETCH_ALL_GAMES_ERROR:
      return {
        ...state,
        games: [],
        axios: {
          ...state.axios,
          fetchAllGames: {
            ...state.axios.fetchAllGames,
            status: "ERROR",
            error: payload,
          },
        },
      };

    default:
      return state;
  }
};

export default reducer;
