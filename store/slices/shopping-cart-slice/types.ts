import { Product } from "../product-slice";

export type postShoppingCartItemDTO = {
  productId: number;
  quantity: number;
};
export type postShoppingCartDTO = {
  items: postShoppingCartItemDTO[];
};
export type ShoppingCart = {
  items: ShoppingCartItem[];
  quantity: number;
  totalPrice: number;
};
export type ShoppingCartItem = {
  product: Product;
  quantity: number;
  totalPrice: number;
}