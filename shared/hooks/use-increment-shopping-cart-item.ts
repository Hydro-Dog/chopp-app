import { useDispatch, useSelector } from "react-redux";
import { PostShoppingCartDTO, postShoppingCart } from "@/store/slices/shopping-cart-slice";
import { AppDispatch, RootState } from "@/store/store";

export const useIncrementShoppingCartItem = () => {
  const { shoppingCart } = useSelector((state: RootState) => state.shoppingCart);
  const dispatch = useDispatch<AppDispatch>();

  return ({ itemId }: { itemId: number }) => {
    const itemToAdd = shoppingCart.items.find((item) => item.product.id === itemId);

    const newShoppingCartDTO: PostShoppingCartDTO = {
      items: shoppingCart.items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    if (itemToAdd) {
      newShoppingCartDTO.items = newShoppingCartDTO.items.map((item) => {
        if (item.productId === itemId) {
          item.quantity += 1;
        }
        return item;
      });
    } else {
      newShoppingCartDTO.items = [...newShoppingCartDTO.items, { productId: itemId, quantity: 1 }];
    }
    dispatch(postShoppingCart({ newShoppingCart: newShoppingCartDTO }));
  };
};
