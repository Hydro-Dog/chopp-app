import { Order } from "@/shared";

export type CreateOrderDTO = Pick<Order, "returnUrl" | "comment" | "address">;
