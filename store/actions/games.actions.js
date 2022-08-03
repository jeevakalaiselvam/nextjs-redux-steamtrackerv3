import { API_GET_GAMES } from "../../helpers/urlHelper";
import {
  FETCH_ALL_GAMES_REQUEST,
  FETCH_ALL_GAMES_SUCCESS,
  FETCH_ALL_GAMES_ERROR,
  GAME_FILTER_CHANGED,
  GAME_SEARCH_CHANGED,
  GAMES_FILTER_CHANGED,
  GAMES_SEARCH_CHANGED,
  SET_HIDDEN_DATA,
  GAME_DATA_REFRESH,
  SET_PHASE_ADDED_GAME,
  UPDATE_PHASE_ACHIEVEMENT,
  SET_PHASE1_ACHIEVEMENTS,
  SET_PHASE2_ACHIEVEMENTS,
  SET_PHASE3_ACHIEVEMENTS,
  SET_PHASE6_ACHIEVEMENTS,
  SET_PHASE5_ACHIEVEMENTS,
  SET_PHASE4_ACHIEVEMENTS,
} from "../types/games.types";
import axios from "axios";

export const fetchAllGames = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_ALL_GAMES_REQUEST });
    return axios.get(API_GET_GAMES).then(
      (data) => {
        dispatch({ type: FETCH_ALL_GAMES_SUCCESS, payload: data.data.data });
      },
      (error) => {
        dispatch({ type: FETCH_ALL_GAMES_ERROR, payload: error });
      }
    );
  };
};

export const setHiddenAchievementsForGame = (gameId, hiddenAchievements) => {
  return (dispatch) => {
    return dispatch({
      type: SET_HIDDEN_DATA,
      payload: { gameId, hiddenAchievements },
    });
  };
};

export const setGameDataRefresh = (gameId, gameRefreshedData) => {
  return (dispatch) => {
    return dispatch({
      type: GAME_DATA_REFRESH,
      payload: { gameId, gameRefreshedData },
    });
  };
};

export const setPhaseAddedGames = (phaseAddedGame) => {
  return (dispatch) => {
    return dispatch({
      type: SET_PHASE_ADDED_GAME,
      payload: phaseAddedGame,
    });
  };
};

export const updatePhaseForAchievement = (achievementName, phaseValue) => {
  return (dispatch) => {
    return dispatch({
      type: UPDATE_PHASE_ACHIEVEMENT,
      payload: { achievementName, phaseValue },
    });
  };
};

export const setPhase1Achievments = (achievements) => {
  return (dispatch) => {
    return dispatch({
      type: SET_PHASE1_ACHIEVEMENTS,
      payload: achievements,
    });
  };
};
export const setPhase2Achievments = (achievements) => {
  return (dispatch) => {
    return dispatch({
      type: SET_PHASE2_ACHIEVEMENTS,
      payload: achievements,
    });
  };
};
export const setPhase3Achievments = (achievements) => {
  return (dispatch) => {
    return dispatch({
      type: SET_PHASE3_ACHIEVEMENTS,
      payload: achievements,
    });
  };
};
export const setPhase4Achievments = (achievements) => {
  return (dispatch) => {
    return dispatch({
      type: SET_PHASE4_ACHIEVEMENTS,
      payload: achievements,
    });
  };
};
export const setPhase5Achievments = (achievements) => {
  return (dispatch) => {
    return dispatch({
      type: SET_PHASE5_ACHIEVEMENTS,
      payload: achievements,
    });
  };
};
export const setPhase6Achievments = (achievements) => {
  return (dispatch) => {
    return dispatch({
      type: SET_PHASE6_ACHIEVEMENTS,
      payload: achievements,
    });
  };
};

export const changeGamesPageFilterOption = (filterOption) => {
  return (dispatch) => {
    return dispatch({ type: GAMES_FILTER_CHANGED, payload: filterOption });
  };
};

export const changeGamesPageSearchTerm = (searchTerm) => {
  return (dispatch) => {
    return dispatch({ type: GAMES_SEARCH_CHANGED, payload: searchTerm });
  };
};

export const changeGamePageFilterOption = (filterOption) => {
  return (dispatch) => {
    return dispatch({ type: GAME_FILTER_CHANGED, payload: filterOption });
  };
};

export const changeGamePageSearchTerm = (searchTerm) => {
  return (dispatch) => {
    return dispatch({ type: GAME_SEARCH_CHANGED, payload: searchTerm });
  };
};
