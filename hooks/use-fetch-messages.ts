import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatMessages } from "@/store/slices/chat-slice";
import { AppDispatch, RootState } from "@/store/store";

export const useFetchMessages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchChatMessages());
    }
  }, [currentUser]);
};

export default useFetchMessages;
