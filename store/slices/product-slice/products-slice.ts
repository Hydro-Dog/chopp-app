import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./actions";
import { Product } from "./types";
import { FETCH_STATUS, ErrorResponse, SearchResponse } from "@/shared";

export type ProductsState = {
  products?: SearchResponse<Product>;
  fetchProductsStatus: FETCH_STATUS;
  fetchProductsError: ErrorResponse | null;
};

const initialState: ProductsState = {
  products: undefined,
  fetchProductsStatus: FETCH_STATUS.IDLE,
  fetchProductsError: null,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.fetchProductsStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.fetchProductsStatus = FETCH_STATUS.SUCCESS;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.fetchProductsStatus = FETCH_STATUS.ERROR;
        state.fetchProductsError = action.payload ?? {
          message: "Unknown error",
        };
      });
  },
});