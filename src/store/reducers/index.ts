import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";

import { reducer as customerState } from "store/reducers/customer";

export default (history: History<unknown>) =>
  combineReducers({ router: connectRouter(history), customerState });
