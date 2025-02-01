import { PropsWithChildren, createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessage } from "../types/chat-message";
import { fetchChatMessages, updateMessages } from "@/store/slices/chat-slice";
import { AppDispatch, RootState } from "@/store/store";

export type ChatsContextType = {
  chatMessages: ChatMessage[];
  fetchMessages: () => void;
  setMessages: (chatMessages: ChatMessage[]) => void;
};

const chatsContextInitialValue: ChatsContextType = {
  chatMessages: [],
  fetchMessages: () => null,
  setMessages: () => [],
};

const ChatsContext = createContext<ChatsContextType>(chatsContextInitialValue);

export const useChatsContext = () => useContext(ChatsContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChatsContextProvider = ({ children }: PropsWithChildren<any>) => {
  const dispatch = useDispatch<AppDispatch>();
  const { chatMessages } = useSelector((state: RootState) => state.chat);

  const setMessages = (chatMessages: ChatMessage[]) => {
    dispatch(updateMessages(chatMessages));
  };

  const fetchMessages = () => {
    dispatch(fetchChatMessages());
  };

  return (
    <ChatsContext.Provider
      value={{
        chatMessages,
        fetchMessages,
        setMessages,
        // chatStats,
        // setChatStats,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
