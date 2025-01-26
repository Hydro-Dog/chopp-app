import { configureStore, Middleware } from "@reduxjs/toolkit";
import { io, Socket } from "socket.io-client";
import { chatSlice, ChatState, pushWsMessage } from "./slices/chat-slice/index";
import { orderSlice, OrderState } from "./slices/order-slice/index";
import { CategoryState, productCategorySlice } from "./slices/product-category-slice";
import { productSlice, ProductsState } from "./slices/product-slice";
import { shoppingCart, ShoppingCartState } from "./slices/shopping-cart-slice";
import { userSlice, UserState } from "./slices/user-slice/index";
import { setWsConnected, setWsError, wsConnect, wsDisconnect, wsSend, wsSlice, WsState } from "./slices/ws-slice";
import { getFromStorage } from "@/shared/utils/async-storage-methods";

type WsAction = {
  type: string;
  payload?: any;
};

//@ts-ignore
const wsMiddleware: Middleware = (store) => {
  let socket: Socket | null = null;

  return (next) => async (action: WsAction) => {
    switch (action.type) {
      case wsConnect.toString():
        if (socket !== null) {
          socket.close();
        }

        const accessToken = await getFromStorage("accessToken");

        socket = io(action.payload.url, {
          transports: ["websocket"], // Используем только WebSocket транспорт
          auth: { accessToken }, // Передача авторизационных данных, если требуется
        });

        socket.on("connect", () => {
          console.log("Socket.IO connected");
          store.dispatch(setWsConnected(true));
        });

        // socket.on('connect_error', (error) => {
        //   console.error('Socket.IO connection error:', error);
        //   store.dispatch(setWsError(error));
        // });

        // socket.on('disconnect', () => {
        //   console.log('Socket.IO disconnected');
        //   store.dispatch(setWsConnected(false));
        // });

        socket.on("message", (data) => {
          console.log("Message received:", data);
          store.dispatch(pushWsMessage(data));
        });

        socket.on("tokenExpired", (data) => {
          console.log("Token expired message:", data);
        });

        // socket.onopen = () => {
        //   store.dispatch(setWsConnected(true));
        // };

        // socket.onmessage = (event) => {
        //   const data =
        //     typeof event.data === "object"
        //       ? JSON.parse(event.data)
        //       : event.data;
        //   store.dispatch(pushWsMessage(data));
        // };

        // socket.onclose = () => {
        //   store.dispatch(setWsConnected(false));
        // };

        // socket.onclose = (error) => {
        //   store.dispatch(setWsError(error));
        // };

        break;

      case wsDisconnect.toString():
        if (socket !== null) {
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

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    ws: wsSlice.reducer,
    chat: chatSlice.reducer,
    order: orderSlice.reducer,
    products: productSlice.reducer,
    categories: productCategorySlice.reducer,
    shoppingCart: shoppingCart.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(wsMiddleware);
  },
});

export type RootState = {
  user: UserState;
  ws: WsState;
  chat: ChatState;
  order: OrderState;
  products: ProductsState;
  categories: CategoryState;
  shoppingCart: ShoppingCartState;
};

export type AppDispatch = typeof store.dispatch;
