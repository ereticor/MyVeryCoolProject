import FormControls from "components/FormControls";
import ProgressSpinner from "components/ProgressSpinner";
import customerHeaders from "helpers/getDisplayedValue/definedHeaders/customerHeaders";
import ICustomer from "interfaces/Customer";
import ModuleHeader from "modules/shared/ModuleHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerService from "services/customer.service";

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
          <div className="customer__details">
            {customerHeaders.map((header, index) => (
              <div key={`field: ${header.prop} ${index}`}>
                <p>{header.text}</p>
                <p>{customer[header.prop]}</p>
              </div>
            ))}
          </div>
          <FormControls
            cancelLink="/customer"
            submitLink={`/customer/${customer.id}/edit`}
            submitBtnText="delete"
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
