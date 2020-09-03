import { combineReducers } from "redux";
import { auth } from "../reducers/auth";
//import { initial } from "../reducers/initial"; to split server from client
export const root = combineReducers({
  auth,
}); // add your reducers here
