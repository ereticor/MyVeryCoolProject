import { Dispatch } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ActionCreators, selectors } from "store/reducers/customer";

import CustomerEdit from "./CustomerEdit";

import {
  IUpdateCustomer,
  ICreateCustomer,
  IGetCustomer,
} from "interfaces/customer.service";

const selector = createStructuredSelector({
  customer: selectors.currentCustomer,
  isLoadingCustomer: selectors.isLoadingCustomer,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCustomer: (args: IGetCustomer) =>
    ActionCreators.getCustomer(args)(dispatch),
  updateCustomer: (args: IUpdateCustomer) =>
    ActionCreators.updateCustomer(args)(dispatch),
  createCustomer: (args: ICreateCustomer) =>
    ActionCreators.createCustomer(args)(dispatch),
});

export default connect(selector, mapDispatchToProps)(CustomerEdit);
