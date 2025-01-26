import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChatStats } from "../types/chat-stats";
import { ChatMessage } from "../types/chat-message";
import { fetchChatMessages, updateMessages } from "@/store/slices/chat-slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

export type ChatsContextType = {
  chatMessages: ChatMessage[];
  fetchMessages: () => void;
  setMessages: (chatMessages: ChatMessage[]) => void;
  // chatStats: ChatStats;
  // setChatStats: Dispatch<SetStateAction<ChatStats>>;
};

const chatsContextInitialValue: ChatsContextType = {
  chatMessages: [],
  fetchMessages: () => {},
  setMessages: () => [],
  // chatStats: {} as ChatStats,
  // setChatStats: () => ({}) as ChatStats,
};

const ChatsContext = createContext<ChatsContextType>(chatsContextInitialValue);

export const useChatsContext = () => useContext(ChatsContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChatsContextProvider = ({ children }: PropsWithChildren<any>) => {
  // const [messages, setMessages] = useState<ChatMessage[]>([]);
  // const [chatStats, setChatStats] = useState<ChatStats>({} as ChatStats);

  const dispatch = useDispatch<AppDispatch>();

  const chatsStats = { total: 1, read: 1, unread: 1 };

  const { chatMessages } = useSelector((state: RootState) => state.chat);

  const setMessages = (chatMessages: ChatMessage[]) => {
    dispatch(updateMessages(chatMessages));
  };

  const fetchMessages = () => {
    dispatch(fetchChatMessages());
  };

  // const pushNewMessageToChat = (newChatMessage: ChatMessage) => {
  //   const changesChatMessages = [...chatMessages, newChatMessage];
  //   dispatch(updateMessages(changesChatMessages));
  // }

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
