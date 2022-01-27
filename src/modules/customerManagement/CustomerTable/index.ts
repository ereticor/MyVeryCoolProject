import { Dispatch } from "redux";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { ActionCreators, selectors } from "store/reducers/customer";

import CustomerTable from "./CustomerTable";

import { IDeleteCustomer, IGetCustomerPage } from "interfaces/customer.service";

const selector = createStructuredSelector({
  customers: selectors.customers,
  isLoadingCustomer: selectors.isLoadingCustomer,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getPage: (args: IGetCustomerPage) => ActionCreators.getPage(args)(dispatch),
  deleteCustomer: (args: IDeleteCustomer) =>
    ActionCreators.deleteCustomer(args)(dispatch),
});

export default connect(selector, mapDispatchToProps)(CustomerTable);
