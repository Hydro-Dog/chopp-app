import { ORDER_STATUS } from "../enums";
import { PAYMENT_STATUS } from "./payment";

type Image = {
  id: number;
  hash: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  path?: string
};

//   TODO: вынести в отдельный файл
type Category = {
  id: number;
  title: string;
  order: number;
  createdAt: string;
  updatedAt: string;
};

//   TODO: вынести в отдельный файл
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  categoryId: number;
  imagesOrder: number[];
  images: Image[];
  category: Category;
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: number;
  userId: number;
  totalPrice: number;
  quantity: number;
  orderStatus: ORDER_STATUS;
  paymentStatus: PAYMENT_STATUS;
  paymentUrl: string;
  transactionId: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  returnUrl: string;
  comment: string;
  address: string;
};
