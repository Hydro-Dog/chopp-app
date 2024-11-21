import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUser,
  fetchCurrentUser,
  login,
  updateCurrentUser,
} from "./actions";
import { User, UserAuthorization } from ".";
import { FETCH_STATUS } from "@/shared/types/fetch-status";
import { ErrorResponse } from "@/shared/types/response-error";

export type UserState = {
  currentUser?: User;
  fetchCurrentUserStatus: FETCH_STATUS;
  currentUserError: ErrorResponse | null;
  updateCurrentUserStatus: FETCH_STATUS;
  updateCurrentUserError: ErrorResponse | null;
  createUserStatus: FETCH_STATUS;
  createUserError?: ErrorResponse;
  // logoutStatus: FETCH_STATUS;
  // logoutError: ErrorResponse | null;
  loginStatus: FETCH_STATUS;
  loginError: ErrorResponse | null;
};

const initialState: UserState = {
  currentUser: undefined,
  fetchCurrentUserStatus: FETCH_STATUS.IDLE,
  currentUserError: null,
  updateCurrentUserStatus: FETCH_STATUS.IDLE,
  updateCurrentUserError: null,
  createUserStatus: FETCH_STATUS.IDLE,
  createUserError: undefined,
  // logoutStatus: FETCH_STATUS.IDLE,
  // logoutError: null,
  loginStatus: FETCH_STATUS.IDLE,
  loginError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // setLoginStatus: (state, action: PayloadAction<FETCH_STATUS>) => {
    //   state.loginStatus = action.payload;
    // },
    // setLogoutStatus: (state, action: PayloadAction<FETCH_STATUS>) => {
    //   state.logoutStatus = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.fetchCurrentUserStatus = FETCH_STATUS.LOADING;
      })
      .addCase(
        fetchCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.fetchCurrentUserStatus = FETCH_STATUS.SUCCESS;

          state.currentUser = action.payload;
        }
      )
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.fetchCurrentUserStatus = FETCH_STATUS.ERROR;
        state.currentUserError = action.payload ?? {
          message: "Failed to fetch user information",
        };
      })
      .addCase(updateCurrentUser.pending, (state) => {
        state.updateCurrentUserStatus = FETCH_STATUS.LOADING;
      })
      .addCase(
        updateCurrentUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.updateCurrentUserStatus = FETCH_STATUS.SUCCESS;
          console.log("action.payload: ", action.payload);
          state.currentUser = action.payload;
          state.updateCurrentUserStatus = FETCH_STATUS.IDLE;
        }
      )
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.updateCurrentUserStatus = FETCH_STATUS.ERROR;
        state.updateCurrentUserError = action.payload ?? {
          message: "Failed to fetch user information",
        };
        state.updateCurrentUserStatus = FETCH_STATUS.IDLE;
      })
      .addCase(createUser.pending, (state) => {
        state.createUserStatus = FETCH_STATUS.LOADING;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.createUserStatus = FETCH_STATUS.SUCCESS;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.createUserStatus = FETCH_STATUS.ERROR;
        state.createUserError = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loginStatus = FETCH_STATUS.LOADING;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<UserAuthorization>) => {
          state.loginStatus = FETCH_STATUS.SUCCESS;
          // localStorage.setItem("token", action.payload.Authorization);
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = FETCH_STATUS.ERROR;
        state.loginError = action.payload ?? {
          message: "Failed to login user",
        };
      });
    // .addCase(logoutUser.pending, (state) => {
    //   state.logoutStatus = FETCH_STATUS.LOADING;
    // })
    // .addCase(logoutUser.fulfilled, (state) => {
    //   state.logoutStatus = FETCH_STATUS.SUCCESS;
    //   localStorage.removeItem("token");
    // })
    // .addCase(logoutUser.rejected, (state, action) => {
    //   state.logoutStatus = FETCH_STATUS.ERROR;
    //   state.logoutError = action.payload ?? {
    //     errorMessage: "Failed to logout user",
    //   };
    // });
  },
});

// export const { setLoginStatus, setLogoutStatus } = userSlice.actions;
