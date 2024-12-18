import { createSlice } from "@reduxjs/toolkit";
import { Category } from "./types";
import { fetchCategories } from "./actions";
import { ErrorResponse, FETCH_STATUS } from "@/shared";

export type CategoryState = {
  category?: Category;
  fetchCategoriesStatus: FETCH_STATUS;
  fetchCategoriesError: ErrorResponse | null;
};

const initialState: CategoryState = {
  category: undefined,
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
        state.category = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.fetchCategoriesStatus = FETCH_STATUS.ERROR;
        state.fetchCategoriesError = action.payload ?? {
          message: "Unknown error",
        };
      });
  },
});
