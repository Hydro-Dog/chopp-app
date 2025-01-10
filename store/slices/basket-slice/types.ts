export type BasketItem = {
  productId: number;
  quantity: number;
};
export type Basket = {
  items: BasketItem[];
}