"use client";
import React from "react";
import Layout from "../components/layout";
import Typography from "@mui/material/Typography";
import UsersList from "./usersList"

export default function Users() {
  return (
    <>
      <Layout>
        <>
          <h2 className="font-bold mb-4">Users</h2>
          <UsersList />
        </>
      </Layout>
    </>
  );
}
