import ApiService from "./api.service";

import ICustomer from "interfaces/Customer";

export default class CustomerService extends ApiService {
  static async getAllCustomers() {
    return super.get({ api: "customer", options: {} });
  }

  static async getPage({
    page = 1,
    pageSize = 10,
    search = "",
    includeDeleted = false,
  }: {
    page?: number;
    pageSize?: number;
    search?: string;
    includeDeleted?: boolean;
  }) {
    const searchParams = super.createSearchParams({
      page,
      pageSize,
      search,
      includeDeleted,
    });
    return super.get({ api: `customer/paged?${searchParams}`, options: {} });
  }

  static async getCustomer(customerId: ICustomer["id"]) {
    return super.get({ api: `customer/${customerId}`, options: {} });
  }

  static async createCustomer(customerName: ICustomer["name"]) {
    return super.post({
      api: `customer`,
      body: { name: customerName },
      options: {},
    });
  }

  static async changeCustomer(customerId: ICustomer["id"], newData: ICustomer) {
    return super.put({
      api: `customer/${customerId}`,
      body: { ...newData },
      options: {},
    });
  }

  static async deleteCustomer(customerId: ICustomer["id"]) {
    return super.delete({
      api: `customer/${customerId}`,
      options: {},
    });
  }
}
