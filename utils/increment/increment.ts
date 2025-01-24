import {
  Basket,
  BasketItem,
  BasketPOST,
  fetchPostShoppingCart,
} from "@/store/slices/basket-slice";
import { AppDispatch } from "@/store/store";

export const Increment = (
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
    newBasket.items = newBasket.items.map((item) => {
      if (item.productId === id) {
        item.quantity += 1;
      }
      return item;
    });
  } else {
    newBasket.items = [
      ...newBasket.items,
      { productId: id, quantity: 1 },
    ];
  }
  dispatch(fetchPostShoppingCart({ basket: newBasket }));
};
