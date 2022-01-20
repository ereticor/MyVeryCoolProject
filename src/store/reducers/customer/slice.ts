import { createSlice } from "@reduxjs/toolkit";

import * as types from "./actionTypes";

const CustomerSlice = createSlice({
  name: "customerState",
  initialState: {
    currentCustomer: null,
    customers: [],
    isLoadingCustomer: false,
  },
  reducers: {},
  extraReducers: {
    [types.getCustomerTypes.startType]: (state) => {
      state.isLoadingCustomer = true;
    },
    [types.getCustomerTypes.successType]: (state, action) => {
      state.customers = action.payload.data;
      // state.currentCustomer = state.customers[0];
      state.isLoadingCustomer = false;
    },
    [types.getCustomerTypes.errorType]: (state) => {
      state.isLoadingCustomer = false;
    },
  },
});

export default CustomerSlice.reducer;
