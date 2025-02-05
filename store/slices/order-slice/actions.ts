import { Linking } from "react-native";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CreateOrderDTO } from "./types";
import { axiosPrivate } from "@/services";
import { Order, SearchResponse } from "@/shared";
import { ErrorResponse } from "@/shared/types/response-error";

export const fetchOrder = createAsyncThunk<Order, string, { rejectValue: ErrorResponse }>(
  "/fetchOrder",
  async (id, thunkAPI) => {
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
  },
);

export const fetchOrders = createAsyncThunk<SearchResponse<Order>, void, { rejectValue: ErrorResponse }>(
  "/fetchOrders",
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get<SearchResponse<Order>>("/orders");
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
export const fetchLastOrder = createAsyncThunk<Order>("/fetchLastOrder", async (_, thunkAPI) => {
  try {
    const response = await axiosPrivate.get<Order>("/orders/lastOrder");
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

export const createOrder = createAsyncThunk<Order, CreateOrderDTO>(
  "/createOrder",
  async ({ returnUrl = window.location.href, comment, address }, thunkAPI) => {
    try {
      const response = await axiosPrivate.post<Order>(`/orders`, { returnUrl, comment, address });

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
  },
);
