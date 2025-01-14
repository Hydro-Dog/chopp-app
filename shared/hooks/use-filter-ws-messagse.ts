import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { WsMessage } from "../types/ws-message";
import { WS_MESSAGE_TYPE } from "../types/ws-message-type";
import { useEffect } from "react";

export const useFilterWsMessages = <T>(type: WS_MESSAGE_TYPE) => {
  const { chatMessages } = useSelector((state: RootState) => state.chat);

  // // Фильтруем сообщения по типу
  // const typedMessages = chatMessages.filter(
  //   (item: WsMessage<T>) => item.type === type,
  // );

  // Получаем последнее сообщение из отфильтрованных
  const lastMessage = chatMessages[chatMessages.length - 1] || null;

  return { messages: chatMessages, lastMessage };
};
