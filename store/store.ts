import { configureStore, Middleware } from "@reduxjs/toolkit";
import { chatSlice, ChatState } from "./slices/chat-slice/index";
import { orderSlice, OrderState } from "./slices/order-slice/index";
import {
  CategoryState,
  productCategorySlice,
} from "./slices/product-category-slice";
import { productSlice, ProductsState } from "./slices/product-slice";
import { userSlice, UserState } from "./slices/user-slice/index";
import {
  pushWsMessage,
  setWsConnected,
  setWsError,
  wsConnect,
  wsDisconnect,
  wsSend,
  wsSlice,
  WsState,
} from "./slices/ws-slice";

type WsAction = {
  type: string;
  payload?: any;
};

//@ts-ignore
const wsMiddleware: Middleware = (store) => {
  let socket: WebSocket | null = null;

  return (next) => (action: WsAction) => {
    switch (action.type) {
      case wsConnect.toString():
        if (socket !== null) {
          socket.close();
        }

        socket = new WebSocket(action.payload.url);

        socket.onopen = () => {
          store.dispatch(setWsConnected(true));
        };

        socket.onmessage = (event) => {
          const data =
            typeof event.data === "object"
              ? JSON.parse(event.data)
              : event.data;
          store.dispatch(pushWsMessage(data));
        };

        socket.onclose = () => {
          store.dispatch(setWsConnected(false));
        };

        socket.onclose = (error) => {
          store.dispatch(setWsError(error));
        };

        break;

      case wsDisconnect.toString():
        if (socket !== null) {
          socket.close();
          socket = null;
        }

        break;

      case wsSend.toString():
        if (socket !== null) {
          socket.send(JSON.stringify(action.payload));
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
};

export type AppDispatch = typeof store.dispatch;
