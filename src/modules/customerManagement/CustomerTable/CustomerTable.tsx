import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IconButton, Input } from "@material-ui/core";
import { Add, Close, Search } from "@material-ui/icons";

import ModuleHeader from "modules/shared/ModuleHeader";

import DataTable from "components/DataTable";
import ProgressSpinner from "components/ProgressSpinner";

import useDebounce from "hooks/useDebounce";

import customerHeaders from "helpers/getDisplayedValue/definedHeaders/customerHeaders";

import { IGetCustomerPage } from "interfaces/customer.service";
import { ICustomerState } from "interfaces/store";

import "./CustomerTable.scss";

interface ICustomerTable {
  customers: ICustomerState["customers"];
  isLoadingCustomer: boolean;
  getPage: (args: IGetCustomerPage) => Promise<unknown>;
}
// deleteCustomer: (args: IDeleteCustomer) => Promise<unknown>;

const CustomerTable = ({
  customers,
  isLoadingCustomer,
  getPage,
}: ICustomerTable) => {
  // deleteCustomer,
  const [searchParams, setSearchParams] = useSearchParams({});

  const [searchName, setSearch] = useState(
    searchParams.get("searchName") || ""
  );
  const debouncedSearchName = useDebounce(searchName, 700);

  const [page, setPage] = useState(
    (searchParams.get("page") as unknown as number) || 1
  );
  const [pageSize, setPageSize] = useState(
    (searchParams.get("pageSize") as unknown as number) || 10
  );
  const [isSearchOpened, setIsSearchOpened] = useState(false);

  const navigate = useNavigate();

  const fetchCustomerList = async ({
    page,
    pageSize,
    search,
  }: IGetCustomerPage) => {
    getPage({
      page,
      pageSize,
      search,
    });
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
  }, [page, pageSize, debouncedSearchName]);

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
      {customers.data ? (
        <DataTable
          tableData={customers.data}
          tableHeaders={customerHeaders}
          page={page}
          pageSize={pageSize}
          dataCount={customers.totalCount}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          handleRowClick={(customerId) => {
            navigate(`/customer/${customerId}`);
          }}
        />
      ) : null}
      <ProgressSpinner isLoading={isLoadingCustomer} />
    </div>
  );
};

export default CustomerTable;
