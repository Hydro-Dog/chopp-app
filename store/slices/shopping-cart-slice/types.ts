import { Product } from "../product-slice";

export type PostShoppingCartItemDTO = {
  productId: number;
  quantity: number;
};

export type PostShoppingCartDTO = {
  items: PostShoppingCartItemDTO[];
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