import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketItem } from "./types";

export type BasketState = {
  basketItems: BasketItem[];
};

const initialState: BasketState = {
  basketItems: [],
};

export const basketItems = createSlice({
  name: "basketItems",
  initialState,
  reducers: {
    setBasketItems: (state, action: PayloadAction<number>) => {
      const key = action.payload;

      const findItem = state.basketItems.find((item) => item.key === key);

      if (findItem) {
        findItem.value += 1;   
      } else {
        state.basketItems.push({ key, value: 1 });
      }
    },
    delBasketItems: (state, action: PayloadAction<number>) => {
      const key = action.payload;

      const findItem = state.basketItems.find((item) => item.key === key);

      if (findItem) {
        if (findItem.value === 1) {
          state.basketItems = state.basketItems.filter(
            (item) => item.key !== key,
          );
        } else {
          findItem.value -= 1;
        }
      }
    },

    clearBasketItems: (state) => {
      state.basketItems = [];
    },
  },
});

export const { setBasketItems, delBasketItems, clearBasketItems } =
  basketItems.actions;
export default basketItems.reducer;
