import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  User,
  UserRegisterDTO,
  //   UserAuthorization,
  //   UserLoginDTO,
  //   UserRegisterDTO,
} from "./types";
import { api } from "@/services";
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
>("/createUserUser", async (userData, thunkAPI) => {
  try {
    const response = await api.post<User>(`/register`, userData);
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

// export const loginUser = createAsyncThunk<
//   UserAuthorization,
//   UserLoginDTO,
//   { rejectValue: ErrorResponse }
// >('/loginUser', async (userData, thunkAPI) => {
//   try {
//     const response = await api.post<UserAuthorization>(`/login`, userData);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
//     } else {
//       return thunkAPI.rejectWithValue({ errorMessage: 'An unknown error occurred' });
//     }
//   }
// });

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
