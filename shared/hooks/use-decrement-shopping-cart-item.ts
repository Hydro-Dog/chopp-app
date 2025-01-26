import { useDispatch, useSelector } from "react-redux";
import {
  postShoppingCartDTO,
  postShoppingCart,
} from "@/store/slices/shopping-cart-slice";
import { AppDispatch, RootState } from "@/store/store";

type Arg = {
  itemId: number;
}

export const useDecrementShoppingCartItem = () => {
  const { shoppingCart } = useSelector(
    (state: RootState) => state.shoppingCart,
  );
  const dispatch = useDispatch<AppDispatch>();

  return ({ itemId }: Arg) => {
    const elem = shoppingCart.items.find((item) => item.product.id === itemId);

    const newShoppingCart: postShoppingCartDTO = { items: [] };
    shoppingCart.items.forEach((item) => {
      newShoppingCart.items.push({
        productId: item.product.id,
        quantity: item.quantity,
      });
    });
    if (elem) {
      if (elem.quantity === 1) {
        newShoppingCart.items = newShoppingCart.items.filter(
          (item) => item.productId !== itemId,
        );
      } else {
        newShoppingCart.items = newShoppingCart.items.map((item) => {
          if (item.productId === itemId) {
            item.quantity -= 1;
          }
          return item;
        });
      }
    }
    dispatch(postShoppingCart({ newShoppingCart }));
  };
};
