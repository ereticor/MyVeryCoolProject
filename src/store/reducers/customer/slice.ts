import { createSlice } from "@reduxjs/toolkit";

import {
  getCustomerTypes,
  getAllCustomersTypes,
  getCustomersPageTypes,
  changeCustomerTypes,
  createCustomerTypes,
  deleteCustomerTypes,
} from "./actionTypes";

import { isAnyOfMatch } from "helpers/isAnyOfMatch";

const CustomerSlice = createSlice({
  name: "customerState",
  initialState: {
    currentCustomer: {},
    customers: [],
    isLoadingCustomer: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOfMatch(
          getCustomerTypes.start,
          getAllCustomersTypes.start,
          getCustomersPageTypes.start,
          changeCustomerTypes.start,
          createCustomerTypes.start,
          deleteCustomerTypes.start
        ),
        (state) => {
          state.isLoadingCustomer = true;
        }
      )
      .addMatcher(
        isAnyOfMatch(
          getCustomerTypes.success,
          changeCustomerTypes.success,
          createCustomerTypes.success,
          deleteCustomerTypes.success
        ),
        (state, { data }) => {
          state.currentCustomer = data;
        }
      )
      .addMatcher(
        isAnyOfMatch(
          getCustomerTypes.success,
          getAllCustomersTypes.success,
          getCustomersPageTypes.success,
          changeCustomerTypes.success,
          createCustomerTypes.success,
          deleteCustomerTypes.success
        ),
        (state) => {
          state.isLoadingCustomer = false;
        }
      )
      .addMatcher(
        isAnyOfMatch(
          getCustomerTypes.error,
          getAllCustomersTypes.error,
          getCustomersPageTypes.error,
          changeCustomerTypes.error,
          createCustomerTypes.error,
          deleteCustomerTypes.error
        ),
        (state) => {
          state.isLoadingCustomer = false;
        }
      );
  },
});

export default CustomerSlice.reducer;
