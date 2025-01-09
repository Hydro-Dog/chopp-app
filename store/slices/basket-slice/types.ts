export type BasketItem = {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
};
export type Basket = {
  items: BasketItem[];
  totalPrice: number;
}