import { useSelector } from "react-redux";
import { WS_MESSAGE_TYPE } from "../types";
import { RootState } from "@/store/store";

export const useFilterWsMessages = (type: WS_MESSAGE_TYPE) => {
  const { messages } = useSelector((state: RootState) => state.ws);
  const typedMessages = messages.filter((item) => item.type === type);
  const lastMessage = typedMessages[typedMessages.length - 1];

  return { messages, lastMessage };
};
