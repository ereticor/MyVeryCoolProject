import { configureStore } from "@reduxjs/toolkit";
import { routerMiddleware } from "connected-react-router";
import { createMiddleware } from "redux-api-middleware";
import createSagaMiddleware from "redux-saga";

import rootReducer from "reducers";
// import rootSaga from "sagas";
import history from "./history";

const preloadedState = {};

const sagaMiddleware = createSagaMiddleware();
const apiMiddleware = createMiddleware();
const middleware = [routerMiddleware(history), apiMiddleware, sagaMiddleware];

const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
  reducer: rootReducer(history),
  middleware,
});

// sagaMiddleware.run(rootSaga);

export default store;
