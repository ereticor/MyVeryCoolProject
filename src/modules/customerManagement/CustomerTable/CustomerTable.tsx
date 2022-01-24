import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams({});

  const [customerList, setCustomerList] = useState(null);
  const [searchName, setSearch] = useState(
    searchParams.get("searchName") || ""
  );
  const [page, setPage] = useState(
    (searchParams.get("page") as unknown as number) || 1
  );
  const [pageSize, setPageSize] = useState(
    (searchParams.get("pageSize") as unknown as number) || 10
  );
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

    const response = await CustomerService.getPage({
      page,
      pageSize,
      search,
    });
    if (response.status === 401) {
      return;
    }

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

  useEffect(() => {
    if (searchName) {
      setSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        searchName,
      });
    } else {
      setSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });
    }

    fetchCustomerList({ page, pageSize, search: searchName });
  }, [page, pageSize, searchName]);

  const handleIsSearchOpened = () => {
    setIsSearchOpened((prev) => !prev);
  };

  useEffect(() => {
    if (isSearchOpened === false && searchName !== "") {
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
