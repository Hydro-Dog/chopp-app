import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "@/services";

export type ImagesState = {
  items: [];
  page: number;
  totalItems: number;
  totalPages: number;
};
export type ImageItem = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
};

export const fetchImages = createAsyncThunk(
  "images/fetchImages", // Тип действия
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get("/products"); // Ваш запрос
      return response.data; // Возвращаем данные для успешного выполнения
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message); // Возвращаем ошибку для случая неудачи
    }
  },
);

export const imagesSlice = createSlice({
  name: "images",
  initialState: {
    items: [] as ImageItem[],
    page: 0,
    totalItems: 0,
    totalPages: 0,
  } as ImagesState,
  reducers: {
    clearImages: (state) => {
      state.items = [];
      state.page = 0;
      state.totalItems = 0;
      state.totalPages = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.page = action.payload.page;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
    });
  },
});
export const { clearImages } = imagesSlice.actions;

// Экспортируем редюсер
export default imagesSlice.reducer;
