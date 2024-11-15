import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOrder, fetchMyOrders, fetchOrder } from "./actions";
import { Order } from ".";
import { ErrorResponse, FETCH_STATUS } from "@/shared";

export type OrderState = {
  currentOrder?: Order | null;
  createOrderStatus: FETCH_STATUS;
  createOrderError: ErrorResponse | null;
  fetchOrderStatus: FETCH_STATUS;
  fetchOrderError: ErrorResponse | null;
  myOrders?: Order[] | null;
  fetchMyOrdersStatus: FETCH_STATUS;
  fetchMyOrdersError: ErrorResponse | null;
};

const initialState: OrderState = {
  currentOrder: null,
  createOrderStatus: FETCH_STATUS.IDLE,
  createOrderError: null,
  fetchOrderStatus: FETCH_STATUS.IDLE,
  fetchOrderError: null,
  myOrders: null,
  fetchMyOrdersStatus: FETCH_STATUS.IDLE,
  fetchMyOrdersError: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.fetchOrderStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.fetchOrderStatus = FETCH_STATUS.SUCCESS;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.fetchOrderStatus = FETCH_STATUS.ERROR;
        state.fetchOrderError = action.payload ?? {
          errorMessage: "Failed to fetch user information",
        };
      })
      .addCase(fetchMyOrders.pending, (state) => {
        state.fetchMyOrdersStatus = FETCH_STATUS.LOADING;
      })
      .addCase(
        fetchMyOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.fetchMyOrdersStatus = FETCH_STATUS.SUCCESS;
          state.myOrders = action.payload;
        }
      )
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.fetchMyOrdersStatus = FETCH_STATUS.ERROR;
        state.fetchMyOrdersError = action.payload ?? {
          errorMessage: "Failed to fetch user information",
        };
      })
      .addCase(createOrder.pending, (state) => {
        state.createOrderStatus = FETCH_STATUS.LOADING;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.createOrderStatus = FETCH_STATUS.SUCCESS;
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createOrderStatus = FETCH_STATUS.ERROR;
        state.createOrderError = action.payload ?? {
          errorMessage: "Failed to fetch user information",
        };
      });
  },
});

// export const { setLoginStatus, setLogoutStatus } = userSlice.actions;
