import {
  Basket,
  BasketItem,
  BasketPOST,
  fetchPostShoppingCart,
} from "@/store/slices/basket-slice";
import { AppDispatch, } from "@/store/store";

export const Decrement = (
  id: number,
  basket: Basket,
  dispatch: AppDispatch,
) => {
  const findItem = basket.items.find(
    (item) => item.product.id === id,
  );

  const newBasket: BasketPOST = { items: [] };
  basket.items.forEach((item) => {
    newBasket.items.push({
      productId: item.product.id,
      quantity: item.quantity,
    });
  });
  if (findItem) {
    if (findItem.quantity === 1) {
      newBasket.items = newBasket.items.filter(
        (item) => item.productId !== id,
      );
    } else {
      newBasket.items = newBasket.items.map((item) => {
        if (item.productId === id) {
          item.quantity -= 1;
        }
        return item;
      });
    }
  }
  dispatch(fetchPostShoppingCart({ basket: newBasket }));
};
