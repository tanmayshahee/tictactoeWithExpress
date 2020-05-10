import { combineReducers } from "redux";
import game from "./game";
import login from "./login";

export default combineReducers({
  game,
  login,
});
