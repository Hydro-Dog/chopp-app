import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Category } from "./types";
import { axiosPrivate } from "@/services";
import { ErrorResponse } from "@/shared";

export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get<Category>("/categories");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
      } else {
        return thunkAPI.rejectWithValue({
          message: "An unknown error occurred",
        });
      }
    }
  },
);
