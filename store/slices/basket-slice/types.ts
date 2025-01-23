import { Product } from "../product-slice";

export type BasketItemPOST = {
  productId: number;
  quantity: number;
};
export type BasketPOST = {
  items: BasketItemPOST[];
};
export type Basket = {
  items: BasketItem[];
  quantity: number;
  totalPrice: number;
};
export type BasketItem = {
  product: Product;
  quantity: number;
  totalPrice: number;
}