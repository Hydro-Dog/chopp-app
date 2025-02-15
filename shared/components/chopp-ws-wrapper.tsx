import { PropsWithChildren, useEffect } from "react";
import { useSegments } from "expo-router";
import { useDispatch } from "react-redux";
import { CONFIG } from "@/my-config";
import { wsConnect, wsDisconnect } from "@/store/slices/ws-slice";
import { AppDispatch } from "@/store/store";
import { getFromStorage } from "../utils/async-storage-methods";

export const WsWrapper = ({ children }: PropsWithChildren<object>) => {
  const dispatch = useDispatch<AppDispatch>();

  const segments = useSegments();

  useEffect(() => {
    const connect = async () => {
      const isNotAuthRoutes =  !segments.join('/').includes('login');

      const accessToken = await getFromStorage("accessToken");

      if (isNotAuthRoutes && accessToken) {
        dispatch(
          wsConnect({
            url: `${CONFIG.wsUrl}`,
          }),
        );
      }
    };

    connect();

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch, segments]);

  return children;
};
