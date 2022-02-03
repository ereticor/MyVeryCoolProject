import ICustomer from "interfaces/Customer";

export type IGetCustomer = ICustomer["id"];

export type ICreateCustomer = Partial<ICustomer>;

export type IDeleteCustomer = IGetCustomer;

export interface IUpdateCustomer {
  customerId: IGetCustomer;
  newData: Partial<ICustomer>;
}

export interface IGetCustomerPage {
  page?: number | string;
  pageSize?: number | string;
  search?: string;
  includeDeleted?: boolean;
}
