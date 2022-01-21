import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TextField } from "@material-ui/core";

import ModuleHeader from "modules/shared/ModuleHeader";
import CustomerProfileWrapper from "modules/customerManagement/CustomerProfileWrapper";

import FormControls from "components/FormControls";
import ProgressSpinner from "components/ProgressSpinner";

import getDisplayedValue from "helpers/getDisplayedValue";
import customerHeaders from "helpers/getDisplayedValue/definedHeaders/customerHeaders";

import ICustomer from "interfaces/Customer";
import {
  IChangeCustomer,
  ICreateCustomer,
  IGetCustomer,
} from "interfaces/customer.service";

import "./CustomerEdit.scss";

interface IResponseError {
  status: number;
  errors: {
    Name: string[];
  };
}
interface ICustomerEdit {
  mode: "edit" | "new";
  customer: ICustomer;
  isLoadingCustomer: boolean;
  getCustomer: (args: IGetCustomer) => void;
  createCustomer: (args: ICreateCustomer) => Promise<unknown>;
  changeCustomer: (args: IChangeCustomer) => Promise<unknown>;
}

const CustomerEdit = ({
  mode,
  customer,
  isLoadingCustomer,
  getCustomer,
  createCustomer,
  changeCustomer,
}: ICustomerEdit) => {
  const { customerId } = useParams();
  const [customerName, setCustomerName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (mode === "edit" && customerId && customerId !== customer.id) {
      getCustomer(customerId);
    }
  }, []);

  const handleCustomerCreation = async (name: string) => {
    const response =
      mode === "edit" && customer
        ? await changeCustomer({
            customerId: customer.id,
            newData: {
              name,
            },
          })
        : await createCustomer(name);
    const err = response as IResponseError;
    if (err.status > 399) {
      setErrorMessage(err.errors.Name[0]);
    } else {
      setErrorMessage("");
    }
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
          />
        ) : (
          <FormControls
            cancelLink="/customer"
            submitValue={customerName}
            submitHandler={(value: unknown) =>
              handleCustomerCreation(value as string)
            }
            submitBtnText="submit"
            submitBtnClass="submit"
          />
        )}
        <ProgressSpinner isLoading={isLoadingCustomer} />
      </form>
    </div>
  );
};

export default CustomerEdit;
