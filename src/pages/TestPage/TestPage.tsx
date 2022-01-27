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
  updateCustomer,
  deleteCustomer,
  createCustomer,
  getAllCustomers,
  customers,
  isLoadingCustomer,
}: {
  getPage: any;
  getCustomer: any;
  updateCustomer: any;
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
    const newData = await getCustomer("26c38621-e8c6-4565-a2bb-83ba25372d1e");
    console.log(newData);
  };

  const handleCreateCustomer = async () => {
    const newData = await createCustomer({
      name: "some-very-uniq-name",
      sapCode: 1337,
    });
    console.log(newData);
  };

  const handleUpdateCustomer = async () => {
    const newData = await updateCustomer({
      customerId: "26c38621-e8c6-4565-a2bb-83ba25372d1e",
      newData: {
        name: "neo 300",
      },
    });
    console.log(newData);
  };

  const handleDeleteCustomer = async () => {
    const newData = await deleteCustomer(
      "26c38621-e8c6-4565-a2bb-83ba25372d1e"
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
      <Button onClick={handleUpdateCustomer} className="test-btn">
        UpdateCustomer
      </Button>
      <Button onClick={handleDeleteCustomer} className="test-btn">
        DeleteCustomer
      </Button>
      <ProgressSpinner isLoading={isLoadingCustomer} />
    </div>
  );
};

export default TestPage;
