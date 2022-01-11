import { IconButton } from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";

import DataTable from "components/DataTable";

// import user from "constants/user";

import userList from "constants/userList";

import "./CustomerManagement.scss";

const CustomerManagement = () => {
  return (
    <div className="customers">
      <div className="customers__head">
        <h3 className="customers__title">customers</h3>
        <div className="customers__controls">
          <IconButton aria-label="plus" onClick={close}>
            <Search />
          </IconButton>
          <IconButton aria-label="plus" onClick={close}>
            <Add />
          </IconButton>
        </div>
      </div>
      <DataTable dataArr={userList} />
    </div>
  );
};

export default CustomerManagement;
