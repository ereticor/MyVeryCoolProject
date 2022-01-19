import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ModuleHeader from "modules/shared/ModuleHeader";
import CustomerProfileWrapper from "modules/customerManagement/CustomerProfileWrapper";

import FormControls from "components/FormControls";
import ProgressSpinner from "components/ProgressSpinner";

import CustomerService from "services/customer.service";

import getDisplayedValue from "helpers/getDisplayedValue";
import customerHeaders from "helpers/getDisplayedValue/definedHeaders/customerHeaders";

import ICustomer from "interfaces/Customer";

import "./CustomerDetails.scss";

const CustomerDetails = () => {
  const { customerId } = useParams();
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
  const [customer, setCustomer] = useState<ICustomer | null>(null);

  const handleCustomerLoad = async () => {
    setIsLoadingCustomer(true);
    if (customerId) {
      const currentCustomer = await CustomerService.getCustomer(customerId);
      setCustomer(currentCustomer);
    }
    setIsLoadingCustomer(false);
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
            cancelHandler={() => CustomerService.deleteCustomer(customer.id)}
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
