import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  User,
  UserAuthorization,
  UserLoginDTO,
  UserRegisterDTO,
  //   UserAuthorization,
  //   UserLoginDTO,
  //   UserRegisterDTO,
} from "./types";

import { axiosDefault } from "@/services";
import { ErrorResponse } from "@/shared";

// export const fetchCurrentUser = createAsyncThunk<User, void, { rejectValue: ErrorResponse }>(
//   '/fetchCurrentUser',
//   async (_, thunkAPI) => {
//     try {
//       const response = await api.get<User>('/user');
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
//       } else {
//         return thunkAPI.rejectWithValue({ errorMessage: 'An unknown error occurred' });
//       }
//     }
//   },
// );

// export const updateCurrentUser = createAsyncThunk<User, User, { rejectValue: ErrorResponse }>(
//   '/updateCurrentUser',
//   async (userData, thunkAPI) => {
//     try {
//       const response = await api.put<User>('/user', userData);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
//       } else {
//         return thunkAPI.rejectWithValue({ errorMessage: 'An unknown error occurred' });
//       }
//     }
//   },
// );

export const createUser = createAsyncThunk<
  User,
  UserRegisterDTO,
  { rejectValue: ErrorResponse }
>("/createUser", async (data, thunkAPI) => {
  try {
    const response = await axiosDefault.post<User>(`/user/create`, data);
    return response.data;
  } catch (error) {
    console.log("axios error: ", error);
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({
        errorMessage: "An unknown error occurred",
      });
    }
  }
});

export const login = createAsyncThunk<
  UserAuthorization,
  UserLoginDTO,
  { rejectValue: ErrorResponse }
>("/loginUser", async (userData, thunkAPI) => {
  try {
    const response = await axiosDefault.post<UserAuthorization>(
      `/login`,
      userData,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({
        errorMessage: "An unknown error occurred",
      });
    }
  }
});

// export const logoutUser = createAsyncThunk<void, void, { rejectValue: ErrorResponse }>(
//   '/logoutUser',
//   async (_, thunkAPI) => {
//     try {
//       const response = await api.get<void>(`/logout`);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
//       } else {
//         return thunkAPI.rejectWithValue({ errorMessage: 'An unknown error occurred' });
//       }
//     }
//   },
// );
