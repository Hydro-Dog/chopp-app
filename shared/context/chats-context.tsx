import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import { ChatStats } from "../types/chat-stats";
import { ChatMessage } from "../types/chat-message";

export type ChatsContextType = {
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  chatStats: ChatStats;
  setChatStats: Dispatch<SetStateAction<ChatStats>>;
};

const chatsContextInitialValue: ChatsContextType = {
  messages: [],
  setMessages: () => [],
  chatStats: {} as ChatStats,
  setChatStats: () => ({}) as ChatStats,
};

const ChatsContext = createContext<ChatsContextType>(chatsContextInitialValue);

export const useChatsContext = () => useContext(ChatsContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ChatsContextProvider = ({ children }: PropsWithChildren<any>) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatStats, setChatStats] = useState<ChatStats>({} as ChatStats);

  return (
    <ChatsContext.Provider
      value={{ messages, setMessages, chatStats, setChatStats }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
