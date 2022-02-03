import IFilter from "interfaces/Filter";

export default class Filter implements IFilter {
  page: string;
  pageSize: string;
  search: string;
  constructor({ page = "1", pageSize = "10", search = "" } = {}) {
    this.page = page;
    this.pageSize = pageSize;
    this.search = search;
  }
}
