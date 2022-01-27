import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField } from "@material-ui/core";

import ModuleHeader from "modules/shared/ModuleHeader";
import CustomerDetailsWrapper from "modules/customerManagement/CustomerDetailsWrapper";

import FormFooter from "components/FormFooter";
import ProgressSpinner from "components/ProgressSpinner";

import getDisplayedValue from "helpers/getDisplayedValue";

import ICustomer from "interfaces/Customer";
import {
  IUpdateCustomer,
  ICreateCustomer,
  IGetCustomer,
} from "interfaces/customer.service";

import { customerHeaders } from "config/table/headers";

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
  updateCustomer: (args: IUpdateCustomer) => Promise<unknown>;
}

const CustomerEdit = ({
  mode,
  customer,
  isLoadingCustomer,
  getCustomer,
  createCustomer,
  updateCustomer,
}: ICustomerEdit) => {
  const navigate = useNavigate();

  const { customerId } = useParams();
  const [customerData, setCustomerData] = useState<Partial<ICustomer>>(
    customer || {}
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleCustomerLoad = async () => {
    if (customerId && customerId !== customer?.id) {
      getCustomer(customerId);
    }
  };

  useEffect(() => {
    handleCustomerLoad();
  }, [customerId]);

  const handleCustomerCreate = async (newData: Partial<ICustomer>) => {
    const response = await createCustomer(newData);
    const err = response as IResponseError;
    if (err.status > 399) {
      setErrorMessage(err.errors.Name[0]);
    } else {
      setErrorMessage("");
    }
  };

  const handleCustomerUpdate = async (newData: Partial<ICustomer>) => {
    const response = await updateCustomer({
      customerId: customerId || customer.id,
      newData,
    });
    const err = response as IResponseError;
    if (err.status > 399) {
      setErrorMessage(err.errors.Name[0]);
    } else {
      setErrorMessage("");
    }
  };

  const isEditMode = mode === "edit";

  const EditModeElement = (
    <>
      <CustomerDetailsWrapper>
        {customerHeaders.map((header) =>
          customerId === customer?.id ? (
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
              onChange={(e) =>
                setCustomerData((prev) => ({
                  ...prev,
                  [header.prop]: e.target.value,
                }))
              }
            />
          ) : null
        )}
      </CustomerDetailsWrapper>
      <FormFooter
        cancelHandler={() => {
          navigate("/customer");
        }}
        submitValue={customerData}
        submitHandler={(value: unknown) =>
          handleCustomerUpdate(value as Partial<ICustomer>)
        }
      />
    </>
  );

  const NewModeElement = (
    <>
      <CustomerDetailsWrapper>
        {customerHeaders.map((header) =>
          header.isEditable ? (
            <TextField
              key={`field: ${header.prop}`}
              id={header.prop}
              required={header.isEditable}
              label={header.text}
              error={!!errorMessage}
              helperText={errorMessage ? errorMessage : ""}
              onChange={(e) =>
                setCustomerData((prev) => ({
                  ...prev,
                  [header.prop]: e.target.value,
                }))
              }
            />
          ) : null
        )}
      </CustomerDetailsWrapper>
      <FormFooter
        cancelHandler={() => {
          navigate("/customer");
        }}
        submitValue={customerData}
        submitHandler={(value: unknown) =>
          handleCustomerCreate(value as Partial<ICustomer>)
        }
        submitBtnText="submit"
        submitBtnClass="submit"
      />
    </>
  );

  return (
    <div className="customer__create">
      <ModuleHeader
        title={isEditMode ? "update customer" : "create customer"}
        backLink={"/customer"}
      />
      <form className="customer__form">
        {isEditMode ? EditModeElement : NewModeElement}
        <ProgressSpinner isLoading={isLoadingCustomer} />
      </form>
    </div>
  );
};

export default CustomerEdit;
