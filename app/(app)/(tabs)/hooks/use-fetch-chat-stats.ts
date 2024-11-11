import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useChatsContext } from "@/shared/context/chats-context";
import { fetchChatStats } from "@/store/slices/chat-slice";
import { AppDispatch, RootState } from "@/store/store";

export const useFetchChatStats = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { chatsStats } = useSelector((state: RootState) => state.chat);
  const { setChatStats } = useChatsContext();

  console.log('fetchChatStats: ', currentUser?.chatWithAdminId)
  useEffect(() => {
    if (currentUser?.chatWithAdminId) {
      dispatch(fetchChatStats(currentUser?.chatWithAdminId));
    }
  }, [currentUser]);

  useEffect(() => {
    if (chatsStats) {
      setChatStats(chatsStats);
    }
  }, [chatsStats]);
};
