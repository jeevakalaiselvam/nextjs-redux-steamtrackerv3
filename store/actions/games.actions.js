import { FETCH_ALL_GAMES } from '../types/games.types';

export const getAllGames = () => {
  return {
    type: FETCH_ALL_GAMES,
  };
};
