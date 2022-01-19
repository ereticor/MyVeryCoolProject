import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";

export default (history: History<unknown>) =>
  combineReducers({ router: connectRouter(history) });
