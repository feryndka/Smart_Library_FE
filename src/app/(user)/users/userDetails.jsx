"use client";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postUsers } from "../../../client/usersClient";

// Form validation using yup and react form hook
const schema = yup
  .object({
    name: yup.string().required("*Please enter name..."),
    telp: yup.string().required("*Please enter number..."),
    password: yup.string().required("*Please enter password..."),
    email: yup.string().email().required("*Please enter email..."),
    alamat: yup.string().required("*Please enter address..."),
  })
  .required();

export default function UserDetails() {
  const [type, setType] = useState("User");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    console.log("Data", data);
    const response = await postUsers(data);
    console.log("Response =>", response.data);

    // React Toastify
    toast.success("Success!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid sm:grid-cols-1 md:grid-cols-6 gap-5">
          <div>
            <TextField
              size="small"
              label="Name"
              variant="outlined"
              {...register("name")}
            />
            <p className="ml-2 text-[red] text-sm">{errors.name?.message}</p>
          </div>
          <div>
            <TextField
              size="small"
              label="No Telepon"
              variant="outlined"
              {...register("telp")}
            />
            <p className="ml-2 text-[red] text-sm">{errors.telp?.message}</p>
          </div>
          <div>
            <TextField
              size="small"
              label="Password"
              variant="outlined"
              {...register("password")}
            />
            <p className="ml-2 text-[red] text-sm">
              {errors.password?.message}
            </p>
          </div>
          <div>
            <TextField
              size="small"
              label="Email"
              variant="outlined"
              {...register("email")}
            />
            <p className="ml-2 text-[red] text-sm">{errors.email?.message}</p>
          </div>
          <div>
            <TextField
              size="small"
              label="Alamat"
              variant="outlined"
              {...register("alamat")}
            />
            <p className="ml-2 text-[red] text-sm">{errors.alamat?.message}</p>
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                size="small"
                value={type}
                label="Type"
                onChange={handleChange}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Pustakawan">Pustakawan</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="flex mt-4 justify-end">
          <Button variant="outlined" className="mb-2" type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  );
}
