import { combineReducers } from "redux";

import gamesReducer from "./games.reducer";

const rootReducer = combineReducers({
  steamtracker: gamesReducer,
});

export default rootReducer;
