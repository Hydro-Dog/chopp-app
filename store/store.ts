import { configureStore } from "@reduxjs/toolkit";
import { wsMiddleware } from "./middleware/ws-middleware";
import { chatSlice, ChatState } from "./slices/chat-slice/index";
import { orderSlice, OrderState } from "./slices/order-slice/index";
import { CategoryState, productCategorySlice } from "./slices/product-category-slice";
import { productSlice, ProductsState } from "./slices/product-slice";
import { shoppingCart, ShoppingCartState } from "./slices/shopping-cart-slice";
import { userSlice, UserState } from "./slices/user-slice/index";
import { wsSlice, WsState } from "./slices/ws-slice";

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
