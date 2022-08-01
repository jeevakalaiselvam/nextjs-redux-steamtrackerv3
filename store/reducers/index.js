import { combineReducers } from 'redux';

import gamesReducer from './games.reducer';

const rootReducer = combineReducers({
  games: gamesReducer,
});

export default rootReducer;
