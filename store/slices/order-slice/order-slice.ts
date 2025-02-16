import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createOrder, fetchLastOrder, fetchOrders, fetchOrder } from "./actions";
import { Order, SearchResponse, WS_MESSAGE_TYPE, WsMessage } from "@/shared/types";
import { FETCH_STATUS } from "@/shared/types/fetch-status";
import { ErrorResponse } from "@/shared/types/response-error";

export type OrderState = {
  currentOrder?: Order | null;
  createOrderStatus: FETCH_STATUS;
  createOrderError: ErrorResponse | null;
  fetchOrderStatus: FETCH_STATUS;
  fetchOrderError: ErrorResponse | null;
  orders?: Order[] | null;
  fetchMyOrdersStatus: FETCH_STATUS;
  fetchMyOrdersError: ErrorResponse | null;
  fetchLastOrderStatus: FETCH_STATUS;
  fetchLastOrderError: ErrorResponse | null;
};

const initialState: OrderState = {
  currentOrder: null,
  createOrderStatus: FETCH_STATUS.IDLE,
  createOrderError: null,
  fetchOrderStatus: FETCH_STATUS.IDLE,
  fetchOrderError: null,
  orders: null,
  fetchMyOrdersStatus: FETCH_STATUS.IDLE,
  fetchMyOrdersError: null,
  fetchLastOrderStatus: FETCH_STATUS.IDLE,
  fetchLastOrderError: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    pushWsNotification: (state, action: PayloadAction<WsMessage>) => {
      try {
        switch (action.payload?.type) {
          case WS_MESSAGE_TYPE.ORDER_STATUS:
            if (state.currentOrder) {
              Object.assign(state.currentOrder, action.payload.payload);
            }
            break;
          default:
            console.error(`Нет обработчика для WS cообщения с типом ${action.payload?.type}`);
            break;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
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
          message: "Failed to fetch user information",
        };
      })
      .addCase(fetchOrders.pending, (state) => {
        state.fetchMyOrdersStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<SearchResponse<Order>>) => {
        state.fetchMyOrdersStatus = FETCH_STATUS.SUCCESS;
        state.orders = action.payload.items;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.fetchMyOrdersStatus = FETCH_STATUS.ERROR;
        state.fetchMyOrdersError = action.payload ?? {
          message: "Failed to fetch user information",
        };
      })
      .addCase(fetchLastOrder.pending, (state) => {
        state.createOrderStatus = FETCH_STATUS.LOADING;
      })
      .addCase(fetchLastOrder.fulfilled, (state, action) => {
        state.createOrderStatus = FETCH_STATUS.LOADING;
        state.currentOrder = action.payload;
      })
      .addCase(fetchLastOrder.rejected, (state, action) => {
        state.createOrderStatus = FETCH_STATUS.LOADING;
        state.fetchLastOrderError = (action.payload as ErrorResponse) ?? {
          message: "Failed to fetch user information",
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
        state.createOrderError = (action.payload as ErrorResponse) ?? {
          message: "Failed to fetch user information",
        };
      });
  },
});

export const { pushWsNotification } = orderSlice.actions;
