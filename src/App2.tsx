import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "./FormInput";

interface IFormInput {
  username: string;
  password: string;
  confirm: string;
}

const App2 = () => {
  const validionSchema = useMemo(() => {
    return yup.object({
      username: yup.string().required("username is required").min(10).email(),
      password: yup
        .string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      confirm: yup
        .string()
        .oneOf(
          [yup.ref("password"), null],
          'Must match "password" field value'
        ),
    });
  }, []);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(validionSchema) });

  console.log("err", errors);

  const customHandleSubmit = (data: IFormInput) => {
    console.log("data :", data);
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            error={!!errors?.username}
            {...register("username")}
            helperText={errors?.username?.message}
            label="username"
          />

          <FormInput control={control} name="username" label="Username" />
          <TextField
            error={!!errors?.password}
            {...register("password")}
            type="password"
            label="password"
            helperText={errors?.password?.message}
          />
          <TextField
            error={!!errors?.confirm}
            {...register("confirm")}
            type="confirm password"
            label="confirm password"
            helperText={errors.confirm?.message}
          />
        </div>
      </Box>
      <button onClick={handleSubmit(customHandleSubmit)}> Send</button>
    </div>
  );
};

export default App2;
