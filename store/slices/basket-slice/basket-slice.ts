import { createSlice } from "@reduxjs/toolkit";
import { Basket} from "./types";
import { FETCH_STATUS, ErrorResponse } from "@/shared";
import {
  fetchDelShoppingCart,
  fetchGetShoppingCart,
  fetchPutShoppingCart,
} from "./actions";

export type BasketState = {
  basket: Basket|undefined;
  fetchShoppingCartStatus: FETCH_STATUS;
  fetchShoppingCartError: ErrorResponse | null;
};

const initialState: BasketState = {
  basket:undefined,
  fetchShoppingCartStatus: FETCH_STATUS.IDLE,
  fetchShoppingCartError: null,
};

export const basketItems = createSlice({
  name: "basketItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPutShoppingCart.pending, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchPutShoppingCart.fulfilled, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.SUCCESS;
      })
      .addCase(fetchPutShoppingCart.rejected, (state, action) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.ERROR;
      })

      .addCase(fetchGetShoppingCart.pending, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchGetShoppingCart.fulfilled, (state, action) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.SUCCESS;
        state.basket = action.payload;
      })
      .addCase(fetchGetShoppingCart.rejected, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.ERROR;
      })

      .addCase(fetchDelShoppingCart.pending, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchDelShoppingCart.fulfilled, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.SUCCESS;
      })
      .addCase(fetchDelShoppingCart.rejected, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.ERROR;
      })
  },
});
