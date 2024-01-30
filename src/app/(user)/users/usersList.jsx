"use client";
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
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ToastContainer, toast } from "react-toastify";
import UserDetails from "./userDetails";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from '@mui/icons-material/Search';

export default function UsersList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const handleAddUserClose = () => {
    setAddUser(false);
  };
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getData();
  }, [addUser]);

  useEffect(() => {
    searchData(searchQuery);
  }, [searchQuery]);

  const searchData = (searchQuery) => {
    let filterData = data;
    if (searchQuery) {
      filterData = data.filter(
        (usr) =>
          usr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          usr.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          usr.alamat.toLowerCase().includes(searchQuery.toLowerCase()) ||
          usr.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setData(filterData);
    } else {
      setData(allData);
    }
  };

  const getData = async () => {
    setLoading(true);
    const response = await getUsers();

    if (response.data) {
      setData(response.data);
      setAllData(response.data);
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

  const editRecord = (row) => {
    setRows(row);
    setAddUser(true);
  };

  const addRecord = (row) => {
    setRows(null);
    setAddUser(true);
  };

  const deleteRecord = (row) => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to delete this record?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteRow(row),
        },
        {
          label: "No",
        },
      ],
    });
  };

  // It should be use deleteUsers from usersClient.js
  const deleteRow = (row) => {
    let data = JSON.stringify({
      id: row.id,
    });
    let config = {
      method: "delete",
      url: "/api/users",
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        // React Toastify
        toast.success("Data deleted!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        getData();
      })
      .catch((err) => {
        console.log("Error ", err);
        // React Toastify
        toast.error("Error!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  return (
    <>
      <ToastContainer />
      {addUser ? (
        <UserDetails handleAddUserClose={handleAddUserClose} rows={rows} />
      ) : (
        <>
          <h1 className="font-bold mb-2 text-center text-[30px]">
            Anggota Perpustakaan
          </h1>
          <hr className="w-48 h-1.5 mx-auto mb-4 bg-gray-100 rounded dark:bg-gray-700" />
          <div className="flex justify-between">
            <div className="mb-3 relative flex items-center justify-end">
              <SearchIcon className="text-gray-400 absolute mr-2" />
              <input
                type="text"
                placeholder="Search...."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-2 py-2 placeholder-gray-400 rounded-md ring-2 ring-gray-300 hover:shadow-md"
              />
            </div>
            <Button
              variant="outlined"
              onClick={() => addRecord()}
              className="mb-3 bg-white "
              endIcon={<AddCircleIcon />}
            >
              Add User
            </Button>
          </div>
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
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
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
                                onClick={() => editRecord(row)}
                              >
                                <EditIcon />
                              </div>
                              <div
                                className="cursor-pointer text-orange-700"
                                onClick={() => deleteRecord(row)}
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
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      )}
    </>
  );
}
