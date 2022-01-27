import { Dispatch } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ActionCreators, selectors } from "store/reducers/customer";

import CustomerDetails from "./CustomerDetails";

import { IDeleteCustomer, IGetCustomer } from "interfaces/customer.service";

const selector = createStructuredSelector({
  customer: selectors.currentCustomer,
  isLoadingCustomer: selectors.isLoadingCustomer,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getCustomer: (args: IGetCustomer) =>
    ActionCreators.getCustomer(args)(dispatch),
  deleteCustomer: (args: IDeleteCustomer) =>
    ActionCreators.deleteCustomer(args)(dispatch),
});

export default connect(selector, mapDispatchToProps)(CustomerDetails);
