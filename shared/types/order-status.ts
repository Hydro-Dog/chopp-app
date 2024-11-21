import { CALL_STATUS } from "../enums/call-status";

export type OrderStatus = {
  status: CALL_STATUS;
  timeStamp: number;
};
