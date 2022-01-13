import { useState } from "react";
import { TextField, Button } from "@material-ui/core";

import customerDefaultAvatar from "assets/icons/customerDefault.svg";

import { Link } from "react-router-dom";

import CustomerService from "services/customer.service";

import "./CustomerCreate.scss";
import ProgressSpinner from "components/ProgressSpinner";
import ModuleHeader from "modules/shared/ModuleHeader";

const CustomerCreate = () => {
  const [customerName, setCustomerName] = useState("");
  const [isWaitingResponse, setIsWaitingResponse] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCustomerCreation = async (name: string) => {
    setIsWaitingResponse(true);
    const response = await CustomerService.createCustomer(name);
    if (response.status > 399) {
      setErrorMessage(response);
    } else {
      setErrorMessage("");
    }
    setIsWaitingResponse(false);
  };

  return (
    <div className="customer__create">
      <ModuleHeader title={"create customer"} backLink={"/customer"} />
      <form className="customer__form">
        <div className="form__inputs">
          <img src={customerDefaultAvatar} alt="default avatar" />
          <TextField
            id="228322"
            required
            label="customer name"
            error={!!errorMessage}
            helperText={errorMessage ? "some error" : ""}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div className="form__controls">
          <Button>
            <Link to="/customer">cancel</Link>
          </Button>
          <Button onClick={() => handleCustomerCreation(customerName)}>
            save
          </Button>
        </div>
        <ProgressSpinner isLoading={isWaitingResponse} />
      </form>
    </div>
  );
};

export default CustomerCreate;
