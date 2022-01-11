import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TablePagination,
  TableFooter,
} from "@material-ui/core";

import IUser from "interfaces/User";

import capitalizeString from "helpers/capitalizeString";

import "./DataTable.scss";

type Data = IUser;

interface IDataTable {
  dataArr: Array<Data>;
}

const DataTable = ({ dataArr }: IDataTable) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const headers = Object.keys(dataArr[0]) as Array<keyof Data>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableCell key={`header: ${header}`}>
              {capitalizeString(header)}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {dataArr
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((data, rowIndex) => (
            <TableRow
              key={`row: ${data.id + String(rowIndex) || rowIndex}`}
              className="table__row"
            >
              {headers.map((header, cellIndex) => (
                <TableCell
                  key={`cell: ${data.id + String(cellIndex) || cellIndex}`}
                >
                  {data[header] || "-"}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          onPageChange={handlePageChange}
          count={dataArr.length}
        />
      </TableFooter>
    </Table>
  );
};

export default DataTable;
