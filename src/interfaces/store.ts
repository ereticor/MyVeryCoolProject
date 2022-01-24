import ICustomer from "interfaces/Customer";

export interface ICustomerState {
  currentCustomer: ICustomer;
  customers: {
    data: ICustomer[];
    totalCount: number;
    [key: string]: unknown;
  };
  isLoadingCustomer: boolean;
}

export default interface IStoreState {
  customerState: ICustomerState;
}
