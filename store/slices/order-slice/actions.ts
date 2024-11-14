import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Order } from "./types";
import { axiosDefault, axiosPrivate } from "@/services";
import { ErrorResponse } from "@/shared";

export const fetchOrder = createAsyncThunk<
  Order,
  void,
  { rejectValue: ErrorResponse }
>("/fetchOrder", async (_, thunkAPI) => {
  try {
    const response = await axiosPrivate.get<Order>("/order");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({
        errorMessage: "An unknown error occurred",
      });
    }
  }
});

export const createOrder = createAsyncThunk<
  Order,
  Omit<Order, "id">,
  { rejectValue: ErrorResponse }
>("/createOrder", async (data, thunkAPI) => {
  try {
    const response = await axiosDefault.post<Order>(`/order`, data);
    return response.data;
  } catch (error) {
    console.log("axios error: ", error);
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({
        errorMessage: "An unknown error occurred",
      });
    }
  }
});
