import { combineReducers } from "redux";

import { reducer as customerState } from "store/reducers/customer";

export default () => combineReducers({ customerState });
