import { Dispatch } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ActionCreators, selectors } from "store/reducers/customer";

import CustomerEdit from "./CustomerEdit";

import {
  IChangeCustomer,
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
  changeCustomer: (args: IChangeCustomer) =>
    ActionCreators.changeCustomer(args)(dispatch),
  createCustomer: (args: ICreateCustomer) =>
    ActionCreators.createCustomer(args)(dispatch),
});

export default connect(selector, mapDispatchToProps)(CustomerEdit);
