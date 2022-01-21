import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton, Input } from "@material-ui/core";
import { Add, Close, Search } from "@material-ui/icons";

import ModuleHeader from "modules/shared/ModuleHeader";

import DataTable from "components/DataTable";
import ProgressSpinner from "components/ProgressSpinner";

import CustomerService from "services/customer.service";

import { truncObjectByKeys } from "helpers/object";
import customerHeaders from "helpers/getDisplayedValue/definedHeaders/customerHeaders";

import ICustomer from "interfaces/Customer";

import "./CustomerTable.scss";
import { IGetCustomerPage } from "interfaces/customer.service";

const CustomerTable = () => {
  const [customerList, setCustomerList] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [customerCount, setCustomerCount] = useState(1);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(false);
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  const navigate = useNavigate();

  const fetchCustomerList = async ({
    page,
    pageSize,
    search,
  }: IGetCustomerPage) => {
    setIsLoadingCustomers(true);
    const response = await CustomerService.getPage({ page, pageSize, search });
    if (response.status === 401) {
      return;
    }
    setPage(response.page);
    setCustomerCount(response.totalCount);
    const filteredList = response.data.map((customer: ICustomer) => {
      const propTypes = customerHeaders.map((header) => header.prop);
      return truncObjectByKeys({
        obj: customer,
        keys: propTypes,
        includeId: true,
      });
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

  const handleIsSearchOpened = () => {
    setIsSearchOpened((prev) => !prev);
  };

  useEffect(() => {
    fetchCustomerList({});
  }, []);

  useEffect(() => {
    fetchCustomerList({ page, pageSize, search });
  }, [page, pageSize, search]);

  useEffect(() => {
    if (isSearchOpened === false && search !== "") {
      setSearch("");
    }
  }, [isSearchOpened]);

  return (
    <div className="customers">
      <ModuleHeader title={isSearchOpened ? null : "customers"}>
        {isSearchOpened ? (
          <Input
            placeholder="Search by customer name"
            className="customers__search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        ) : null}
        <div className="customers__controls">
          <IconButton aria-label="plus" onClick={handleIsSearchOpened}>
            {isSearchOpened ? <Close color="error" /> : <Search />}
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
            navigate(`/customer/${customerId}`);
          }}
        />
      ) : null}
      <ProgressSpinner isLoading={isLoadingCustomers} />
    </div>
  );
};

export default CustomerTable;
