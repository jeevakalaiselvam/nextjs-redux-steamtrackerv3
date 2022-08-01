import { combineReducers } from "redux";

import gamesReducer from "./games.reducer";

const rootReducer = combineReducers({
  gamesPage: gamesReducer,
});

export default rootReducer;
