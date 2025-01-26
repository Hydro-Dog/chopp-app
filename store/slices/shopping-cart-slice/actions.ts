import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { postShoppingCartDTO, ShoppingCart } from "./types";
import { axiosPrivate } from "@/services";
import { ErrorResponse } from "@/shared";

export const postShoppingCart = createAsyncThunk<
  ShoppingCart,
  { newShoppingCart: postShoppingCartDTO }
>("products/fetchPutProducts", async ({ newShoppingCart }, thunkAPI) => {
  try {
    const response = await axiosPrivate.post(`/shopping-cart`, newShoppingCart);
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

export const fetchShoppingCart = createAsyncThunk<ShoppingCart>(
  "products/fetchGetProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get<ShoppingCart>(`/shopping-cart`);
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

export const delShoppingCart = createAsyncThunk(
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
