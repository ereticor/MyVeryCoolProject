import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ModuleHeader from "modules/shared/ModuleHeader";
import CustomerDetailsWrapper from "modules/customerManagement/CustomerDetailsWrapper";

import FormFooter from "components/FormFooter";
import ProgressSpinner from "components/ProgressSpinner";

import getDisplayedValue from "helpers/getDisplayedValue";

import ICustomer from "interfaces/Customer";
import { IDeleteCustomer, IGetCustomer } from "interfaces/customer.service";

import { customerHeaders } from "config/table/headers";

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
  const navigate = useNavigate();

  const { customerId } = useParams();

  const handleCustomerLoad = async () => {
    if (customerId && customerId !== customer?.id) {
      getCustomer(customerId);
    }
  };

  useEffect(() => {
    handleCustomerLoad();
  }, [customerId]);

  const CustomerDetailsElement = (
    <>
      <CustomerDetailsWrapper>
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
      </CustomerDetailsWrapper>
      <FormFooter
        cancelHandler={() => deleteCustomer(customer.id)}
        cancelBtnText="delete"
        cancelBtnClass="delete"
        submitHandler={() => {
          navigate(`/customer/${customer.id}/edit`);
        }}
        submitBtnText="edit"
        submitBtnClass="edit"
      />
    </>
  );

  return (
    <div className="customer__profile">
      <ModuleHeader
        title={customer?.name || "unknown customer"}
        backLink={"/customer"}
      />
      {customer ? CustomerDetailsElement : <div>no data available</div>}
      <ProgressSpinner isLoading={isLoadingCustomer} />
    </div>
  );
};

export default CustomerDetails;
