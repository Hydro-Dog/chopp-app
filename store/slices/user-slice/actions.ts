import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  User,
  UserAuthorization,
  UserLoginDTO,
  UserRegisterDTO,
} from "./types";

import { axiosDefault, axiosPrivate } from "@/services";
import { ErrorResponse } from "@/shared";

export const fetchCurrentUser = createAsyncThunk<
  User,
  void,
  { rejectValue: ErrorResponse }
>("/fetchCurrentUser", async (_, thunkAPI) => {
  try {
    const response = await axiosPrivate.get<User>("/currentUser");
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

export const updateCurrentUser = createAsyncThunk<
  User,
  Partial<UserRegisterDTO>,
  { rejectValue: ErrorResponse }
>("/updateCurrentUser", async (userData, thunkAPI) => {
  try {
    const response = await axiosPrivate.put<User>("/currentUser", userData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log("error: ", error);
      return thunkAPI.rejectWithValue(
        error.response.data?.errorMessage
          ? (error.response.data as ErrorResponse)
          : { errorMessage: error.response.data }
      );
    } else {
      console.log("ELSE errorMessage");
      return thunkAPI.rejectWithValue({
        errorMessage: "An unknown error occurred",
      });
    }
  }
});

export const createUser = createAsyncThunk<
  User,
  UserRegisterDTO,
  { rejectValue: ErrorResponse }
>("/createUser", async (data, thunkAPI) => {
  try {
    const response = await axiosDefault.post<User>(`/auth/registration`, data);
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
      `/auth/login`,
      userData
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
