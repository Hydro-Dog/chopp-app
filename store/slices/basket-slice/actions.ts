import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Basket, BasketItem } from "./types";
import { axiosPrivate } from "@/services";
import { ErrorResponse } from "@/shared";

export const fetchPostShoppingCart = createAsyncThunk<void, { basket: Basket }>(
  "products/fetchPutProducts",
  async ({ basket }, thunkAPI) => {
    try {
      const response = await axiosPrivate.post(`/shopping-cart`, basket);
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

export const fetchGetShoppingCart = createAsyncThunk<Basket>(
  "products/fetchGetProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get<Basket>(`/shopping-cart`);
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

export const fetchDelShoppingCart = createAsyncThunk(
  "products/fetchDelProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.delete(`/shopping-cart/clear`);
      
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
