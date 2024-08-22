import { configureStore } from "@reduxjs/toolkit";
import { userSlice, UserState } from "./slices/user-slice";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(wsMiddleware),
});

export type RootState = {
  user: UserState;
};

export type AppDispatch = typeof store.dispatch;
