//import { OrderStatus } from "@/shared/types/order-status";

export type Order = {
  createdAt: string;
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
