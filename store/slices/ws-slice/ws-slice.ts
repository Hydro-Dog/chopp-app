/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { WsMessage } from "@/shared";

export type WsState = {
  wsConnected: boolean;
  messages: WsMessage<unknown>[];
  error: any;
};

const initialState: WsState = {
  wsConnected: false,
  messages: [],
  error: null,
};

export const wsSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    setWsConnected: (state, action: PayloadAction<boolean>) => {
      state.wsConnected = action.payload;
    },
    pushWsMessage: (state, action: PayloadAction<any>) => {
      try {
        state.messages.push(JSON.parse(action.payload));
      } catch (error) {
        console.error(error);
      }
    },
    setWsError: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    wsConnect: (state, action: PayloadAction<{ url: string }>) => {},
    wsDisconnect: (state, action: PayloadAction<void>) => {},
    wsSend: (state, action: PayloadAction<WsMessage>) => {},
  },
});

export const {
  setWsConnected,
  pushWsMessage,
  setWsError,
  wsConnect,
  wsDisconnect,
  wsSend,
} = wsSlice.actions;
