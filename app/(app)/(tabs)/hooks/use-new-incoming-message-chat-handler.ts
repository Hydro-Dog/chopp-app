import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChatMessage, WS_MESSAGE_TYPE } from "@/shared";
import { useFilterWsMessages } from "@/shared/hooks";
import { RootState } from "@/store/store";
import { useChatsContext } from "@/shared/context/chats-context";

type Args = {
  flatListRef: any;
};

export const useNewIncomingMessageChatHandler = ({ flatListRef }: Args) => {
  const { setMessages, setChatStats } = useChatsContext();
  const { lastMessage: newMessage } = useFilterWsMessages<ChatMessage>(
    WS_MESSAGE_TYPE.MESSAGE
  );

  useEffect(() => {
    setMessages((prev) => [...prev, newMessage?.payload]);

    //TODO: скролить только если до конца проскролен список

    setTimeout(() => {
      flatListRef.current.scrollToEnd({ animated: true });
    }, 100);
  }, [newMessage]);
};