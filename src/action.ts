import { Theme } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { productApi } from "./client/productApi";

export interface IProduct {
  id: string;
  name: string;
}
const fetchUserById = createAsyncThunk<IProduct[], void>(
  "users/fetchByIdStatus",
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await productApi.getProducts(signal);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const useStyles = makeStyles<Theme>(() => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
}));
