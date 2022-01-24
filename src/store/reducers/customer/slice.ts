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
import customerHeaders from "helpers/getDisplayedValue/definedHeaders/customerHeaders";
import { truncObjectByKeys } from "helpers/object";

import ICustomer from "interfaces/Customer";

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
