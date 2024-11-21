import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatMessages } from "@/store/slices/chat-slice";
import { AppDispatch, RootState } from "@/store/store";
import { useChatsContext } from "@/shared/context/chats-context";

export const useFetchMessages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { chatMessages } = useSelector((state: RootState) => state.chat);
  const { setMessages } = useChatsContext();

  useEffect(() => {
    if (currentUser?.chatWithAdminId) {
      dispatch(fetchChatMessages(currentUser?.chatWithAdminId));
    }
  }, [currentUser]);

  useEffect(() => {
    if (chatMessages) {
      setMessages(chatMessages);
    }
  }, [chatMessages]);
};

export default useFetchMessages