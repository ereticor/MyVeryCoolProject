import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";

import ProgressSpinner from "components/ProgressSpinner";

// import ApiService from "services/api.service";
import CustomerService from "services/customer.service";

import "./TestPage.scss";

const TestPage = () => {
  const [data, setData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const handleGetAllCustomers = async () => {
    setIsLoadingData(true);
    const newData = await CustomerService.getAllCustomers();
    setData(newData);
    setIsLoadingData(false);
  };

  const handleGetPageCustomer = async () => {
    setIsLoadingData(true);
    const newData = await CustomerService.getPage({});
    setData(newData);
    setIsLoadingData(false);
  };

  const handleGetCustomer = async () => {
    setIsLoadingData(true);
    const newData = await CustomerService.getCustomer(
      "75839b68-2f9d-4613-abb7-f769edfb9dce"
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    setData(newData);
    setIsLoadingData(false);
  };

  const handleCreateCustomer = async () => {
    setIsLoadingData(true);
    const newData = await CustomerService.createCustomer("some-very-uniq-name");
    setData(newData);
    setIsLoadingData(false);
  };

  const handleChangeCustomer = async () => {
    setIsLoadingData(true);
    const newData = await CustomerService.changeCustomer(
      "75839b68-2f9d-4613-abb7-f769edfb9dce",
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        status: {
          description: "cool description",
        },
      }
    );
    setData(newData);
    setIsLoadingData(false);
  };

  const handleDeleteCustomer = async () => {
    setIsLoadingData(true);
    const newData = await CustomerService.deleteCustomer(
      "75839b68-2f9d-4613-abb7-f769edfb9dce"
    );
    setData(newData);
    setIsLoadingData(false);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setBg = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const el = document.querySelector(".test-page");
    Array.from(el!.children).forEach((child: any) => {
      if (child.type === "button") {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        child.style.backgroundColor = "#" + randomColor;
      }
    });
  };

  useEffect(() => {
    setBg();
  }, []);

  return (
    <div className="test-page">
      <Button onClick={handleGetAllCustomers} className="test-btn">
        GetAllCustomers
      </Button>
      <Button onClick={handleGetPageCustomer} className="test-btn">
        GetPagedCustomer
      </Button>
      <Button onClick={handleGetCustomer} className="test-btn">
        GetCustomer
      </Button>
      <Button onClick={handleCreateCustomer} className="test-btn">
        CreateCustomer
      </Button>
      <Button onClick={handleChangeCustomer} className="test-btn">
        ChangeCustomer
      </Button>
      <Button onClick={handleDeleteCustomer} className="test-btn">
        DeleteCustomer
      </Button>
      <ProgressSpinner isLoading={isLoadingData} />
    </div>
  );
};

export default TestPage;
