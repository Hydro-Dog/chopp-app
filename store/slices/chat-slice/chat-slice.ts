import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchChatMessages, fetchChatStats } from "./actions";
import { ChatMessage } from "@/shared/types/chat-message";
import { ChatStats } from "@/shared/types/chat-stats";
import { FETCH_STATUS } from "@/shared/types/fetch-status";
import { ErrorResponse } from "@/shared/types/response-error";
import { WsMessage } from "@/shared/types/ws-message";

export type ChatState = {
  chatMessages: ChatMessage[] | null;
  fetchChatMessagesStatus: FETCH_STATUS;
  fetchChatMessagesError: ErrorResponse | null;
  chatsStats: ChatStats | null;
  fetchChatsStatsStatus: FETCH_STATUS;
  fetchChatStatsError: ErrorResponse | null;
};

const initialState: ChatState = {
  chatMessages: null,
  fetchChatMessagesStatus: FETCH_STATUS.IDLE,
  fetchChatMessagesError: null,
  chatsStats: null,
  fetchChatsStatsStatus: FETCH_STATUS.IDLE,
  fetchChatStatsError: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearChatMessages: (state) => {
      state.chatMessages = null;
      state.fetchChatMessagesStatus = FETCH_STATUS.IDLE;
      state.fetchChatMessagesError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatMessages.pending, (state) => {
        state.fetchChatMessagesStatus = FETCH_STATUS.LOADING;
      })
      .addCase(
        fetchChatMessages.fulfilled,
        (state, action: PayloadAction<WsMessage<ChatMessage>[]>) => {
          state.fetchChatMessagesStatus = FETCH_STATUS.SUCCESS;
          state.chatMessages = action.payload;
        },
      )
      .addCase(fetchChatMessages.rejected, (state, action) => {
        state.fetchChatMessagesStatus = FETCH_STATUS.ERROR;
        state.fetchChatMessagesError = action.payload ?? {
          message: "Failed to fetch chat information",
        };
      })
      .addCase(fetchChatStats.pending, (state) => {
        state.fetchChatsStatsStatus = FETCH_STATUS.LOADING;
      })
      .addCase(
        fetchChatStats.fulfilled,
        (state, action: PayloadAction<ChatStats>) => {
          state.fetchChatsStatsStatus = FETCH_STATUS.SUCCESS;
          state.chatsStats = action.payload;
        },
      )
      .addCase(fetchChatStats.rejected, (state, action) => {
        state.fetchChatsStatsStatus = FETCH_STATUS.ERROR;
        state.fetchChatStatsError = action.payload ?? {
          message: "Failed to fetch chat information",
        };
      });
  },
});

export const { clearChatMessages } = chatSlice.actions;
