import { IconButton } from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";

import DataTable from "components/DataTable";
import ProgressSpinner from "components/ProgressSpinner";
import ICustomer from "interfaces/Customer";
import ModuleHeader from "modules/shared/ModuleHeader";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomerService from "services/customer.service";

import "./CustomerTable.scss";

const customerHeaders = [
  { text: "Name", prop: "name", type: "string" },
  { text: "created At", prop: "createdAt", type: "dateTime" },
  { text: "created By", prop: "createdByName", type: "string" },
  { text: "updated At", prop: "lastModifiedAt", type: "dateTime" },
  { text: "updated By", prop: "lastModifiedByName", type: "string" },
  { text: "sap code", prop: "sapCode", type: "number" },
];

const CustomerTable = () => {
  const [customerList, setCustomerList] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [customerCount, setCustomerCount] = useState(1);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);

  const fetchCustomerList = async ({
    page,
    pageSize,
  }: {
    page?: number;
    pageSize?: number;
  }) => {
    setIsLoadingCustomers(true);
    const response = await CustomerService.getPage({ page, pageSize });
    setPage(response.page);
    setCustomerCount(response.totalCount);
    const filteredList = response.data.map(
      ({
        name,
        createdAt,
        createdByName,
        lastModifiedAt,
        lastModifiedByName,
        sapCode,
      }: ICustomer) => {
        return {
          name,
          createdAt,
          createdByName,
          lastModifiedAt,
          lastModifiedByName,
          sapCode,
        };
      }
    );
    setCustomerList(filteredList);
    setIsLoadingCustomers(false);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  useEffect(() => {
    fetchCustomerList({});
  }, []);

  useEffect(() => {
    fetchCustomerList({ page, pageSize });
  }, [page, pageSize]);

  return (
    <div className="customers">
      <ModuleHeader title={"customers"}>
        <div className="customers__controls">
          <IconButton aria-label="plus" onClick={close}>
            <Search />
          </IconButton>
          <Link to="/customer/new">
            <IconButton aria-label="plus" onClick={close}>
              <Add />
            </IconButton>
          </Link>
        </div>
      </ModuleHeader>
      {customerList ? (
        <DataTable
          tableData={customerList}
          tableHeaders={customerHeaders}
          page={page}
          pageSize={pageSize}
          dataCount={customerCount}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          handleRowClick={() => {
            console.log("x");
          }}
        />
      ) : null}
      <ProgressSpinner isLoading={isLoadingCustomers} />
    </div>
  );
};

export default CustomerTable;
