import { IconButton } from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";

import history from "store/history";

import DataTable from "components/DataTable";
import ProgressSpinner from "components/ProgressSpinner";
import customerHeaders from "helpers/getDisplayedValue/definedHeaders/customerHeaders";
import ICustomer from "interfaces/Customer";
import ModuleHeader from "modules/shared/ModuleHeader";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomerService from "services/customer.service";

import "./CustomerTable.scss";

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
    if (response.status === 401) {
      return;
    }
    setPage(response.page);
    setCustomerCount(response.totalCount);
    const filteredList = response.data.map((customer: ICustomer) => {
      const propTypes = customerHeaders.map((header) => header.prop);
      return Object.assign(
        {},
        ...Object.entries(customer).map(([key, value]) => {
          if (propTypes.some((prop) => prop === key)) {
            return { [key]: value };
          }
        })
      );
    });
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
          handleRowClick={(customerId) => {
            history.push(`/customer/${customerId}`);
            history.go(0);
          }}
        />
      ) : null}
      <ProgressSpinner isLoading={isLoadingCustomers} />
    </div>
  );
};

export default CustomerTable;
