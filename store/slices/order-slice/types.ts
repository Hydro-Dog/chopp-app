//import { OrderStatus } from "@/shared/types/order-status";

import { Product } from "../product-slice";

export type OrderItem = {
  createdAt: string;
  id: number;
  orderId: number;
  price: number;
  product: Product;
  productId: number;
  quantity: number;
  updatedAt: string;
};

export type Order = {
  createdAt: string;
  items?: OrderItem[];
  id: string;
  orderStatus: string;
  paymentStatus: string;
  paymentUrl: string;
  quantity: number;
  totalPrice: number;
  transactionId: string;
  updatedAt: string;
  userId: number;
};

export type FewOrders = {
  items: Order[];
  totalItems: number;
  totalPages: number;
  limit: number;
};
