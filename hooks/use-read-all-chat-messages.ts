import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSegments } from "expo-router";
import { useChatsContext } from "@/shared/context/chats-context";
import { WS_MESSAGE_TYPE } from "@/shared/types/ws-message-type";
import { wsSend } from "@/store/slices/ws-slice";
import { AppDispatch, RootState } from "@/store/store";

export const useReadAllChatMessages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { messages, setMessages, setChatStats } = useChatsContext();
  const { wsConnected } = useSelector((state: RootState) => state.ws);
  const { currentUser } = useSelector((state: RootState) => state.user);
  const segments = useSegments();

  useEffect(() => {
    if (segments.includes("tab-support-chat")) {
      setChatStats((prev) => {
        console.log("READ ALL", { ...prev, read: prev.total, unRead: 0 });
        return { ...prev, read: prev.total, unRead: 0 };
      });

      setMessages((prev) => {
        if (prev?.[0]) {
          const newPrev = prev?.map((item) => ({
            ...item,
            wasReadBy: item?.wasReadBy.includes(currentUser?.id)
              ? item?.wasReadBy
              : [...item?.wasReadBy, currentUser?.id],
          }));

          return newPrev;
        }

        return prev;
      });
    }
  }, [messages?.length, segments]);

  const sendMessagesRead = () => {
    if (wsConnected) {
      dispatch(
        wsSend({
          type: WS_MESSAGE_TYPE.MESSAGES_READ,
          payload: { currentChatId: currentUser?.chatWithAdminId },
        }),
      );
    }
  };

  useEffect(() => {
    // if (currentUser?.chatWithAdminId) {
    //   sendMessagesRead();
    // }
  }, [currentUser?.chatWithAdminId]);
};

export default useReadAllChatMessages;
