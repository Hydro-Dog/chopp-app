import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BasketPOST, BasketItemPOST, Basket } from "./types";
import { axiosPrivate } from "@/services";
import { ErrorResponse } from "@/shared";

export const fetchPostShoppingCart = createAsyncThunk<
  Basket,
  { basket: Basket; item: number; append: boolean }
>("products/fetchPutProducts", async ({ basket, item, append }, thunkAPI) => {
  try {
    const updatedBasket: BasketPOST = { items: [] };
    const key = item;
    const findItem = basket.items.find((item) => item.product.id === key);

    basket.items.forEach((item) => {
      updatedBasket.items.push({
        productId: item.product.id,
        quantity: item.quantity,
      });
    });
    if (append) {
      if (findItem) {
        updatedBasket.items = updatedBasket.items.map((item) => {
          if (item.productId === key) {
            item.quantity += 1;
          }
          return item;
        });
      } else {
        updatedBasket.items = [
          ...updatedBasket.items,
          { productId: key, quantity: 1 },
        ];
      }
    } else {
      if (findItem) {
        if (findItem.quantity === 1) {
          updatedBasket.items = updatedBasket.items.filter(
            (item) => item.productId !== key,
          );
        } else {
          updatedBasket.items = updatedBasket.items.map((item) => {
            if (item.productId === key) {
              item.quantity -= 1;
            }
            return item;
          });
        }
      }
    }
    const response = await axiosPrivate.post(
      `/shopping-cart`,
      updatedBasket || basket,
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
