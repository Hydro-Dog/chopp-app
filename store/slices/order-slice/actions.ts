import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Order } from "./types";
import { axiosDefault, axiosPrivate } from "@/services";
import { ErrorResponse } from "@/shared/types/response-error";

export const fetchOrder = createAsyncThunk<
  Order,
  string,
  { rejectValue: ErrorResponse }
>("/fetchOrder", async (id, thunkAPI) => {
  try {
    const response = await axiosPrivate.get<Order>(`/orders/${id}`);
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
});

export const fetchMyOrders = createAsyncThunk<
  Order[],
  void,
  { rejectValue: ErrorResponse }
>("/fetchOrders", async (_, thunkAPI) => {
  try {
    const response = await axiosPrivate.get<Order[]>("/orders");
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
        message: "An unknown error occurred",
      });
    }
  }
});