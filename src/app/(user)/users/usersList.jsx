import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getUsers } from "../../../client/usersClient";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const response = await getUsers();

    if (response.data) {
      setData(response.data);
    } else {
      console.error(response.message);
    }
    setLoading(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editUsers = (row) => {
    console.log("row ", row);
  };

  const deleteUsers = (row) => {
    console.log("row ", row);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ minWidth: 70 }}>
                ID
              </TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>
                Name
              </TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>
                No Telepon
              </TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>
                Email
              </TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>
                Alamat
              </TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>
                Type
              </TableCell>
              <TableCell align="center" style={{ minWidth: 170 }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell key={index} align="center">
                      {row.id}
                    </TableCell>
                    <TableCell key={index} align="center">
                      {row.name}
                    </TableCell>
                    <TableCell key={index} align="center">
                      {row.telp}
                    </TableCell>
                    <TableCell key={index} align="center">
                      {row.email}
                    </TableCell>
                    <TableCell key={index} align="center">
                      {row.alamat}
                    </TableCell>
                    <TableCell key={index} align="center">
                      {row.type}
                    </TableCell>
                    <TableCell key={index} align="center">
                      <div className="flex justify-center">
                        <div
                          className="cursor-pointer text-green-700 mr-2"
                          onClick={() => editUsers(row)}
                        >
                          <EditIcon />
                        </div>
                        <div
                          className="cursor-pointer text-orange-700"
                          onClick={() => deleteUsers(row)}
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
