import { useState } from "react";
import { TableCell, TableRow } from "@material-ui/core";

import DataTableActions, { IDataTableActions } from "./DataTableActions";

import getDisplayedValue from "helpers/getDisplayedValue";

import IAnyDataObject from "interfaces/anyDataObject";
import ITableHeader from "interfaces/tableHeader";

interface IDataTableRow {
  data: IAnyDataObject;
  headers: ITableHeader[];
  handleRowClick?: (id?: IDataTableRow["data"]["id"]) => void;
  rowActions?: IDataTableActions["actions"];
}

const DataTableRow = ({
  data,
  headers,
  handleRowClick,
  rowActions,
}: IDataTableRow) => {
  const [isRowActionsShown, setIsRowActionsShown] = useState(false);

  return (
    <TableRow
      className="table__row"
      onClick={() => (handleRowClick ? handleRowClick(data.id) : false)}
      onMouseOver={
        rowActions
          ? () => (!isRowActionsShown ? setIsRowActionsShown(true) : false)
          : undefined
      }
      onMouseLeave={rowActions ? () => setIsRowActionsShown(false) : undefined}
    >
      {headers.map((header, cellIndex) => (
        <TableCell key={`cell: ${"" + data.id + cellIndex || cellIndex}`}>
          {getDisplayedValue({ data, header })}
        </TableCell>
      ))}
      {rowActions ? (
        <DataTableActions
          actions={rowActions}
          isRowActionsShown={isRowActionsShown}
        />
      ) : null}
    </TableRow>
  );
};

export default DataTableRow;
