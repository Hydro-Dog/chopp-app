import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

//TODO: Типизировать
export const useFilterWsMessages = (type: "callStatus") => {
  const { messages } = useSelector((state: RootState) => state.ws);
  const typedMessages = messages.filter((item) => item.type === type);
  const lastMessage = typedMessages[typedMessages.length - 1];

  return { messages, lastMessage };
};
