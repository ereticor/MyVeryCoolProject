import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  TableFooter,
} from "@material-ui/core";

import DataTableRow from "./DataTableRow";

import IAnyDataObject from "interfaces/anyDataObject";
import ITableHeader from "interfaces/tableHeader";

import "./DataTable.scss";

interface IDataTable {
  tableData: Array<IAnyDataObject>;
  tableHeaders: Array<ITableHeader>;
  page: number;
  pageSize: number;
  dataCount: number;
  handlePageChange: (newPage: number) => void;
  handlePageSizeChange: (newSize: number) => void;
  handleRowClick?: (id: number | string) => void;
  tableRowActions?: {
    type: string;
    handler: Exclude<IDataTable["handleRowClick"], undefined>;
  }[];
}

const DataTable = ({
  tableData,
  tableHeaders,
  page,
  pageSize,
  dataCount,
  handlePageChange,
  handlePageSizeChange,
  handleRowClick,
  tableRowActions,
}: IDataTable) => {
  return (
    <Table className="table">
      <div className="table__overflow">
        <TableHead className="table__head">
          <TableRow>
            {tableHeaders.map((header) => (
              <TableCell key={`header: ${header.prop}`} className="head__cell">
                {header.text}
              </TableCell>
            ))}
            {tableRowActions
              ? tableRowActions.map((action, index) => {
                  return (
                    <th
                      data-action={action.type}
                      key={`header action: ${index}`}
                      className="MuiTableCell-root MuiTableCell-head head__cell"
                    >
                      {null}
                    </th>
                  );
                })
              : null}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((data, rowIndex) => (
            <DataTableRow
              key={`row: ${"" + data.id + rowIndex || rowIndex}`}
              data={data}
              headers={tableHeaders}
              handleRowClick={() =>
                handleRowClick ? handleRowClick(data.id) : false
              }
              rowActions={
                tableRowActions
                  ? tableRowActions.map((rowAction) => ({
                      type: rowAction.type,
                      handler: () => rowAction.handler(data.id),
                    }))
                  : undefined
              }
            />
          ))}
        </TableBody>
      </div>
      <TableFooter>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          rowsPerPage={+pageSize}
          onRowsPerPageChange={(e) => handlePageSizeChange(+e.target.value)}
          page={page - 1}
          onPageChange={(e, newPage) => handlePageChange(newPage + 1)}
          count={dataCount}
        />
      </TableFooter>
    </Table>
  );
};

export default DataTable;
