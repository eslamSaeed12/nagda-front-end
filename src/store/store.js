import { createStore, applyMiddleware } from "redux";

import { root } from "./config/root-reducer";

import initialState from "./config/ini-store";

import Thunk from "redux-thunk";

import logger from "redux-logger";

const middlewares = [Thunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

export const Store = createStore(
  root,
  initialState,
  applyMiddleware(...middlewares)
);
