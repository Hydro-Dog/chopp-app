import { WsMessage } from "../types";

export const createWsMessage = ({
  type,
  payload,
}: Omit<WsMessage, 'timeStamp'>) => ({
  type,
  payload,
});
