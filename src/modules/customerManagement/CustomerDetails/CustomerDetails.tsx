import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ModuleHeader from "modules/shared/ModuleHeader";
import CustomerProfileWrapper from "modules/customerManagement/CustomerProfileWrapper";

import FormControls from "components/FormControls";
import ProgressSpinner from "components/ProgressSpinner";

import getDisplayedValue from "helpers/getDisplayedValue";
import customerHeaders from "helpers/getDisplayedValue/definedHeaders/customerHeaders";

import ICustomer from "interfaces/Customer";
import { IDeleteCustomer, IGetCustomer } from "interfaces/customer.service";

import "./CustomerDetails.scss";

interface ICustomerDetails {
  customer: ICustomer;
  isLoadingCustomer: boolean;
  getCustomer: (args: IGetCustomer) => void;
  deleteCustomer: (args: IDeleteCustomer) => void;
}

const CustomerDetails = ({
  customer,
  isLoadingCustomer,
  getCustomer,
  deleteCustomer,
}: ICustomerDetails) => {
  const { customerId } = useParams();

  const handleCustomerLoad = async () => {
    if (customerId && customerId !== customer.id) {
      getCustomer(customerId);
    }
  };

  useEffect(() => {
    handleCustomerLoad();
  }, []);

  return (
    <div className="customer__profile">
      <ModuleHeader
        title={customer?.name || "unknown customer"}
        backLink={"/customer"}
      />
      {customer ? (
        <>
          <CustomerProfileWrapper>
            {customerHeaders.map((header, index) => (
              <div
                key={`field: ${header.prop} ${index}`}
                className="customer__field"
              >
                <p className="field__prop">{header.text}</p>
                <p className="field__value">
                  {getDisplayedValue({
                    data: customer,
                    header,
                  })}
                </p>
              </div>
            ))}
          </CustomerProfileWrapper>
          <FormControls
            cancelHandler={() => deleteCustomer(customer.id)}
            cancelBtnText="delete"
            cancelBtnClass="delete"
            submitLink={`/customer/${customer.id}/edit`}
            submitBtnText="edit"
            submitBtnClass="edit"
          />
        </>
      ) : (
        <div>no data available</div>
      )}
      <ProgressSpinner isLoading={isLoadingCustomer} />
    </div>
  );
};

export default CustomerDetails;
