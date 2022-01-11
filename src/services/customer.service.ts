import ApiService from "./api.service";

export default class CustomerService extends ApiService {
  static async getAllCustomers() {
    super.get({ api: "customer", options: {} });
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
    super.get({ api: `customer/paged?${searchParams}`, options: {} });
  }
  static async getCustomer(customerId: number | string) {
    super.get({ api: `customer/${customerId}`, options: {} });
  }
}
