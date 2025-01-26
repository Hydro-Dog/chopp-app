import { useDispatch, useSelector } from "react-redux";
import { PostShoppingCartDTO, postShoppingCart } from "@/store/slices/shopping-cart-slice";
import { AppDispatch, RootState } from "@/store/store";

export const useDecrementShoppingCartItem = () => {
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);
  const dispatch = useDispatch<AppDispatch>();

  return ({ itemId }: { itemId: number }) => {
    const itemToDelete = shoppingCart.items.find((item) => item.product.id === itemId);
    if (!itemToDelete) {
      return;
    }

    const newShoppingCartDTO: PostShoppingCartDTO = {
      items: shoppingCart.items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    if (itemToDelete.quantity === 1) {
      newShoppingCartDTO.items = newShoppingCartDTO.items.filter((item) => item.productId !== itemId);
    } else {
      newShoppingCartDTO.items = newShoppingCartDTO.items.map((item) => {
        if (item.productId === itemId) {
          item.quantity -= 1;
        }
        return item;
      });
    }

    dispatch(postShoppingCart({ newShoppingCart: newShoppingCartDTO }));
  };
};
