import { createSlice } from "@reduxjs/toolkit";
import { Basket } from "./types";
import { FETCH_STATUS, ErrorResponse } from "@/shared";
import {
  fetchDelShoppingCart,
  fetchGetShoppingCart,
  fetchPostShoppingCart,
} from "./actions";

export type BasketState = {
  basket: Basket;
  fetchShoppingCartStatus: FETCH_STATUS;
  fetchShoppingCartError: ErrorResponse | null;
};

const initialState: BasketState = {
  basket: { items: [], quantity: 0, totalPrice: 0 },
  fetchShoppingCartStatus: FETCH_STATUS.IDLE,
  fetchShoppingCartError: null,
};

export const basketItems = createSlice({
  name: "basketItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostShoppingCart.pending, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchPostShoppingCart.fulfilled, (state, action) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.SUCCESS;
        state.basket = action.payload || { items: [] };
      })
      .addCase(fetchPostShoppingCart.rejected, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.ERROR;
      })

      .addCase(fetchGetShoppingCart.pending, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchGetShoppingCart.fulfilled, (state, action) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.SUCCESS;
        state.basket = action.payload || { items: [] };
      })
      .addCase(fetchGetShoppingCart.rejected, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.ERROR;
      })

      .addCase(fetchDelShoppingCart.pending, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchDelShoppingCart.fulfilled, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.SUCCESS;
        state.basket = { items: [], quantity: 0, totalPrice: 0 };
      })
      .addCase(fetchDelShoppingCart.rejected, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.ERROR;
      });
  },
});
