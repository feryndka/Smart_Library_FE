"use client";
import { useState } from "react";
import UsersList from "./usersList";
import UserDetails from "./userDetails";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Users() {
  const [addUser, setAddUser] = useState(false);

  return (
    <>
      {addUser ? (
        <div>
          <div className="flex justify-start">
            <ArrowBackIcon
              className="cursor-pointer mr-2"
              onClick={() => setAddUser(false)}
            />
            <h2 className="font-bold mb-4">Add User</h2>
          </div>
          <UserDetails />
        </div>
      ) : (
        <>
          <h1 className="font-bold mb-2 text-center text-[30px]">
            Anggota Perpustakaan
          </h1>
          <hr className="w-48 h-1.5 mx-auto mb-4 bg-gray-100 rounded dark:bg-gray-700" />
          <div className="flex justify-between">
            <></>
            <Button
              variant="outlined"
              onClick={() => setAddUser(true)}
              className="mb-2"
              endIcon={<AddCircleIcon />}
            >
              Add User
            </Button>
          </div>
          <UsersList />
        </>
      )}
    </>
  );
}
