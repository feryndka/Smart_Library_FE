"use client";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postUsers, updateUsers } from "../../../client/usersClient";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

export default function UserDetails({ handleAddUserClose, rows }) {
  const [utype, setUType] = useState("User");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (rows) {
      setUType(rows.type);
      reset({
        id: rows.id,
        name: rows.name,
        telp: rows.telp,
        password: rows.password,
        email: rows.email,
        alamat: rows.alamat,
      });
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      Object.assign(data, { type: utype });
      console.log("Data =>", data);
      if (rows) {
        const response = await updateUsers(data);
        console.log("Response =>", response.data);
        // React Toastify
        toast.success("Data updated!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleAddUserClose();
      } else {
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
        handleAddUserClose();
      }
    } catch (err) {
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
    }
  };

  const handleChange = (event) => {
    setUType(event.target.value);
  };

  return (
    <>
      <div className="flex justify-start">
        <ArrowBackIcon
          className="cursor-pointer mr-2"
          onClick={() => handleAddUserClose()}
        />
        <h2 className="font-bold mb-4">Add User</h2>
      </div>
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
                value={utype}
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
