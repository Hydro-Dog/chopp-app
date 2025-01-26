import { useEffect } from "react";
import { useChatsContext } from "@/shared/context/chats-context";
import { useFilterWsMessages } from "@/shared/hooks/use-filter-ws-messages";
import { ChatMessage } from "@/shared/types/chat-message";
import { WS_MESSAGE_TYPE } from "@/shared/types/ws-message-type";

type Args = {
  flatListRef: any;
};

export const useNewIncomingMessageChatHandler = ({ flatListRef }: Args) => {
  const { lastMessage: newMessage } = useFilterWsMessages<ChatMessage>(
    WS_MESSAGE_TYPE.MESSAGE,
  );

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current.scrollToEnd({ animated: true });
    }, 100);
  }, [newMessage]);
};

export default useNewIncomingMessageChatHandler;
