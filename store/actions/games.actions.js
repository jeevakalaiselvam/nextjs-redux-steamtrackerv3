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
  SET_PHASE1_SEARCH,
  SET_PHASE2_SEARCH,
  SET_PHASE3_SEARCH,
  SET_PHASE4_SEARCH,
  SET_PHASE5_SEARCH,
  SET_PHASE6_SEARCH,
  RESET_KANBAN_BOARD,
} from "../types/games.types";
import axios from "axios";
import { getPhaseFiltedAchievements } from "../../helpers/achievementHelper";
import { ALL } from "../../helpers/gameHelper";

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

export const setPhase1Search = (searchTerm) => {
  return (dispatch) => {
    return dispatch({
      type: SET_PHASE1_SEARCH,
      payload: searchTerm,
    });
  };
};

export const setPhase2Search = (searchTerm) => {
  return (dispatch) => {
    return dispatch({
      type: SET_PHASE2_SEARCH,
      payload: searchTerm,
    });
  };
};

export const setPhase3Search = (searchTerm) => {
  return (dispatch) => {
    return dispatch({
      type: SET_PHASE3_SEARCH,
      payload: searchTerm,
    });
  };
};

export const setPhase4Search = (searchTerm) => {
  return (dispatch) => {
    return dispatch({
      type: SET_PHASE4_SEARCH,
      payload: searchTerm,
    });
  };
};

export const setPhase5Search = (searchTerm) => {
  return (dispatch) => {
    return dispatch({
      type: SET_PHASE5_SEARCH,
      payload: searchTerm,
    });
  };
};

export const setPhase6Search = (searchTerm) => {
  return (dispatch) => {
    return dispatch({
      type: SET_PHASE6_SEARCH,
      payload: searchTerm,
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

export const resetKanbanBoard = (gameId, game, phaseAddedGame) => {
  return (dispatch) => {
    game.achievements.forEach((achievement) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(`${gameId}_${achievement.name}_PHASE`, ALL);
      }
    });

    const achievementForPhaseAddedGame = phaseAddedGame.achievements.map(
      (achievement) => {
        const newAchievement = { ...achievement, phase: ALL };

        return newAchievement;
      }
    );

    const newPhaseAddedGame = {
      ...phaseAddedGame,
      achievements: achievementForPhaseAddedGame,
    };

    return dispatch({
      type: RESET_KANBAN_BOARD,
      payload: { newPhaseAddedGame },
    });
  };
};
