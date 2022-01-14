import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  TableFooter,
} from "@material-ui/core";

import capitalizeString from "helpers/capitalizeString";

import "./DataTable.scss";

interface IData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface ITableHeader {
  text: string;
  prop: string;
  type: string;
}

interface IDataTable {
  tableData: Array<IData>;
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
  const getDisplayedValue = ({
    data,
    header,
  }: {
    data: IData;
    header: ITableHeader;
  }) => {
    switch (header.type) {
      case "dateTime": {
        return new Date(data[header.prop]).toLocaleString();
      }
      case "boolean": {
        return data[header.prop] ? "yes" : "no";
      }
      default: {
        return data[header.prop] || "-";
      }
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {tableHeaders.map((header) => (
            <TableCell key={`header: ${header.prop}`}>
              {capitalizeString(`${header.text}`)}
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
