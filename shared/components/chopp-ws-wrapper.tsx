import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CONFIG } from "@/my-config";
import { wsConnect, wsDisconnect } from "@/store/slices/ws-slice";
import { AppDispatch } from "@/store/store";
import { getFromStorage } from "../utils/async-storage-methods";

export const WsWrapper = ({ children }: PropsWithChildren<object>) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const connect = async () => {
      const accessToken = await getFromStorage("accessToken");
      if (accessToken) {
        dispatch(
          wsConnect({
            url: `${CONFIG.apiUrl}/ws?token=${accessToken}`,
          }),
        );
      }
    };

    connect();

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  return children;
};
