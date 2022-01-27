import * as types from "./actionTypes";

import CustomerService from "services/customer.service";

import { defaultAction } from "helpers/defaultAction";

import {
  IUpdateCustomer,
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

export const updateCustomer = ({ customerId, newData }: IUpdateCustomer) => {
  return defaultAction({
    apiFunction: () => CustomerService.updateCustomer({ customerId, newData }),
    types: types.updateCustomerTypes,
  });
};

export const deleteCustomer = (customerId: IDeleteCustomer) => {
  return defaultAction({
    apiFunction: () => CustomerService.deleteCustomer(customerId),
    types: types.deleteCustomerTypes,
  });
};

export const createCustomer = (newCustomer: ICreateCustomer) => {
  return defaultAction({
    apiFunction: () => CustomerService.createCustomer(newCustomer),
    types: types.createCustomerTypes,
  });
};
