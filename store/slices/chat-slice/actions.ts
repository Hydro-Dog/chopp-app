import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosPrivate } from "@/services";
import { WsMessage, ChatMessage, ErrorResponse } from "@/shared";
import { ChatData } from "@/shared/types/chat-data";
import { ChatStats } from "@/shared/types/chat-stats";

export const fetchChatMessages = createAsyncThunk<
  WsMessage<ChatMessage>[],
  string,
  { rejectValue: ErrorResponse }
>("/fetchChatMessages", async (chatId, thunkAPI) => {
  try {
    const response = await axiosPrivate.get<WsMessage<ChatMessage>[]>(
      `/chats/${chatId}/messages`,
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
        errorMessage: "An unknown error occurred",
      });
    }
  }
});