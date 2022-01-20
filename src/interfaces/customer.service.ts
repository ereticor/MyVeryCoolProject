import ICustomer from "interfaces/Customer";

export type IGetCustomer = ICustomer["id"];

export type ICreateCustomer = ICustomer["name"];

export type IDeleteCustomer = IGetCustomer;

export interface IChangeCustomer {
  customerId: IGetCustomer;
  newData: Partial<ICustomer>;
}

export interface IGetCustomerPage {
  page?: number;
  pageSize?: number;
  search?: string;
  includeDeleted?: boolean;
}
