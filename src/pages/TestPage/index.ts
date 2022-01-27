import { Dispatch } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ActionCreators, selectors } from "store/reducers/customer";

import TestPage from "./TestPage";

import {
  IUpdateCustomer,
  ICreateCustomer,
  IDeleteCustomer,
  IGetCustomer,
  IGetCustomerPage,
} from "interfaces/customer.service";

const selector = createStructuredSelector({
  customers: selectors.customers,
  isLoadingCustomer: selectors.isLoadingCustomer,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getPage: (args: IGetCustomerPage) => ActionCreators.getPage(args)(dispatch),
  getCustomer: (args: IGetCustomer) =>
    ActionCreators.getCustomer(args)(dispatch),
  deleteCustomer: (args: IDeleteCustomer) =>
    ActionCreators.deleteCustomer(args)(dispatch),
  updateCustomer: (args: IUpdateCustomer) =>
    ActionCreators.updateCustomer(args)(dispatch),
  createCustomer: (args: ICreateCustomer) =>
    ActionCreators.createCustomer(args)(dispatch),
  getAllCustomers: () => ActionCreators.getAllCustomers()(dispatch),
});

export default connect(selector, mapDispatchToProps)(TestPage);
