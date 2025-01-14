import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosPrivate } from "@/services";

import { ChatStats } from "@/shared/types/chat-stats";
import { ChatMessage } from "@/shared/types/chat-message";
import { ErrorResponse } from "@/shared/types/response-error";

export const fetchChatMessages = createAsyncThunk<ChatMessage[], void, { rejectValue: ErrorResponse }>(
  '/fetchChatMessages',
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get<ChatMessage[]>(
        `/chats/currentUserMessages`,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
      } else {
        return thunkAPI.rejectWithValue({
          message: "An unknown error occurred",
        });
      }
    }
});

export const fetchChatStats = createAsyncThunk<
  ChatStats,
  string,
  { rejectValue: ErrorResponse }
>("/fetchChatStats", async (chatId, thunkAPI) => {
  try {
    const response = await axiosPrivate.get<ChatStats>(
      `/chats/${chatId}/stats`,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return thunkAPI.rejectWithValue(error.response.data as ErrorResponse);
    } else {
      return thunkAPI.rejectWithValue({
        message: "An unknown error occurred",
      });
    }
  }
});