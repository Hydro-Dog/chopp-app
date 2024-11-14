import { OrderStatus } from "@/shared/types/order-status";

export type Order = {
  id: string;
  address: string;
  orderComment: string;
  createdAt?: number;
  statusData?: OrderStatus;
};
