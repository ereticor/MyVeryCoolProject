/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@material-ui/core";
import { useEffect } from "react";

import ProgressSpinner from "components/ProgressSpinner";

// import ApiService from "services/api.service";
// import CustomerService from "services/customer.service";

import "./TestPage.scss";

const TestPage = ({
  getPage,
  getCustomer,
  changeCustomer,
  deleteCustomer,
  createCustomer,
  getAllCustomers,
  customers,
  isLoadingCustomer,
}: {
  getPage: any;
  getCustomer: any;
  changeCustomer: any;
  deleteCustomer: any;
  createCustomer: any;
  getAllCustomers: any;
  customers: any;
  isLoadingCustomer: boolean;
}) => {
  // const [data, setData] = useState(null);
  // const [isLoadingData, setIsLoadingData] = useState(false);

  const handleGetAllCustomers = async () => {
    const newData = await getAllCustomers();
    console.log(newData);
  };

  const handleGetPageCustomer = async () => {
    const newData = await getPage({});
    console.log(newData);
  };

  const handleGetCustomer = async () => {
    const newData = await getCustomer("75839b68-2f9d-4613-abb7-f769edfb9dce");
    console.log(newData);
  };

  const handleCreateCustomer = async () => {
    const newData = await createCustomer("some-very-uniq-name");
    console.log(newData);
  };

  const handleChangeCustomer = async () => {
    const newData = await changeCustomer({
      customerId: "75839b68-2f9d-4613-abb7-f769edfb9dce",
      newData: {
        name: "neo 300",
      },
    });
    console.log(newData);
  };

  const handleDeleteCustomer = async () => {
    const newData = await deleteCustomer(
      "75839b68-2f9d-4613-abb7-f769edfb9dce"
    );
    console.log(newData);
  };

  const setBg = () => {
    const el = document.querySelector(".test-page");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Array.from(el!.children).forEach((child: any) => {
      if (child.type === "button") {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        child.style.backgroundColor = "#" + randomColor;
      }
    });
  };

  useEffect(() => {
    setBg();
    console.log(customers);
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
      <ProgressSpinner isLoading={isLoadingCustomer} />
    </div>
  );
};

export default TestPage;
