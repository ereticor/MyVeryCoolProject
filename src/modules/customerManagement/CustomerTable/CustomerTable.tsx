import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { Add, Close, Search } from "@material-ui/icons";

import ModuleHeader from "modules/shared/ModuleHeader";

import DataTable from "components/DataTable";
import InputSearch from "components/InputSearch";
import ProgressSpinner from "components/ProgressSpinner";

import useFilter from "hooks/useFilter";

import { IDeleteCustomer, IGetCustomerPage } from "interfaces/customer.service";
import { ICustomerState } from "interfaces/store";

import { customerHeaders } from "config/table/headers";

import "./CustomerTable.scss";

interface ICustomerTable {
  customers: ICustomerState["customers"];
  isLoadingCustomer: boolean;
  getPage: (args: IGetCustomerPage) => Promise<unknown>;
  deleteCustomer: (args: IDeleteCustomer) => Promise<unknown>;
}

const CustomerTable = ({
  customers,
  isLoadingCustomer,
  getPage,
  deleteCustomer,
}: ICustomerTable) => {
  const [filter, setFilter] = useFilter();

  const [isSearchOpened, setIsSearchOpened] = useState(false);

  const navigate = useNavigate();

  const handlePageChange = (newPage: string) => {
    setFilter({ page: newPage });
  };

  const handlePageSizeChange = (newSize: string) => {
    setFilter({ page: "1", pageSize: newSize });
  };

  const handleSearchChange = (search: string) => {
    setFilter({ search: search });
  };

  useEffect(() => {
    getPage(filter);
  }, [filter]);

  const handleIsSearchOpened = () => {
    setIsSearchOpened((prev) => !prev);
  };

  useEffect(() => {
    if (isSearchOpened === false && filter.search !== "") {
      setFilter({ search: "" });
    }
  }, [isSearchOpened]);

  const rowActions = [
    {
      type: "edit",
      handler: (customerId: number | string) => {
        navigate(`/customer/${customerId}/edit`);
      },
    },
    {
      type: "delete",
      handler: async (customerId: number | string) => {
        await deleteCustomer(customerId);
        getPage(filter);
      },
    },
  ];

  return (
    <div className="customers">
      <ModuleHeader title={isSearchOpened ? null : "customers"}>
        {isSearchOpened ? (
          <InputSearch
            placeholder="Search by customer name"
            className="customers__search"
            searchHandler={handleSearchChange}
          />
        ) : null}
        <div className="customers__controls">
          <IconButton aria-label="plus" onClick={handleIsSearchOpened}>
            {isSearchOpened ? <Close color="error" /> : <Search />}
          </IconButton>
          <Link to="/customer/new">
            <IconButton aria-label="plus" onClick={close}>
              <Add color="primary" />
            </IconButton>
          </Link>
        </div>
      </ModuleHeader>
      {customers.data ? (
        <DataTable
          tableData={customers.data}
          tableHeaders={customerHeaders}
          page={filter.page}
          pageSize={filter.pageSize}
          totalCount={customers.totalCount}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          handleRowClick={(customerId) => {
            navigate(`/customer/${customerId}`);
          }}
          rowActions={rowActions}
        />
      ) : null}
      <ProgressSpinner isLoading={isLoadingCustomer} />
    </div>
  );
};

export default CustomerTable;
