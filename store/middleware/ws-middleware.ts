import { Middleware } from "@reduxjs/toolkit";
import io, { type Socket } from "socket.io-client";
import { pushWsMessage } from "../slices/chat-slice";
import { pushWsNotification } from "../slices/order-slice";
import { fetchCurrentUser } from "../slices/user-slice";
import { wsConnect, setWsConnected, setWsError, wsDisconnect, wsSend } from "../slices/ws-slice";
import { AppDispatch } from "../store";
import { CONFIG } from "@/my-config";
import { STORAGE_KEYS } from "@/shared/enums/storage-keys";
import { getFromStorage } from "@/shared/utils/async-storage-methods";

type WsAction = {
  type: string;
  payload?: any;
};

//@ts-ignore
export const wsMiddleware: Middleware = (store) => {
  let socket: typeof Socket | null = null;

  return (next) => async (action: WsAction) => {
    switch (action.type) {
      case wsConnect.toString():
        if (socket !== null) {
          socket.disconnect();
        }
        const accessToken = await getFromStorage(STORAGE_KEYS.ACCESS_TOKEN);
        if (accessToken == null || accessToken == undefined) {
          console.error("WS Connection failed due to no access token in Local storage");

          return;
        }
        socket = io(action.payload.url, {
          transports: ["websocket"], // Используем только WebSocket транспорт
          auth: { accessToken }, // Передача авторизационных данных, если требуется
        });

        socket.on("connect", () => {
          console.log("Socket.IO connected");
          store.dispatch(setWsConnected(true));
        });

        socket.on("connect_error", (error: Error) => {
          console.error("Socket.IO connection error:", error);
          store.dispatch(setWsError(error));
        });

        socket.on("disconnect", () => {
          console.log("Socket.IO disconnected");
          store.dispatch(setWsConnected(false));
        });
        //TODO Нормально типизировать
        socket.on("message", (data: any) => {
          console.log("Message received:", data);
          store.dispatch(pushWsMessage(data));
        });

        socket.on("notification", (data: any) => {
          store.dispatch(pushWsNotification(data));
        });

        socket.on("tokenExpired", async () => {
          const dispatch: AppDispatch = store.dispatch;

          try {
            await dispatch(fetchCurrentUser()).unwrap();
            dispatch(
              wsConnect({
                url: `${CONFIG.wsUrl}`,
              }),
            );
          } catch (error) {
            console.error(
              "%c Failed to refresh token, user will be logged out!",
              "color: red; font-weight: bold; font-size: 14px;",
              error,
            );
          }
        });

        break;

      case wsDisconnect.toString():
        if (socket !== null) {
          console.log("Disconnecting from Socket.IO server");
          socket.disconnect();
          socket = null;
        }
        break;

      case wsSend.toString():
        if (socket !== null) {
          console.log("Sending message via Socket.IO:", action.payload);
          socket.emit("message", action.payload);
        }
        break;

      default:
        break;
    }

    return next(action);
  };
};
