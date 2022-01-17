import { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";

import CustomerService from "services/customer.service";

import ProgressSpinner from "components/ProgressSpinner";
import ModuleHeader from "modules/shared/ModuleHeader";

import "./CustomerEdit.scss";
import ICustomer from "interfaces/Customer";
import customerHeaders from "helpers/getDisplayedValue/definedHeaders/customerHeaders";
import FormControls from "components/FormControls";
import { useParams } from "react-router-dom";
import CustomerProfileWrapper from "modules/customerManagement/CustomerProfileWrapper";
import getDisplayedValue from "helpers/getDisplayedValue";

const CustomerEdit = ({ mode }: { mode: "edit" | "new" }) => {
  const { customerId } = useParams();
  const [customerName, setCustomerName] = useState("");
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCustomerLoad = async () => {
    setIsWaitingResponse(true);
    if (customerId) {
      const currentCustomer = await CustomerService.getCustomer(customerId);
      setCustomer(currentCustomer);
    }
    setIsWaitingResponse(false);
  };

  useEffect(() => {
    if (mode === "edit") {
      handleCustomerLoad();
    }
  }, []);

  const handleCustomerCreation = async (name: string) => {
    setIsWaitingResponse(true);
    const response =
      mode === "edit" && customer
        ? await CustomerService.changeCustomer(customer.id, {
            ...customer,
            name,
          })
        : await CustomerService.createCustomer(name);
    if (response.status > 399) {
      setErrorMessage(response.errors.Name[0]);
    } else {
      setErrorMessage("");
    }
    setIsWaitingResponse(false);
  };

  return (
    <div className="customer__create">
      <ModuleHeader title={"create customer"} backLink={"/customer"} />
      <form className="customer__form">
        <CustomerProfileWrapper>
          {mode === "edit" && customer ? (
            customerHeaders.map((header) => (
              <TextField
                key={`field: ${header.prop}`}
                id={header.prop}
                required={header.isEditable}
                disabled={!header.isEditable}
                label={header.text}
                defaultValue={getDisplayedValue({
                  data: customer,
                  header,
                })}
                error={!!errorMessage}
                helperText={errorMessage ? errorMessage : ""}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            ))
          ) : (
            <TextField
              id="name"
              required
              label="customer name"
              error={!!errorMessage}
              helperText={errorMessage ? errorMessage : ""}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          )}
        </CustomerProfileWrapper>
        {mode === "edit" && customer ? (
          <FormControls
            cancelLink="/customer"
            submitValue={customerName}
            submitHandler={(value: unknown) =>
              handleCustomerCreation(value as string)
            }
            submitBtnText="save"
          />
        ) : (
          <FormControls
            cancelLink="/customer"
            submitValue={customerName}
            submitHandler={(value: unknown) =>
              handleCustomerCreation(value as string)
            }
          />
        )}
        <ProgressSpinner isLoading={isWaitingResponse} />
      </form>
    </div>
  );
};

export default CustomerEdit;
