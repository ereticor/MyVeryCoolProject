import { RouterState } from "connected-react-router";

import ICustomer from "interfaces/Customer";

export interface ICustomerState {
  currentCustomer: ICustomer;
  customers: ICustomer[];
  isLoadingCustomer: boolean;
}

export default interface IStoreState {
  router: RouterState<unknown>;
  customerState: ICustomerState;
}
