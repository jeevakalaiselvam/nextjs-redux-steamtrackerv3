import { FETCH_ALL_GAMES } from '../types/games.types';

const INITIAL_STATE = {
  count: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_GAMES:
      return {
        ...state,
        games: payload,
      };

    default:
      return state;
  }
};

export default reducer;
