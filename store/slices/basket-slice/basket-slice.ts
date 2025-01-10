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
  basket: { items: [] },
  fetchShoppingCartStatus: FETCH_STATUS.IDLE,
  fetchShoppingCartError: null,
};

export const basketItems = createSlice({
  name: "basketItems",
  initialState,
  reducers: {
    setBasketItems: (state, action) => {
      const key = action.payload;
      const findItem = state.basket.items.find(
        (item) => item.productId === key,
      );

      if (findItem) {
        findItem.quantity += 1;
      } else {
        state.basket.items.push({ productId: key, quantity: 1 });
      }
    },
    delBasketItems: (state, action) => {
      const key = action.payload;

      const findItem = state.basket.items.find(
        (item) => item.productId === key,
      );

      if (findItem) {
        if (findItem.quantity === 1) {
          state.basket.items = state.basket.items.filter(
            (item) => item.productId !== key,
          );
        } else {
          findItem.quantity -= 1;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostShoppingCart.pending, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchPostShoppingCart.fulfilled, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.SUCCESS;
      })
      .addCase(fetchPostShoppingCart.rejected, (state, action) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.ERROR;
      })

      .addCase(fetchGetShoppingCart.pending, (state) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchGetShoppingCart.fulfilled, (state, action) => {
        state.fetchShoppingCartStatus = FETCH_STATUS.SUCCESS;
        console.log(action.payload);
        //state.basket = action.payload || { items: [] };
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
      });
  },
});
export const { setBasketItems, delBasketItems } =
  basketItems.actions;
export default basketItems.reducer;
