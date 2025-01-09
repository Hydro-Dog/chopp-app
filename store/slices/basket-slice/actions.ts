import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Basket, BasketItem } from "./types";
import { axiosPrivate } from "@/services";
import { ErrorResponse } from "@/shared";

export const fetchPutShoppingCart = createAsyncThunk<
  void,
  { productId: number }
>("products/fetchPutProducts", async ({ productId }, thunkAPI) => {
  try {
    const params = new URLSearchParams({
      id: String(productId),
    });
    const response = await axiosPrivate.put(`/shopping-cart/`, { params });
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

export const fetchGetShoppingCart = createAsyncThunk<
  Basket,
  { productId: number }
>("products/fetchGetProducts", async ({ productId }, thunkAPI) => {
  try {
    const response = await axiosPrivate.get<Basket>(
      `/shopping-cart/${productId}`,
    );
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

export const fetchDelShoppingCart = createAsyncThunk<
  BasketItem,
  { productId: number }
>("products/fetchDelProducts", async ({ productId }, thunkAPI) => {
  try {
    const params = new URLSearchParams({
      id: String(productId),
    });

    const response = await axiosPrivate.delete(`/shopping-cart/`, { params });
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
