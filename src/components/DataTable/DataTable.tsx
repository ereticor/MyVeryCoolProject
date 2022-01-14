import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  TableFooter,
} from "@material-ui/core";

import getDisplayedValue from "helpers/getDisplayedValue";

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
  handleRowClick?: () => void;
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
}: IDataTable) => {
  return (
    <Table>
      <TableHead className="table__head">
        <TableRow>
          {tableHeaders.map((header) => (
            <TableCell key={`header: ${header.prop}`} className="head__cell">
              {header.text}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((data, rowIndex) => (
          <TableRow
            key={`row: ${"" + data.id + rowIndex || rowIndex}`}
            className="table__row"
            onClick={handleRowClick}
          >
            {tableHeaders.map((header, cellIndex) => (
              <TableCell key={`cell: ${"" + data.id + cellIndex || cellIndex}`}>
                {getDisplayedValue({ data, header })}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          rowsPerPage={pageSize}
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
