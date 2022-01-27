import { createSlice } from "@reduxjs/toolkit";

import {
  getCustomerTypes,
  getAllCustomersTypes,
  getCustomersPageTypes,
  updateCustomerTypes,
  createCustomerTypes,
  deleteCustomerTypes,
} from "./actionTypes";

import { isAnyOfMatch } from "helpers/isAnyOfMatch";
import { truncObjectByKeys } from "helpers/object";

import ICustomer from "interfaces/Customer";

import { customerHeaders } from "config/table/headers";

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
          updateCustomerTypes.start,
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
          updateCustomerTypes.success,
          createCustomerTypes.success,
          deleteCustomerTypes.success
        ),
        (state, { data }) => {
          state.currentCustomer = data;
        }
      )
      .addMatcher(
        isAnyOfMatch(
          getAllCustomersTypes.success,
          getCustomersPageTypes.success
        ),
        (state, { data }) => {
          const filteredList = data.data.map((customer: ICustomer) => {
            const propTypes = customerHeaders.map((header) => header.prop);
            return truncObjectByKeys({
              obj: customer,
              keys: propTypes,
              includeId: true,
            });
          });
          state.customers = { ...data, data: filteredList };
        }
      )
      .addMatcher(
        isAnyOfMatch(
          getCustomerTypes.success,
          getAllCustomersTypes.success,
          getCustomersPageTypes.success,
          updateCustomerTypes.success,
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
          updateCustomerTypes.error,
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
