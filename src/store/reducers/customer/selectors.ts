import { createSelector } from "reselect";

import IStoreState from "interfaces/store";

export const getCustomerState = (state: IStoreState) => {
  return state.customerState;
};

export const currentCustomer = createSelector(
  getCustomerState,
  (customerState) => customerState.currentCustomer
);

export const customers = createSelector(
  getCustomerState,
  (customerState) => customerState.customers
);

export const isLoadingCustomer = createSelector(
  getCustomerState,
  (customerState) => customerState.isLoadingCustomer
);
