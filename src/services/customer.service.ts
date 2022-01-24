import ApiService from "./api.service";

import {
  IChangeCustomer,
  ICreateCustomer,
  IDeleteCustomer,
  IGetCustomer,
  IGetCustomerPage,
} from "interfaces/customer.service";

export default class CustomerService extends ApiService {
  static async getAllCustomers() {
    const data = await super.get({ api: "customer", options: {} });
    return { data: data, totalCount: data.length };
  }

  static async getPage({
    page = 1,
    pageSize = 10,
    search = "",
    includeDeleted = false,
  }: IGetCustomerPage) {
    const searchParams = super.createSearchParams({
      page,
      pageSize,
      search,
      includeDeleted,
    });
    return super.get({ api: `customer/paged?${searchParams}`, options: {} });
  }

  static async getCustomer(customerId: IGetCustomer) {
    return super.get({ api: `customer/${customerId}`, options: {} });
  }

  static async createCustomer(customerName: ICreateCustomer) {
    return super.post({
      api: `customer`,
      body: { name: customerName },
      options: {},
    });
  }

  static async changeCustomer({ customerId, newData }: IChangeCustomer) {
    return super.put({
      api: `customer/${customerId}`,
      body: { ...newData },
      options: {},
    });
  }

  static async deleteCustomer(customerId: IDeleteCustomer) {
    return super.delete({
      api: `customer/${customerId}`,
      options: {},
    });
  }
}
