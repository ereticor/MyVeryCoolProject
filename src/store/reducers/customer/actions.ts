import * as types from "./actionTypes";

import CustomerService from "services/customer.service";

import { defaultAction } from "helpers/defaultAction";

import {
  IChangeCustomer,
  ICreateCustomer,
  IDeleteCustomer,
  IGetCustomer,
  IGetCustomerPage,
} from "interfaces/customer.service";

export const getAllCustomers = () => {
  return defaultAction({
    apiFunction: () => CustomerService.getAllCustomers(),
    types: types.getAllCustomersTypes,
  });
};

export const getPage = ({
  page,
  pageSize,
  search,
  includeDeleted,
}: IGetCustomerPage) => {
  return defaultAction({
    apiFunction: () =>
      CustomerService.getPage({ page, pageSize, search, includeDeleted }),
    types: types.getCustomersPageTypes,
  });
};

export const getCustomer = (customerId: IGetCustomer) => {
  return defaultAction({
    apiFunction: () => CustomerService.getCustomer(customerId),
    types: types.getCustomerTypes,
  });
};

export const changeCustomer = ({ customerId, newData }: IChangeCustomer) => {
  return defaultAction({
    apiFunction: () => CustomerService.changeCustomer({ customerId, newData }),
    types: types.changeCustomerTypes,
  });
};

export const deleteCustomer = (customerId: IDeleteCustomer) => {
  return defaultAction({
    apiFunction: () => CustomerService.deleteCustomer(customerId),
    types: types.deleteCustomerTypes,
  });
};

export const createCustomer = (customerName: ICreateCustomer) => {
  return defaultAction({
    apiFunction: () => CustomerService.createCustomer(customerName),
    types: types.createCustomerTypes,
  });
};
