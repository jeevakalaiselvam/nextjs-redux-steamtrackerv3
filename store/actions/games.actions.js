import { API_GET_GAMES } from "../../helpers/urlHelper";
import {
  FETCH_ALL_GAMES_REQUEST,
  FETCH_ALL_GAMES_SUCCESS,
  FETCH_ALL_GAMES_ERROR,
} from "../types/games.types";
import axios from "axios";

export const fetchAllGames = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_ALL_GAMES_REQUEST });
    return axios.get(API_GET_GAMES()).then(
      (data) =>
        dispatch({ type: FETCH_ALL_GAMES_SUCCESS, payload: data.data.data }),
      (error) => dispatch({ type: FETCH_ALL_GAMES_ERROR, payload: error })
    );
  };
};
