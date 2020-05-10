import { createStore } from "redux";
import reducer from "../reducers/index";

export const getStore = createStore(reducer);
