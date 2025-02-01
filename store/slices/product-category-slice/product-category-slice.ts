import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./actions";
import { Category } from "./types";
import { FETCH_STATUS, ErrorResponse } from "@/shared/types";

export type CategoryState = {
  categories: Category[] | [];
  fetchCategoriesStatus: FETCH_STATUS;
  fetchCategoriesError: ErrorResponse | null;
};

const initialState: CategoryState = {
  categories: [],
  fetchCategoriesStatus: FETCH_STATUS.IDLE,
  fetchCategoriesError: null,
};

export const productCategorySlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.fetchCategoriesStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.fetchCategoriesStatus = FETCH_STATUS.SUCCESS;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.fetchCategoriesStatus = FETCH_STATUS.ERROR;
        state.fetchCategoriesError = action.payload ?? {
          message: "Unknown error",
        };
      });
  },
});
